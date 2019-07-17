import React from "react";
import PropTypes from "prop-types";
import Step from "./step/Step";
import SwaggerExtracter from "../../model/SwaggerExtracter"

const propTypes = {
    sections: PropTypes.array.isRequired,
    swaggerData: PropTypes.object.isRequired
};

const swaggerExtracter = new SwaggerExtracter();

class Content extends React.Component {

    contentFromSection(section, i) {
        // Check if the swagger data has loaded.
        if (Object.keys(this.props.swaggerData).length === 0 && this.props.swaggerData.constructor === Object) {
            return (
                <p key={i}>Loading...</p>
            );
        }

        // We use the swagger extracter to get example headers, bodies and responses for every endpoint in this step.
        var endpointData = {};
        for (const endpoint of section.endpoints) {
            const [header, body, responses] = swaggerExtracter.getDataFromSwagger(endpoint, this.props.swaggerData);
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