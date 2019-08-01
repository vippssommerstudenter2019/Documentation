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
		// No Section-Title:
		// var subsections = [<div id={title} className="SectionTitle"/>];	
    for (const [id, subsection] of Object.entries(section)) {
            // We use the swagger extracter to get example headers, 
			// bodies and responses for every endpoint in this step.

            var endpointData = {};
            for (const endpoint of subsection.endpoints) {

                let header, body, responses;

                if (this.props.swaggerData.hasOwnProperty("openapi")) {
                    [header, body, responses] = openAPIExtracter.getExampleData(endpoint, this.props.swaggerData);
                }
                else if (this.props.swaggerData.hasOwnProperty("swagger")) {
                    [header, body, responses] = swaggerExtracter.getExampleData(endpoint, subsection.modes[endpoint], this.props.swaggerData);
                }

                endpointData[endpoint] = {
                    header: header,
                    body: body,
                    responses: responses
                }
            }

            subsections.push(
                <Step
                    titleid={id}
                    key={subsection.endpoints[0] + subsection.title}
                    metaData={subsection}
                    endpointData={endpointData}
                />
            );
        }

        return (
         <div>
         <div id={title} className="intro-title">{title}</div>
          {subsections}
         <div class="section-line">
					<div class="first-line">

					</div>
					<div class="section-end">
						{"End " + title}
					</div>
					<div class="last-line">
					</div>
				</div> 
        </div>
        );
    }

    render() {
        let components = [];

        // Check if the swagger data has loaded.
        if (Object.keys(this.props.swaggerData).length === 0 && this.props.swaggerData.constructor === Object) {
            // TODO: add some sort of animation here.
            return <div></div>;
        }


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