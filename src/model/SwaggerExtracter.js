
export default class SwaggerExtracter {

    /**
     * Returns all the information for a given endpoint.
     * 
     * @param {*} endpointName The endpoint name.
     * @param {*} swaggerJson The swagger data where the endpoint is located. 
     */
    getEndpointData(endpointName, swaggerJson) {
        return swaggerJson.paths[endpointName][Object.keys(swaggerJson.paths[endpointName])[0]];
    }

    /**
     * Returns the header for a given endpoint.
     *  
     * @param {*} endpointName The name of the endpoint name.
     * @param {*} swaggerJson The swagger data where the endpoint is located.
     */
    getHeaderForEndpointFromSwaggerJson(endpointName, swaggerJson) {
        const endpointData = this.getEndpointData(endpointName, swaggerJson);
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
     * @param {*} swaggerJson The swagger data where the endpoint is located.
     * @param {*} onlyRequired Wether the body should only include the required fields.
     */
    getBodyExampleForEndpointFromSwaggerJson(endpointName, swaggerJson, onlyRequired) {
        // Get the request boy
        const requestBody = this.getEndpointData(endpointName, swaggerJson).requestBody;
        
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
}
