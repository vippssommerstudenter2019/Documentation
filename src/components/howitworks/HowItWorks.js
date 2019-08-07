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
import LottieAnimation from "./LottieAnimation";

/**
 * The input props. 
 */
const propTypes = {
	apiName: PropTypes.string.isRequired,
	intro: PropTypes.string,//remove
	sections: PropTypes.string,//remove
	outro: PropTypes.string,//remove
	swaggerURL: PropTypes.string,//remove
	yamlContentURL: PropTypes.string//.isRequired,
};

/**
 * Represents a site where a certain Vipps API is given an overview and an implementation example.
 */
class HowItWorks extends React.Component {
	
	constructor(props) {
		super(props);
		const getWidth = () => (window.innerWidth > 0) ? window.innerWidth : window.screen.width;
		const setLoaded = () => setTimeout(() => this.setState({loaded: true}), 1000);
		this.state = {
			pageWidth: getWidth(),
			intro: null,
			outro: null,
			flowchart: null,
			metaData: null,
			loaded: false,
			swaggerData: {}
		};
		fetch(this.props.yamlContentURL)
		.then(response => response.text())
		.then((text) => {
			const fullContent = yaml.safeLoad(text);
			this.setState({
				intro: fullContent.Intro,
				outro: fullContent.Outro,
				flowchart: fullContent.FlowChart,
				metaData: fullContent.Sections,
			});
			this.loadSwagger(fullContent.SwaggerURL);
			setLoaded();
		});
	
		const resize = () => this.setState({pageWidth: getWidth()});
		resize.bind(this);
		window.onresize = resize;
	}

	loadSwagger(swaggerURL) {
		// Fetch the json data from the swagger file at the given url.
		fetch(swaggerURL)
		.then(response => response.json())
		.then((response) => {
			// We use a reference parser to inject all the references in the json file with content, 
			// in that way we can extract bodies with examples for example.
			$RefParser.dereference(response, (error, data) => {
				if (error) {
					console.error("SwaggerLoadError: ", error);

					// TODO: Handle error
				}
				else {
					this.setState({swaggerData: data}); 
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
		
		const sections = Object.entries(this.state.metaData)
		for (const [section, subsections] of sections) {
			var children = toSec(section);
			for (const [subsection, content] of Object.entries(subsections)) {
				children.push(toSub(subsection, content));
			}
		}
		
		return <Sidebar headers={sideBarData} expandAll api="#ecom"/>;
	}

	render() {
		if (!this.state.loaded) return <LottieAnimation className="LoadingSpinner" path="/loading_spinner.json"/>;
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
 