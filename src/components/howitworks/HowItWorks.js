import React from 'react';
import Content from "./Content"
import IntroBox from "./IntroBox";
import Flowchart from "./flowchart/Flowchart";
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
			pageWidth: window.innerWidth,
			intro: yaml.safeLoad(this.props.intro),
			outro: yaml.safeLoad(this.props.outro),
			flowchart: this.props.flowchart? yaml.safeLoad(this.props.flowchart) : false,
			metaData: yaml.safeLoad(this.props.sections),
			swaggerData: {}
		};
	
		const resize = () => this.setState({pageWidth: window.innerWidth});
		resize.bind(this);
		window.onresize = resize;
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
	
	sidebar() {
		if (this.state.pageWidth <= 812) return;
		var sideBarData = [];
		const toSub = (subsection, content) => {
			return {
				name: content.title, 
				anchor: "#"+subsection
			};
		};
		
		const toSec = (section) => {
			var children = [];
			sideBarData.push({
				name: section,
				anchor: "#"+section,
				children: children
			});
			return children;
		};		
		
		for (const [section, subsections] of Object.entries(this.state.metaData)) {
			var children = toSec(section);
			for (const [subsection, content] of Object.entries(subsections)) {
				children.push(toSub(subsection, content));
			}
		}
		
		return <Sidebar headers={sideBarData} api="#ecom"/>;
	}

	render() {
		return (
			<div className="App">
				<div id={this.props.apiName}/>
				{this.sidebar()}
				<IntroBox content={this.state.intro} />
				{this.state.flowchart? <Flowchart content={this.state.flowchart} pagewidth={this.state.pageWidth}/> : null}
				<Content swaggerData={this.state.swaggerData} sections={this.state.metaData} />
				<OutroBox content={this.state.outro} />
			</div>
		);
	}
};

HowItWorks.propTypes = propTypes;

export default HowItWorks;
 