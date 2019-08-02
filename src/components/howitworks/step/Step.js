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
			return <div className="img-circle"/>
		}
	}

	/**
	 * Constructs one endpoint component with description, responses and data view (header and body).
	 * 
	 * @param {*} endpoint The endpoint to construct for.
	 */
	createEndpointContent(endpoint) {
		const {name, description, mode} = endpoint;
		const {header, body, responses} = this.props.endpointData[name];
		const check = (el) => (el && !objectIsEmpty(el));
		console.log(name, description, mode);
		
		var out = [];
		if (check(description)) {
			out.push(
			<div key={name + "-text-responses"} className="step-text-responses">
				<div key={name+"-description"} className="step-description">
					<TooltipText input={description} keywordsData={this.props.metaData.keywords} />
				</div>
			</div>
			);
		}
		if (check(header) || check(body) || check(responses)) {
			out.push(
			<div key={name + "-data"} className="step-data">
				<DataView 
					key={name}
					title={mode + " " + name}
					header={header}
					body={body}
					responses={responses}
					spaceForJson={spaceForJson} 
				/>
			</div>
			);
		}			
		return out;
	} 

	render() {

		let content = [];

		// As one step can inlcude more than one endpoint, we loop through them 
		// and append all of them
		if (this.props.metaData.endpoints)
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

