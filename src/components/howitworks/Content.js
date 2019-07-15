import React from "react";
import PropTypes from "prop-types";
import {Step} from "./Step";
import SwaggerExtracter from "../../model/SwaggerExtracter"

const propTypes = {
    sections: PropTypes.array.isRequired,
    swaggerData: PropTypes.object.isRequired
};

class Content extends React.Component {


    getDataFromSwagger(swaggerData)  {

        let swaggerExtracter = new SwaggerExtracter();
        let header = {}, body = {}, responses = {};

        // Check out if the swagger file contains the id (which is the endpoint)
        if (swaggerData.paths.hasOwnProperty(section.id)) {

            // Retrieve the header
            header = swaggerExtracter.getHeaderForEndpointFromSwaggerJson(section.id, swaggerData);

            // Get the endpoint data which includes request body (if any), responeses etc.
            const endpointData = swaggerData.paths[section.id][Object.keys(swaggerData.paths[section.id])[0]];

            // We ectract the body if there is any
            if (endpointData.hasOwnProperty("requestBody")) {
                body = swaggerExtracter.getBodyExampleForEndpointFromSwaggerJson(section.id, swaggerData, true);
            }

            // We ectract the responses if there are any
            if (endpointData.hasOwnProperty("responses")) {
                responses = endpointData.responses;
            }
        }

        return [header, body, responses];
    }
    
    contentFromSection(section, i) {

        const [header, body, responses] = this.getDataFromSwagger(this.props.swaggerData);

        // Check if the swagger data has loaded.
        if (Object.keys(this.props.swaggerData).length === 0 && this.props.swaggerData.constructor === Object) {
            return (
                <p key={i}>Loading...</p>
            );
        }
        return (
            <Step
                key={section.id}
                scrollId={section.id}
                title={section.title}
                description={section.description}
                imagelink={section.img}
                keywords={section.keywords}
            />
        );
    }

    render() {
        const sections = this.props.sections.slice();

        let items = [];
        Array.from(sections, (val, index) => { return items.push(this.contentFromSection(val, index)); });

        return (
            <div className={this.props.className} > 
		        {items}
            </div>
        );
    }

}

Content.propTypes = propTypes;

export default Content;