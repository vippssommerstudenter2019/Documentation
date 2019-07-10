import React, { Component } from 'react';
import CodeView from "./CodeView";
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
					<a className="rc-custom-link" href="https://www.vipps.no" target="_blank" rel="noopener noreferrer">See the API documentation for more info</a>
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

			const matchWithoutBrackets = match.replace(/[\[\]']+/g, '');

			result.push(createToolTip(matchWithoutBrackets, keywords[matchWithoutBrackets]));
			currentIndex = indexOfMatch + match.length;
		}

		result.push(input.substring(currentIndex, input.length));
	}

	return (
		<p>
			{result}
		</p>
	);
}

/*
Wrapper for future content: code + text + image
ScrollLinking
*/
const titleClass = "xlarge-font-size text-color-black";
const descriptionClass = "default-font-size text-color-black";

class Step extends Component {
	/*
		Supportet / Needed Props:
			title		->	the Title of the step
			description	->	the Description of the step
			scrollId	->	the scroll ref-id
		*	s_language	->	the language of the displayed code
		*	s_code	 	->	the actual code, .. in the correct language
		*	imagelink	->	a relevant image
		*	position 	->	the position of the image [ 'left' / 'right' ]
			
		* optional
	*/

	render() {
		const imgflt = "step-img-" + ((this.props.position === 'left') ? "right" : "left");

		return (
			<div className="step-wrapper" id={this.props.scrollId}>
				<div className={"step-text"} vertical-align="center">

					<div className="step-sub-text">
						<b>
							<div className={titleClass}>{this.props.title}</div>
						</b>
					</div>

					<div className="step-sub-text">
						<div className={descriptionClass}>
							<div>
								{this.props.description}
							</div>
						</div>
					</div>

				</div>

				<div className={imgflt} vertical-align="center">
					<img src={this.props.imagelink} alt={this.props.title}/>
				</div>

			</div>
		);
	}
}

class CodeStep extends Component {

	render() {
		const imgflt = "code-img-" + ((this.props.position === 'left')? "right" : "left");
		const langcall = this.props.langcall;
    
		return (
			<div className="code-wrapper" id={this.props.scrollId}>

				<div className="code-title">
					<b>
						<div className={titleClass}>{this.props.title}</div>
					</b>
				</div>

				<div className="code-description" >

					<div className={descriptionClass}>
						{formatDescriptionToIncludeHoverLinks(this.props.description, this.props.keywords)}
					</div>
				</div>

				<div className="code-code" >
					<CodeView 
						languages={this.props.languages}
						language={this.props.language} 
						langcall={langcall}
						code={this.props.code} 
					/>
				</div>

				<div className={imgflt}>
					<img src={this.props.imagelink} alt={this.props.title}/>
				</div>

			</div>
		);
	}
}

export {
	Step,
	CodeStep,
};

