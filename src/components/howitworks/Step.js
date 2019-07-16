import React, { Component } from 'react';
import Tooltip from "rc-tooltip";
import CodeView from "../codeview/CodeView"
import 'rc-tooltip/assets/bootstrap.css';

export function titleCase(str) {
	let splitStr = str.split(' ');

	for (let i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}

	return splitStr.join(' ');
}

export function createToolTip(text, description) {
	return (
		<Tooltip
			key={text}
			overlay={
				<div className="padding-s default-font-size keyword-overlay">
					<div className="large-font-size">
						<b>{titleCase(text)}</b>
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
			<button className="underlined-purple"><u>{text}</u></button>
		</Tooltip>
	);
}

export function formatDescriptionToIncludeHoverLinks(input, keywords) {
	const matches = input.match(/\[.*?\]/g);
	let result = [];

	if (matches) {
		let currentIndex = 0;

		for (const match of matches) {
			const indexOfMatch = input.indexOf(match);
			result.push(input.substring(currentIndex, indexOfMatch));
			
			// eslint-disable-next-line
			const matchWithoutBrackets = match.replace(/[\[\]']+/g, ''); // NO SONAR

			result.push(createToolTip(matchWithoutBrackets, keywords[matchWithoutBrackets]));
			currentIndex = indexOfMatch + match.length;
		}

		result.push(input.substring(currentIndex, input.length));
	}
	else {
		// eslint-disable-next-line
		result.push(input.replace(/[\[\]']+/g, ''));
	}

	return (
		<div className="step-paragraph">
			{result}
		</div>
	);
}

export function objectIsEmpty(object) {

	return Object.keys(object).length === 0 && object.constructor === Object;
}


/**
 * Essentially the tab size within the json in the header and body.
 */
const spaceForJson = 4;


class Step extends Component {

	leftPart() {
		let items = [];
		if (this.props.title) items.push(
			<div key="title" className="step-title xlarge-font-size text-color-black">
				{this.props.title}
			</div>
		);
		
		if (this.props.description) items.push(
			<div key="desc" className="step-description"> 
				{formatDescriptionToIncludeHoverLinks(this.props.description, this.props.keywords)} 
			</div>
		);
		
		if (!objectIsEmpty(this.props.responses)) {
			let codes = [];
			Array.from(this.props.responses, (v, i) => {
				// Momentarily solution for Status Codes
				codes.push(
					<tr key={i} >
						<td> {i} </td>
						<td> {v} </td>
					</tr>
				);
				return v;
			});
			items.push(
				<div key="status" className="step-box">
					<table>
						<tbody>
							{codes}
						</tbody>
					</table>
				</div>
			);
		}
		return (
			<div className="step-left">
				{items}
			</div>
		);
	}
	
	rightPart() {	
		let items = [];
		
		if (!objectIsEmpty(this.props.header)) {
			items.push(
				<div key="head" className="step-box">
						<CodeView title="Header" code={JSON.stringify(this.props.header, null, spaceForJson)} language="javascript" />
				</div>
			);
		}
	
		if (!objectIsEmpty(this.props.body)) {
			items.push(
				<div key="body" className="step-box">
						<CodeView title="Body" code={JSON.stringify(this.props.body, null, spaceForJson)} language="javascript"/>
				</div>
			);
		}

		return (
			<div className="step-right">
				{items} 
			</div>
		);
	}
	
	imgPart() {
		if (this.props.imagelink) return(
			<div className="step-img">
				<img src={this.props.imagelink} alt={this.props.title}/>
			</div>
		);
		return;
	}
		
	render() {
		return (
			<div className="step-wrapper">
				{this.imgPart()}
				<div>
				{this.leftPart()}
				{this.rightPart()}
				</div>
			</div>
		);
	}
}

export {
	Step
};

