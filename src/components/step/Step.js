import React, { Component } from 'react';
import Tooltip from "rc-tooltip";
import CodeView from "../codeview/CodeView"
import Response from "./Response";
import 'rc-tooltip/assets/bootstrap.css';
import "./Step.css"
import "../../Util"

export function titleCase(str) {
	let splitStr = str.split(' ');

	for (let i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}

	return splitStr.join(' ');
}

/**
 * Creates a tooltip for some word with a given description.
 * 
 * @param {*} word The word to create the tooltip for.
 * @param {*} description The description of the word that will popup on hover.
 */
export function createToolTip(word, description) {
	return (
		<Tooltip
			key={word}
			overlay={
				<div className="padding-s default-font-size keyword-overlay">
					<div className="large-font-size">
						<b>{titleCase(word)}</b>
					</div>
					<br/>
					<div className="default-font-size">
						{description}
					</div>
					<br/>
					<br/>
					<a className="rc-custom-link" href="http://localhost:3000/documentation/ecommerce/#authentication" target="_blank" rel="noopener noreferrer">See the API documentation for more info</a>
				</div>
			}
			placement="bottom">
			<button className="underlined-purple"><u>{word}</u></button>
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

	if (matches) {
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
	getImageComponent() {
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
	getTextComponents() {
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
	getDataComponents() {	
		let items = [];
		
		if (!this.props.header.isEmpty()) {
			items.push(
				<div key="head" className="step-box">
						<CodeView title="Header" code={JSON.stringify(this.props.header, null, spaceForJson)} language="javascript" />
				</div>
			);
		}
	
		if (!this.props.body.isEmpty()) {
			items.push(
				<div key="body" className="step-box">
						<CodeView title="Body" code={JSON.stringify(this.props.body, null, spaceForJson)} language="javascript"/>
				</div>
			);
		}

		return items;
	}

	getResponsesComponent() {

		let items = [];

		if (!this.props.responses.isEmpty()) {

			const statusCodes = Object.keys(this.props.responses).sort();

			for (const statusCode of statusCodes) {
				let content = {};

				if (this.props.responses.hasOwnProperty("content")) {
					content = this.props.repsonses[statusCode].content;
				}

				items.push(
					<div key={statusCode}>
						<Response statusCode={statusCode} description={this.props.responses[statusCode].description} content={content}/>
					</div>
				);
			}
		}

		return items;
	}
		
	render() {
		return (
			<div className="step-wrapper">
				{this.getImageComponent()}
				<div className="step-right">
					{this.getDataComponents()}
				</div>
				<div className="step-left">
					{this.getTextComponents()}
					{this.getResponsesComponent()}
				</div>
			</div>
		);
	}
}

export {
	Step
};

