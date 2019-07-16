import React, { Component } from 'react';
import Tooltip from "rc-tooltip";
import CodeView from "../codeview/CodeView"
import Response from "./Response";
import 'rc-tooltip/assets/bootstrap.css';
import "./Step.css"
import "../../Util"
import { objectIsEmpty } from '../../Util';

/**

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
					<br/>
					<div className="default-font-size">
						{keywordData.description}
					</div>
					<br/>
					<br/>
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
	imageComponent() {
		if (this.props.imagelink) {
			return (
				<div className="step-img">
					<img src={this.props.imagelink} alt={this.props.title} />
				</div>
			);	
		}

		return;
	}

	/**
	 * Returns the title and description components.
	 */
	textComponents() {
		let items = [];
		if (this.props.title) {
			items.push(
				<div key="title" className="step-title xlarge-font-size text-color-black">
					{this.props.title}
				</div>
			);
		}
		
		if (this.props.description) {
			// Format the description so it will include popups for keywords.
			items.push(
				<div key="description" className="step-description"> 
					{formatDescriptionToIncludeTooltips(this.props.description, this.props.keywords)} 
				</div>
			);
		}

		return items;
	}
	
	/**
	 * Returns a container with the header and body codeviews (if any for this step).
	 */
	bodyAndHeaderComponents() {	
		let items = [];
		
		if (!objectIsEmpty(this.props.header)) {
			items.push(
				<div key="head" className="step-box">
						<CodeView title="Header" code={JSON.stringify(this.props.header, null, spaceForJson)} language="javascript" shouldCollapse={false}/>
				</div>
			);
		}
	
		if (!objectIsEmpty(this.props.body)) {
			items.push(
				<div key="body" className="step-box">
						<CodeView title="Body" code={JSON.stringify(this.props.body, null, spaceForJson)} language="javascript" shouldCollapse={true}/>
				</div>
			);
		}

		return items;
	}

	/**
	 * Will return all the responses of the endpoint with example bodies (if any).
	 */
	responsesComponent() {

		let items = [];

		if (!objectIsEmpty(this.props.responses)) {

			const statusCodes = Object.keys(this.props.responses).sort();

			for (const statusCode of statusCodes) {
				let json = {};

				if (this.props.responses[statusCode].hasOwnProperty("content")) {
					json = this.props.responses[statusCode].content;
				}

				items.push(
					<div key={statusCode}>
						<Response statusCode={statusCode} description={this.props.responses[statusCode].description} json={json}/>
					</div>
				);
			}
		}

		return items;
	}
		
	render() {
		return (
			<div className="step-wrapper">
				{this.imageComponent()}
				<div className="step-right">
					{this.bodyAndHeaderComponents()}
				</div>
				<div className="step-left">
					{this.textComponents()}
					{this.responsesComponent()}
				</div>
			</div>
		);
	}
}

export {
	Step
};

