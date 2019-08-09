/**
 * Extracts information from a swagger 2.0 JSON document.
 */
export default class SwaggerExtracter {

    /**
     * Build body and all the sub properties. 
     * 
     * @param {*} schema The schema for the endpoint.
     */
    buildBody(schema) {

        let map = {};

        for (const property of Object.keys(schema.properties)) {
            if (schema.properties[property].hasOwnProperty("properties")) {
                map[property] = this.buildBody(schema.properties[property]);
            }
            else {
                for (const property of Object.keys(schema.properties)) {

                    if (schema.properties[property].hasOwnProperty("example")) {
                        map[property] = schema.properties[property].example;
                    }
                    else {
                        map[property] = schema.properties[property].type;
                    }
                }
            }
        }

        return map;
    }
    
    /**
    * Returns header, body and response for a given endpoint from the swagger data.
    * 
    * @param {*} endpoint The endpoint to return for.
    * @param {*} type The REST type for the given endpoint (POST, PUT, GET etc.)
    * @param {*} swaggerData The data where the endpoint is located.
    */
    getExampleData(endpoint, type, swaggerData) {

        let header = {}, body = {}, responses = {};

        // Check out if the open API file contains the id (which is the endpoint)
        if (swaggerData.paths.hasOwnProperty(endpoint)) {

            // Get the endpoint data which includes request body (if any), responeses etc.
            const endpointData = swaggerData.paths[endpoint][type.toLowerCase()];
			
			// this line will make sure that Login works, as it does not contain a head/body or responses.
			if (!endpointData) return [null, null, null];

            // We ectract the header and body if there is any
			if (endpointData.parameters)
            for (const parameter of endpointData.parameters) {
                if (parameter.in === "header") {
                    header[parameter.name] = parameter.type;
                }
                else if (parameter.in === "body") {
                    body = this.buildBody(parameter.schema);
                }
            }

            // We ectract the responses if there are any
            if (endpointData.hasOwnProperty("responses")) {

                for (const [statusCode, response] of Object.entries(endpointData.responses)) {
                    let map = {};
                    let responseBody = {};

                    if (response.hasOwnProperty("schema")) {
                        responseBody = this.buildBody(response.schema);
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