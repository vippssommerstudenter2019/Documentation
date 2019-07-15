import React from "react";
import PropTypes from "prop-types";
import {Step} from "./Step";
import SwaggerExtracter from "../../model/SwaggerExtracter"

const propTypes = {
    sections: PropTypes.array.isRequired,
    swaggerData: PropTypes.object.isRequired
};

class Content extends React.Component {

    getDataFromSwagger(endpoint, swaggerData)  {

        let swaggerExtracter = new SwaggerExtracter();
        let header = {}, body = {}, responses = {};

        // Check out if the swagger file contains the id (which is the endpoint)
        if (swaggerData.paths.hasOwnProperty(endpoint)) {

            // Retrieve the header
            header = swaggerExtracter.getHeaderForEndpointFromSwaggerJson(endpoint, swaggerData);

            // Get the endpoint data which includes request body (if any), responeses etc.
            const endpointData = swaggerData.paths[endpoint][Object.keys(swaggerData.paths[endpoint])[0]];

            // We ectract the body if there is any
            if (endpointData.hasOwnProperty("requestBody")) {
                body = swaggerExtracter.getBodyExampleForEndpointFromSwaggerJson(endpoint, swaggerData, true);
            }

            // We ectract the responses if there are any
            if (endpointData.hasOwnProperty("responses")) {
                responses = endpointData.responses;
            }
        }

        return [header, body, responses];
    }
    
    contentFromSection(section, i) {
        // Check if the swagger data has loaded.
        if (Object.keys(this.props.swaggerData).length === 0 && this.props.swaggerData.constructor === Object) {
            return (
                <p key={i}>Loading...</p>
            );
        }
        
        const [header, body, responses] = this.getDataFromSwagger(section.id, this.props.swaggerData);
        
        return (
            <Step
                key={section.id}
                scrollId={section.id}
                title={section.title}
                description={section.description}
                imagelink={section.img}
                keywords={section.keywords}
                header={header}
                body={body}
                responses={responses}
            />
        );
    }

    render() {
        const sections = this.props.sections.slice();

        let items = [];
        Array.from(sections, (val, index) => { return items.push(this.contentFromSection(val, index)); });

        return (
            <div className="content-wrapper" > 
		        {items}
            </div>
        );
    }

}

Content.propTypes = propTypes;

export default Content;