import React, { Component } from 'react';
import Tooltip from "rc-tooltip";
import DataView from "../dataview/DataView"
import ResponseTable from "../responses/ResponseTable";
import PropTypes from "prop-types";
import 'rc-tooltip/assets/bootstrap.css';
import "./Step.css"
import { objectIsEmpty } from '../../../Util';


/**
 * The propes required by this component. As the step component can include information about more than
 * one endpoint, we have objects and list for the descriptions, endpoints, modes etc.
 * 
 * MetaData includes:
 * 
 * title : string
 * subtitle : string
 * imagePath : string
 * descriptions: object 
 * endpoints: list
 * modes: object  (POST, PUT, DELETE etc. for the different endpoint)
 * responses: list (which endpoints to include responses for, can be empty if none shall be displayed)
 * keywords: object
 * 
 * EndpointData inlcudes a dictionary of endpoints with example headers, bodies and responses.
 */
const propTypes = {
	metaData: PropTypes.object.isRequired,
	endpointData: PropTypes.object.isRequired
};


/**
 * Creates a tooltip for some word with a given description.
 * 
 * @param {*} keyword The word to create the tooltip for.
 * @param {*} keywordData The keyword data to create the tooltip for.
 */
export function createToolTip(keyword, keywordData) {

	return (
		<Tooltip
			key={keyword}
			overlay={
				<div className="padding-s default-font-size keyword-overlay">
					<div className="large-font-size">
						<b>{keywordData.title}</b>
					</div>
					<br />
					<div className="default-font-size">
						{keywordData.description}
					</div>
					<br />
					<br />
					<a className="rc-custom-link" href={keywordData.link} target="_blank" rel="noopener noreferrer">API documentation</a>
				</div>
			}
			placement="bottom">
			<button className="underlined-purple"><u>{keyword}</u></button>
		</Tooltip>
	);
}

/**
 * Injects tooltips (popups on hover) for a given input for some keywords.
 * 
 * @param {*} input The text to inject tooltips into.
 * @param {*} keywords The keywords that should be hoverable and display a tooltip.
 */
export function formatDescriptionToIncludeTooltips(input, keywords) {
	const matches = input.match(/\[.*?\]/g);
	let result = [];

	if (matches && !objectIsEmpty(keywords)) {
		let currentIndex = 0;

		for (const match of matches) {
			const indexOfMatch = input.indexOf(match);
			result.push(input.substring(currentIndex, indexOfMatch));

			const matchWithoutBrackets = match.replace(/[[\]]/g, '');
			result.push(createToolTip(matchWithoutBrackets, keywords[matchWithoutBrackets]));
			currentIndex = indexOfMatch + match.length;
		}

		result.push(input.substring(currentIndex, input.length));
	}
	else {
		result.push(input.replace(/[[\]]/g, ''));
	}

	return (
		<div className="step-paragraph">
			{result}
		</div>
	);
}

/**
 * Essentially the tab size within the json in the header and body.
 */
const spaceForJson = 4;


class Step extends Component {

	/**
	 * Returns a container containing the image (if there was provided one).
	 */
	createImageComponent() {
		if (this.props.metaData.imagePath) {
			return (
				<div className="step-img">
					<img src={this.props.metaData.imagePath} alt={this.props.metaData.title} />
				</div>
			);
		}

		return;
	}

	/**
	 * Returns a container with the header and body codeviews for a given endpoint.
	 * 
	 * @param {*} endpoint The endpoint to create header and body components for.
	 */
	createBodyAndHeaderComponents(endpoint) {
		let items = [];

		if (!objectIsEmpty(this.props.endpointData[endpoint].header)) {
			items.push(
				<div key="head" className="step-box">
					<DataView title={this.props.metaData.modes[endpoint] + " " + endpoint} 
							  header={this.props.endpointData[endpoint].header} 
							  body={this.props.endpointData[endpoint].body}
							  shouldCollapse={true}
							  spaceForJson={spaceForJson}/>
				</div>
			);
		}

		return items;
	}

	render() {

		let components = [];

		// As one step can inlcude more than one endpoint, we loop through them 
		// and append all of them
		for (const endpoint of this.props.metaData.endpoints) {

			// Left part of the step: text and responses
			let leftComponents = [];
			leftComponents.push(
				<div key="description" className="step-description">
					{formatDescriptionToIncludeTooltips(this.props.metaData.descriptions[endpoint], this.props.metaData.keywords)}
				</div>
			);

			// Not all endpoints have responses, so we include them only if they are given
			if (this.props.metaData.responses.includes(endpoint)) {
				leftComponents.push(
					<ResponseTable key={"response" + endpoint} responses={this.props.endpointData[endpoint].responses} />
				);
			}

			components.push(
				<div className="step-content-wrapper" key={endpoint + "-content"}>
					<div className="step-right">
						{this.createBodyAndHeaderComponents(endpoint)}
					</div>
					<div className="step-left">
						{leftComponents}
					</div>
				</div>
			);
		}


		return (
			<div className="step-wrapper">
				{this.createImageComponent()}
				<div key="title" className="step-title xlarge-font-size">
					{this.props.metaData.title}
				</div>
				<div className="step-subtitle">{this.props.metaData.subtitle}</div>
				{components}
			</div>
		);
	}
}

Step.propTypes = propTypes;

export default Step;

