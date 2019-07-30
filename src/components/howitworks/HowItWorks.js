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
	intro: PropTypes.string.isRequired,
	sections: PropTypes.string.isRequired,
	outro: PropTypes.string.isRequired,
	swaggerURL: PropTypes.string.isRequired,
};

/**
 * Represents a site where a certain Vipps API is given an overview and an implementation example.
 */
class HowItWorks extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			intro: yaml.safeLoad(this.props.intro),
			outro: yaml.safeLoad(this.props.outro),
			metaData: yaml.safeLoad(this.props.sections),
			swaggerData: {}
		};
	}

	componentDidMount() {
		// Fetch the json data from the swagger file at the given url.
		fetch(this.props.swaggerURL)
		.then(response => response.json())
		.then((response) => {

			// We use a reference parser to inject all the references in the json file with content, 
			// in that way we can extract bodies with examples for example.
			$RefParser.dereference(response, (error, data) => {
				if (error) {
					console.error(error);

					// TODO: Handle error
				}
				else {
					this.setState({ 
						intro: this.state.intro,
						outro: this.state.outro,
						swaggerData: data,
						metaData: this.state.metaData
					}); 
				}
			});    
		});
	}

	render() {

		let subsectionSideBarData = [];

		for (const subsections of Object.values(this.state.metaData)) {
			for (const [subsectionName, subsection] of Object.entries(subsections)) {
				subsectionSideBarData.push({ 
					name: subsection.title,
					anchor: "#" + subsectionName
				})
			}
		}

		var sideBarData = 
		[{
			name: "How it works",
			anchor: "#" + this.props.apiName,
			children: subsectionSideBarData
		}];
		
		return (
			<div className="App">
				<div id={this.props.apiName}/>
				<div className="Sidebar">
					<Sidebar headers={sideBarData} api="#ecom"/>
				</div>
				<IntroBox 	id={this.props.apiName}
							content={this.state.intro} />
				<Content 
					swaggerData={this.state.swaggerData}	
					sections={this.state.metaData}
				/>
				<OutroBox content={this.state.outro} />
			</div>
		)
	}
}

HowItWorks.propTypes = propTypes;

export default HowItWorks;
