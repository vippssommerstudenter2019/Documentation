import React, { Component } from 'react';
import DataView from "../dataview/DataView"
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
	titleid: PropTypes.string.isRequired,
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
		} else {
			return <div className="img-circle"></div>
		}
	}

	/**
	 * Returns a container with the header and body codeviews for a given endpoint.
	 * 
	 * @param {*} endpoint The endpoint to create header and body components for.
	 */
	createEndpointDataComponent(endpoint) {
		if (!objectIsEmpty(this.props.endpointData[endpoint].header)) {
			return(
				<DataView key={endpoint}
					title={this.props.metaData.modes[endpoint] + " " + endpoint}
					header={this.props.endpointData[endpoint].header}
					body={this.props.endpointData[endpoint].body}
					responses={this.props.endpointData[endpoint].responses}
					shouldCollapse={true}
					spaceForJson={spaceForJson} 
				/>
			);
		}
	}

	/**
	 * Constructs one endpoint component with description, responses and data view (header and body).
	 * 
	 * @param {*} endpoint The endpoint to construct for.
	 */
	createEndpointContent(endpoint) {
		// is both step-text-response & step-description neccesary?
		const description = this.props.metaData.descriptions[endpoint];
		if (!description || objectIsEmpty(description)) 
		return <div key={endpoint+"-data"} className="step-data">{this.createEndpointDataComponent(endpoint)}</div>;
		return [ 
		<div key={endpoint + "-text-responses"} className="step-text-responses">
			<div key={endpoint+"-description"} className="step-description">
				<TooltipText input={this.props.metaData.descriptions[endpoint]} keywordsData={this.props.metaData.keywords} />
			</div>
		</div>
		,
		<div key={endpoint + "-data"} className="step-data">
			{this.createEndpointDataComponent(endpoint)}
		</div>
		];
	} 

	render() {

		let content = [];

		// As one step can inlcude more than one endpoint, we loop through them 
		// and append all of them
		for (const endpoint of this.props.metaData.endpoints) {
			content.push(this.createEndpointContent(endpoint));
		}

		// Only add the introduction component if there is one provided. This will prevent the extra padding on steps that don't have a introduction.
		const introductionComponent = (
		(this.props.metaData.introduction)?
			<TooltipText input={this.props.metaData.introduction} keywordsData={this.props.metaData.keywords} />
			: null
		);

		return (
			<div className="step-wrapper" >
				<div className="step-headline">
					<div className="step-img">
						{this.createImageComponent()}
					</div>
					<div id={this.props.titleid} key="title" className="step-title">
						{this.props.metaData.title}
					</div>
				</div>
				<div className="step-introduction">
					{introductionComponent}
				</div>
				{content}
			</div>
		);
	}
}

Step.propTypes = propTypes;

export default Step;

