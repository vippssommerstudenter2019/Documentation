import React, { Component } from 'react';
import DataView from "../dataview/DataView"
import ResponseTable from "../responses/ResponseTable";
import PropTypes from "prop-types";
import {TooltipText} from "../tooltip/Tooltip"
import "./Step.css"
import { objectIsEmpty } from '../../../Util';


/**
 * The propes required by this component. As the step component can include information about more than
 * one endpoint, we have objects and list for the descriptions, endpoints, modes etc.
 * 
 * id: The identifier for this step. Used with the sidebar to scroll to this step.
 * 
 * MetaData includes:
 * 
 * title : string
 * introduction : string
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
	id: PropTypes.string.isRequired,
	metaData: PropTypes.object.isRequired,
	endpointData: PropTypes.object.isRequired
};


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
			return <img src={this.props.metaData.imagePath} alt={this.props.metaData.title} />
		}

		return;
	}

	/**
	 * Returns a container with the header and body codeviews for a given endpoint.
	 * 
	 * @param {*} endpoint The endpoint to create header and body components for.
	 */
	createBodyAndHeaderComponentsForEndpoint(endpoint) {
		let items = [];

		if (!objectIsEmpty(this.props.endpointData[endpoint].header)) {
			items.push(
				<DataView key={endpoint}
					title={this.props.metaData.modes[endpoint] + " " + endpoint}
					header={this.props.endpointData[endpoint].header}
					body={this.props.endpointData[endpoint].body}
					shouldCollapse={true}
					spaceForJson={spaceForJson} />
			);
		}

		return items;
	}

	/**
	 * Constructs one endpoint component with description, responses and data view (header and body).
	 * 
	 * @param {*} endpoint The endpoint to construct for.
	 */
	createEndpointContent(endpoint) {
		let content = [];

		// Left part of the step: text and responses
		let textAndReponseComponents = [];
		textAndReponseComponents.push(
			<div key="description" className="step-description">
				<TooltipText input={this.props.metaData.descriptions[endpoint]}
					keywordsData={this.props.metaData.keywords} />
			</div>
		);

		// Not all endpoints have responses, so we include them only if they are given
		if (this.props.metaData.responses) {
			textAndReponseComponents.push(
				<ResponseTable key={"response" + endpoint} responses={this.props.endpointData[endpoint].responses} />
			);
		}

		content.push(
			<div key={endpoint + "-data"} className="step-data">
				{this.createBodyAndHeaderComponentsForEndpoint(endpoint)}
			</div>
		);

		content.push(
			<div key={endpoint + "-text-responses"} className="step-text-responses">
				{textAndReponseComponents}
			</div>
		);

		return content;
	} 

	render() {

		let content = [];

		// As one step can inlcude more than one endpoint, we loop through them 
		// and append all of them
		for (const endpoint of this.props.metaData.endpoints) {
			content.push(this.createEndpointContent(endpoint));
		}

		// Only add the introduction component if there is one provided. This will prevent the extra padding on steps that don't have a introduction.
		let introductionComponent = [];
		if (this.props.metaData.introduction) {
			introductionComponent = (
				<div className="step-introduction">
					<TooltipText input={this.props.metaData.introduction} keywordsData={this.props.metaData.keywords} />
				</div>
			);
		}

		return (
			<div className="step-wrapper">
				{/*this.createImageComponent()*/}
				<div id={this.props.id} key="title" className="step-title">
					{this.props.metaData.title}
				</div>
				{introductionComponent}
				<div className="step-content" key={this.props.metaData.title + "-content"}>
					{content}
				</div>
			</div>
		);
	}
}

Step.propTypes = propTypes;

export default Step;

