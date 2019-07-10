import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/go/go';
import 'codemirror/mode/http/http';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/ruby/ruby';

const propTypes = {
	language: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired
};

const codeMirrorLanguageMap = {
	"java": "text/x-java",
	"go": "text/x-go",
}

/**
 * Used in utility bar to make the languages title case and upper case.
 */
const utilityBarLanguageMap = {
	"java" : "Java",
	"python" : "Python",
	"go" : "Go",
	"http" : "HTTP",
	"shell" : "Shell",
	"javascript" : "JavaScript",
	"ruby" : "Ruby"
}

/**
 * Generates a hash from a string.
 */
export function getHashCodeFromString(string) {
	
	var hash = 0, i, chr;
	
	if (string.length === 0) return hash;

	for (i = 0; i < string.length; i++) {
		chr = string.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		 // Convert to 32bit integer
		hash |= 0;
	}
	return hash;
};


class CodeView extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			collapsed: true,
		};
		
		this.handleCopyClick = this.handleCopyClick.bind(this);
		this.handleExpand = this.handleExpand.bind(this);
	}

	/**
	 * Handles the click when the user wants to copy the code.
	 */
	handleCopyClick() {

		// We create a fake text area and inject the code into it
		let textArea = document.createElement("textarea");
		textArea.value = this.props.code;

		// Append the textarea under this code view.
		document.getElementById(this.props.code.hashCode()).appendChild(textArea);
		textArea.focus();
		textArea.select();

		// Try to copy from that text area
		try {
			document.execCommand("copy");

			// TODO: Implement overlay for successful copy when design is ready
			//var successful = document.execCommand('copy');
			// var msg = successful ? 'Copied' : 'Couldn\'t copy';
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		}

		document.getElementById(getHashCodeFromString(this.props.code)).removeChild(textArea);
	}
	
	handleExpand() {
		this.setState({collapsed: !this.state.collapsed});
	}


	render() {

		// The languages to choose from.
		let items = [];

		// Populate the utility bar with languages to choose
		Array.from(this.props.languages, (val, i) => {
			if (val === this.props.language) {
				items.push(<button className="selected"> {utilityBarLanguageMap[val]} </button>);
			}
			else {
				items.push(<button onClick={() => this.props.langcall(val)}> {utilityBarLanguageMap[val]} </button>);
			}

			return val;
		});

		// Settings for code mirror
		const options = {
			mode: codeMirrorLanguageMap[this.props.language] || this.props.language,
			theme: 'vipps',
			lineNumbers: true,
			lineWrapping: true,
		};
		
		const collapse = "codeview-collapse" + (this.state.collapsed? "" : " expanded");

		return (
			// Render a code mirror with an utility bar and style it according to Vipps style.
			// We give the first div an id of an unique hash corresponding to the code so when
			// we want to copy something out of it, the page won't scroll as we aren't adding
			// a textarea to the body, but this component.
			<div className="small-font-size" id={getHashCodeFromString(this.props.code)}> 
				<div className="codeview-utility-bar">
					<div className="codeview-utility-bar-left">
						{items}
					</div>
					<div className="codeview-utility-bar-right">
						<button onClick={this.handleCopyClick}>Copy</button>
					</div>
				</div>
				<div className={collapse}>
					<div className="codeview-collapse-content">
						<CodeMirror
							editorDidMount={ed => ed.refresh()}
							value={this.props.code}
							options={options}
							scrollbarStyle="null">
						</CodeMirror>
					</div>
					<button className="codeview-collapse-overlay" onClick={this.handleExpand}> 
						{(this.state.collapsed? "Expand" : " Close")} 
					</button>
				</div>
			</div>
		);
	}
}

CodeView.propTypes = propTypes;

export default CodeView;