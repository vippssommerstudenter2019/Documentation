import React, { Component } from 'react';
//import { StickyContainer, Sticky } from 'react-sticky';
//import CodeView from "./CodeView";
//import {Prism} from 'prismjs';
import Tooltip from "rc-tooltip";
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

class Step extends Component {
	leftPart() {
		let items = [];
		if (this.props.title) items.push(
			<div className="step-title xlarge-font-size text-color-black">
				{this.props.title}
			</div>
		);
		
		if (this.props.description) items.push(
			<div className="step-description"> 
				{formatDescriptionToIncludeHoverLinks(this.props.description, this.props.keywords)} 
			</div>
		);
		
		if (this.props.statusCodes){
			let codes = [];
			Array.from(this.props.statusCodes, (v, i) => {
				// Momentarily solution for Status Codes
				codes.push(
					<tr>
						<th> {i} </th>
						<th> {v} </th>
					</tr>
				);
				return v;
			});
			items.push(
				<div className="step-box">
					<table>
						{codes}
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
		
		// Momentarily solution for jsons!
		if (this.props.head) items.push(
			<div className="step-box step-description">
					{this.prismify(this.props.head)}
			</div>
		);
		
		if (this.props.body) items.push(
			<div className="step-box step-description">
					{this.prismify(this.props.body)}
			</div>
		);
		return (
			<div className="step-right">
				{items}
			</div>
		);
	}
	
	prismify(code) {
		return (
			<pre>
				<code className="language-javascript" >
					{code}
				</code>
			</pre>
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

