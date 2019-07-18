import React from "react";
import PropTypes from "prop-types";
import Step from "./step/Step";
import SwaggerExtracter from "../../model/SwaggerExtracter"

const propTypes = {
    sections: PropTypes.object.isRequired,
    swaggerData: PropTypes.object.isRequired
};

const swaggerExtracter = new SwaggerExtracter();

class Content extends React.Component {

    contentFromSection(section) {
        // Check if the swagger data has loaded.
        if (Object.keys(this.props.swaggerData).length === 0 && this.props.swaggerData.constructor === Object) {
            return (
                <p key={section.title}>Loading...</p>
            );
        }

        // We use the swagger extracter to get example headers, bodies and responses for every endpoint in this step.
        var endpointData = {};
        for (const endpoint of section.endpoints) {
            const [header, body, responses] = swaggerExtracter.getExampleData(endpoint, this.props.swaggerData);
            endpointData[endpoint] = {
                header: header,
                body: body,
                responses: responses
            }
        }

        return (
            <Step
                key={section.endpoints[0] + section.title}
                metaData={section}
                endpointData={endpointData}
            />
        );
    }

    render() {
        let components = [];

        for (const section of Object.values(this.props.sections)) {
            components.push(
                this.contentFromSection(section)
            );
        }

        return (
            <div className="content-wrapper" > 
		        {components}
            </div>
        );
    }

}

Content.propTypes = propTypes;

export default Content;