
/**
 * A class which extracts information from a OpenAPI 3.0 JSON document.
 */
export default class OpenAPIExtracter {

    /**
     * Returns all the information for a given endpoint.
     * 
     * @param {*} endpointName The endpoint name.
     * @param {*} openAPIJson The Open API data where the endpoint is located. 
     */
    getEndpointData(endpointName, openAPIJson) {
        return openAPIJson.paths[endpointName][Object.keys(openAPIJson.paths[endpointName])[0]];
    }

    /**
     * Returns the header for a given endpoint.
     *  
     * @param {*} endpointName The name of the endpoint name.
     * @param {*} openAPIJson The Open API data where the endpoint is located.
     */
    getHeaderForEndpointFromOpenAPIJson(endpointName, openAPIJson) {
        const endpointData = this.getEndpointData(endpointName, openAPIJson);
        let json = {}

        for (const parameter of endpointData.parameters) {
            json[parameter.name] = parameter.schema.type;
        }

        return json;
    }

    /**
     * Crawls through certain json data until it finds an object with a certain key/name.
     * 
     * @param {*} name The name/key to look for. 
     * @param {*} data The data to look through. 
     */
    lookForObjectWithName(name, data) {
        for (const [key, value] of Object.entries(data)) {
            if (key === name) {
                return data[key];
            }
            else if (typeof value === 'object' && value !== null) {
                return this.lookForObjectWithName(name, value);
            }
        }
    }

    /**
     * Returns the properties of an endpoint.
     * 
     * @param {*} object The endpoint data.
     * @param {*} onlyRequired Wether the function should include only the required properties.
     */
    getPropertyNames(object, onlyRequired) {
        let properties = [];

        
        if (onlyRequired && object.hasOwnProperty("required")) {
            for (const key of object.required) {
                properties.push(key);
            }
        }
        else {
            for (const key of Object.keys(object.properties)) {
                properties.push(key);
            }
        }

        return properties;
    }

    /**
     * Build body and all the sub properties. 
     * 
     * @param {*} schema The schema for the endpoint.
     * @param {*} onlyRequired Wether we should only include the properties that are required. 
     */
    buildBody(schema, onlyRequired) {

        const properties = this.getPropertyNames(schema, onlyRequired);
        let map = {};

        for (const property of properties) {
            if (schema.properties[property].hasOwnProperty("properties")) {
                map[property] = this.buildBody(schema.properties[property], onlyRequired);
            }
            else {
                for (const property of properties) {
                    map[property] = schema.properties[property].example;
                }
            }
        }

        return map;
    }

    /**
     * Returns the body example for a given endpoint.
     * 
     * @param {*} endpointName The name of the endpoint.
     * @param {*} openAPIJson The Open API data where the endpoint is located.
     * @param {*} onlyRequired Wether the body should only include the required fields.
     */
    getBodyExampleForEndpointFromOpenAPIJson(endpointName, openAPIJson, onlyRequired) {
        // Get the request boy
        const requestBody = this.getEndpointData(endpointName, openAPIJson).requestBody;
        
        // Crawl through the request body until we find the schema
        let schema = this.lookForObjectWithName("schema", requestBody);

        // We found the schema
        if (schema !== undefined) {

            // In some cases the schema will be an array of multiple properties, so we have to extract one of them
            // TODO: Find a better solution for this.
            if (schema.hasOwnProperty("oneOf")) {
                schema = schema["oneOf"][1];
            }

           return this.buildBody(schema, onlyRequired);
        }

        return {};
   }


    /**
    * Returns header, body and response for a given endpoint from the open API data.
    * 
    * @param {*} endpoint The endpoint to return for.
    * @param {*} openAPIData The data where the endpoint is located.
    */
    getExampleData(endpoint, openAPIData) {

        let header = {}, body = {}, responses = {};

        // Check out if the open API file contains the id (which is the endpoint)
        if (openAPIData.paths.hasOwnProperty(endpoint)) {

            // Retrieve the header
            header = this.getHeaderForEndpointFromOpenAPIJson(endpoint, openAPIData);

            // Get the endpoint data which includes request body (if any), responeses etc.
            const endpointData = openAPIData.paths[endpoint][Object.keys(openAPIData.paths[endpoint])[0]];

            // We ectract the body if there is any
            if (endpointData.hasOwnProperty("requestBody")) {
                body = this.getBodyExampleForEndpointFromOpenAPIJson(endpoint, openAPIData, false);
            }

            // We ectract the responses if there are any
            if (endpointData.hasOwnProperty("responses")) {

                for (const [statusCode, response] of Object.entries(endpointData.responses)) {
                    const schema = this.lookForObjectWithName("schema", response);
                    let map = {};
                    let responseBody = {};
                    
                    if (schema !== undefined) {
                        responseBody = this.buildBody(schema, false);
                    }

                    map.json = responseBody;
                    map.description = response.description;

                   responses[statusCode] = map;
                }
            }
        }

        return [header, body, responses];
    }
}