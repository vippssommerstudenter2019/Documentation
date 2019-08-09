import React, { Component } from 'react';
import DataView from "../dataview/DataView"
import PropTypes from "prop-types";
import {TooltipText} from "../tooltip/Tooltip";
import PrismView from "../prismview/PrismView";
import ResponseTable from "../responses/ResponseTable";
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
		const {name, description, mode, extras} = endpoint;
		const {header, body, responses} = this.props.endpointData[name];
		const check = (el) => (el && !objectIsEmpty(el));
		const toCode = (json) => JSON.stringify(json, null, spaceForJson);
		const toData = (title, text, component) => {return {title: title, copyText: text, component: component};};
		const keyTitle = mode + " " + name;
		
		var dataList = [];
		if (check(header)) {
			const code = toCode(header);
			const component = <PrismView key={keyTitle+"-header"} className="prismview1" code={code}/>;
			dataList.push(toData("Header", code, component));
		}
		if (check(body)) {
			const code = toCode(body);
			const component = <PrismView key={keyTitle+"-body"} className="prismview1" code={code}/>;
			dataList.push(toData("Body", code, component));
		}
		// This is the allowance of one additional DataViewField, that is purely listed in the .yaml file
		// Use it carefully, for quickly listing important parametres
		// But only if it will -NOT- be listed in the body, header or responses field!
		if (check(extras)) {
			for (const {name, code} of extras) {
				const component = <PrismView key={keyTitle+"-"+name} className="prismview1" code={code}/>;
				dataList.push(toData(name, code, component));
			}
		}
		if (check(responses)) {
			const code = (() => {
				const statusCodes = Object.keys(responses).sort()
				for (const statusCode of statusCodes) {
					const json = responses[statusCode].json;
					if (check(json)) return toCode(json);
				}
				return null;
			})();
			const component = <ResponseTable key={keyTitle+"-responses"} className="prismview2" responses={responses} spaceForJson={spaceForJson}/>;
			dataList.push(toData("Responses", code, component));
		}

		var out = [];
		if (check(description)) {
			out.push(
			<div key={keyTitle + "-text-responses"} className="step-text-responses body-text">
				<div key={keyTitle+"-description"} className="step-description body-text">
					<TooltipText input={description} keywordsData={this.props.metaData.keywords} />
				</div>
			</div>
			);
		}
		if (dataList.length !== 0) {
			out.push(
			<div key={keyTitle + "-data"} className="step-data">
				<DataView 
					key={keyTitle}
					title={keyTitle}
					content={dataList}
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
			<div className="step-introduction body-text">
				<TooltipText input={this.props.metaData.introduction} keywordsData={this.props.metaData.keywords} />
			</div>
			: null
		);

		return (
			<div className="step-wrapper" >
				<div className="step-headline">
					<div className="step-img">
						{this.createImageComponent()}
					</div>
					<div id={this.props.titleid} key="title" className="third-headline step-title">
						{this.props.metaData.title}
					</div>
				</div>
				{introductionComponent}
				{content}
			</div>
		);
	}
}

Step.propTypes = propTypes;

export default Step;

