import PropTypes from "prop-types";
import React, { Component } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import "./CodeView.css"

const propTypes = {
    title: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
};

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

/**
 * A component which displays some code and has got the option to copy from it.
 */
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
     * Need to re-run Prism when the component mounts to get syntax highlightning.
     */
    componentDidMount() {
        Prism.highlightAll();
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
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {

        const collapse = "codeview-collapse" + (this.state.collapsed ? "" : " expanded");

        return (
            // Render a container with code with an utility bar and style it according to Vipps style.
            // We give the first div an id of an unique hash corresponding to the code so when
            // we want to copy something out of it, the page won't scroll as we aren't adding
            // a textarea to the body, but this component.
            <div className="codeview" id={getHashCodeFromString(this.props.code)}>
                <div className="codeview-utility-bar">
                    <p>{this.props.title}</p>
                    <button onClick={this.handleCopyClick}>Copy</button>
                </div>
                <div className={collapse}>
                    <div className="codeview-collapse-content">
                        <pre>
                            <code className={"language-" + this.props.language}>
                                {this.props.code}
                            </code>
                        </pre>
                    </div>
                    <button className="codeview-collapse-overlay" onClick={this.handleExpand}>
                        {(this.state.collapsed ? "Expand" : " Close")}
                    </button>
                </div>
            </div>
        );
    }
}


CodeView.propTypes = propTypes;

export default CodeView;