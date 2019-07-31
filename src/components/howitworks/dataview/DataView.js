import PropTypes from "prop-types";
import React, { Component } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import "./DataView.css"
import { objectIsEmpty, getHashCodeFromString } from "../../../Util";

const propTypes = {
    title: PropTypes.string.isRequired,
    header: PropTypes.object.isRequired,
    body: PropTypes.object.isRequired,
    shouldCollapse: PropTypes.bool.isRequired,
    spaceForJson: PropTypes.number.isRequired
};

/**
 * Determines the line height for when we'll apply a expandable element.
 */
const lineCountCollapsibleThreshold = 10;

/**
 * A component which displays some header and body data and has got the option to copy from it.
 */
class DataView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            showingHeader: true
        };

        this.handleCopyClick = this.handleCopyClick.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.switchMode = this.switchMode.bind(this);
    }

    /**
     * Need to re-run Prism when the component mounts to get syntax highlightning.
     */
    componentDidMount() {
        Prism.highlightAll();
    }

    /**
     * Makes Prism highlight the json after we switch between body and header.
     */
    componentDidUpdate() {
        Prism.highlightAll();
    }

	/**
	 * Handles the click when the user wants to copy the code.
	 */
    handleCopyClick() {

        // We create a fake text area and inject the code into it
        let textArea = document.createElement("textarea");
        const value = JSON.stringify(this.state.showingHeader ? this.props.header : this.props.body, null, this.props.spaceForJson);
        const id = getHashCodeFromString(value);
        textArea.value = value;

        // Append the textarea under this code view.
        document.getElementById(id).appendChild(textArea);
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

        document.getElementById(id).removeChild(textArea);
    }


    /**
     * Switches to showing body or header depending on what is currently viewed.
     */
    switchMode(event) {

        const button = event.target;
        const shouldShowHeader = button.innerHTML === "Header";
        const hasBody = !objectIsEmpty(this.props.body);

        button.classList.add("header-body-button-activated");
        
        if (shouldShowHeader) {
            if (hasBody) {
                button.nextSibling.classList.remove("header-body-button-activated");
            }
        }
        else {
            button.previousSibling.classList.remove("header-body-button-activated");
        }       

        this.setState({
            collapsed: this.state.collapsed,
            showingHeader: shouldShowHeader,
        });

        Prism.highlightAll();
    }

    handleExpand() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    /**
     * Returns the syntax hightlighted data component.
     */
    dataComponent(data) {
        return (
            <pre>
                <code className={"language-javascript"}>
                    {/* We have to add a new line here to get correct indentation in the code view. */}
                    {"\n" + data}
                </code>
            </pre>
        );
    }

    render() {

        // We check if the amount of lines in the data is above a certain limit, and add the collapsible only if
        // it's above that threshold
        const data = JSON.stringify(this.state.showingHeader ? this.props.header : this.props.body, null, this.props.spaceForJson);
        const lines = data.split("\n").length;

        let elements = [];

        if (lines > lineCountCollapsibleThreshold && this.props.shouldCollapse) {
            const collapse = "dataview-collapse" + (this.state.collapsed ? "" : " expanded");

            elements.push(
                <div key={this.props.title} className={collapse}>
                    <div className="dataview-collapse-content">
                        {this.dataComponent(data)}
                    </div>
                    <button className="dataview-collapse-overlay" onClick={this.handleExpand}>
                        {(this.state.collapsed ? "Expand" : " Close")}
                    </button>
                </div>
            );
        }
        else {
            elements.push(
                <div key={this.props.title} className="dataview-non-collapsable">
                    {this.dataComponent(data)}
                </div>
            );
        }

        // We add the components for switching between header and body
        // If there isn't a body provided, we won't add the button.
        let buttonComponents = [];
        buttonComponents.push(
            // We add the activated class so the header button will be highlighted initially
            <button key={this.props.title + "header"} className="header-body-button header-body-button-activated" onClick={this.switchMode}>Header</button>
        )

        if (!objectIsEmpty(this.props.body)) {
            buttonComponents.push(
                <button key={this.props.title + "body"} className="header-body-button" onClick={this.switchMode}>Body</button>
            )
        }

        return (
            // Render a container with code with an utility bar and style it according to Vipps style.
            // We give the first div an id of an unique hash corresponding to the code so when
            // we want to copy something out of it, we know which component to grab the codde from
            <div className="dataview" id={getHashCodeFromString(data)}>
                <div className="dataview-title">{this.props.title}</div>
                <div className="dataview-utility-bar">
                    <button className="copy-button" onClick={this.handleCopyClick}>Copy</button>
                    {buttonComponents}
                </div>
                {elements}
            </div>
        );
    }
}


DataView.propTypes = propTypes;

export default DataView;