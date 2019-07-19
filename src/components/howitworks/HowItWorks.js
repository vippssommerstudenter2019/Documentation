import React from 'react';
import Content from "./Content"
import IntroBox from "./IntroBox";
import OutroBox from "./OutroBox";
import PropTypes from "prop-types";
import "../../model/SwaggerExtracter";
import '../../styles/how-it-works.css';
import $RefParser from "json-schema-ref-parser";
import yaml from "js-yaml";
import Sidebar from '../sidebar/sidebar';

/**
 * The input props. 
 */
const propTypes = {
	apiName: PropTypes.string.isRequired,
	intro: PropTypes.object.isRequired,
	sections: PropTypes.string.isRequired,
	outro: PropTypes.object.isRequired,
	swaggerURL: PropTypes.string.isRequired,
};

/**
 * Represents a site where a certain Vipps API is given an overview and an implementation example.
 */
class HowItWorks extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			metaData: yaml.safeLoad(this.props.sections),
			swaggerData: {}
		};
	}

	componentDidMount() {
		// Fetch the json data from the swagger file at the given url.
		fetch(this.props.swaggerURL)
		.then(response => response.json())
		.then((response) => {

			// We use a reference parser to inject all the references in the json file with content, in that way we can extract bodies with examples for example.
			$RefParser.dereference(response, (error, data) => {
				if (error) {
					console.error(error);

					// TODO: Handle error
				}
				else {
					this.setState({ 
						swaggerData: data,
						metaData: this.state.metaData
					}); 
				}
			});    
		});
	}

	render() {

		let subsectionSideBarData = [];

		for (const [sectionName, subsections] of Object.entries(this.state.metaData)) {
			for (const [subsectionName, subsection] of Object.entries(subsections)) {
				subsectionSideBarData.push({ 
					name: subsection.title,
					anchor: "#" + subsectionName
				})
			}
		}

		var sideBarData = [
			{
				name: "How it works",
				anchor: "#" + this.props.apiName,
				children: subsectionSideBarData
			}
		];
		
		return (
			<div className="App">
				<div className="Sidebar">
					<Sidebar headers={sideBarData} api="#ecom"/>
				</div>
				<IntroBox 	id={this.props.apiName}
							content={this.props.intro} />
				<Content 
					swaggerData={this.state.swaggerData}	
					sections={this.state.metaData}
				/>
				<OutroBox content={this.props.outro} />
			</div>
		)
	}
}

HowItWorks.propTypes = propTypes;

export default HowItWorks;
