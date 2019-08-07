import React from "react";
import PropTypes from "prop-types";
import Step from "./step/Step";
import SwaggerExtracter from "../../model/SwaggerExtracter"
import OpenAPIExtracter from "../../model/OpenAPIExtracter";

const propTypes = {
    sections: PropTypes.object.isRequired,
    swaggerData: PropTypes.object.isRequired
};

const openAPIExtracter = new OpenAPIExtracter();
const swaggerExtracter = new SwaggerExtracter();

class Content extends React.Component {

    contentFromSection(title, section) {
    var subsections = [];
	
    for (const [id, subsection] of Object.entries(section)) {
            // We use the swagger extracter to get example headers, 
			// bodies and responses for every endpoint in this step.
			
            var endpointData = {};
			if (subsection.endpoints)
            for (const endpoint of subsection.endpoints) {
				const {name, mode} = endpoint;
				
                let header, body, responses;

                if (this.props.swaggerData.hasOwnProperty("openapi")) {
                    [header, body, responses] = openAPIExtracter.getExampleData(name, this.props.swaggerData);
                }
                else if (this.props.swaggerData.hasOwnProperty("swagger")) {
                    [header, body, responses] = swaggerExtracter.getExampleData(name, mode, this.props.swaggerData);
                }
				//console.log(endpoint, header);
                endpointData[name] = {
                    header: header,
                    body: body,
                    responses: responses
                }
            }
			
            subsections.push(
                <Step
                    titleid={id}
                    key={id + subsection.title}
                    metaData={subsection}
                    endpointData={endpointData}
                />
            );
        }

        return (
        <div key={"wrapper-"+title} >
			<div id={title} className="intro-title">{title}</div>
				{subsections}
			<div className="section-line">
				<div className="first-line"/>
				<div className="section-end">
					{"End of: " + title}
				</div>
				<div className="last-line"/>
			</div> 
        </div>
        );
    }

    render() {
        let components = [];

        for (const [title, section] of Object.entries(this.props.sections)) {
            components.push(this.contentFromSection(title, section));
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