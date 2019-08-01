import React from 'react';
import PropTypes from "prop-types";
import { objectIsEmpty } from '../../../Util';
import "./ResponseBox.css"
import PrismView from "../prismview/PrismView";
import Prism from 'prismjs';

const propTypes = {
    statusCode: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    json: PropTypes.object.isRequired,
	spaceForJson: PropTypes.number.isRequired
};

class ResponseBox extends React.Component {

    constructor(props) {
        super(props);
        this.expandCollapsible = this.expandCollapsible.bind(this);
    }

    componentDidMount() {
        Prism.highlightAll();
    }

    /**
     * Expands the collapsible.
     */
    expandCollapsible(event) {
        event.target.classList.toggle("response-active");
        var content = event.target.nextElementSibling;
		if (content.style.maxHeight) {
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		}
    }

    render() {

        const error = !this.props.statusCode.startsWith("2");
        const buttonClassName = "response-button-collapsible" + (error ? " error" : "");
        const displayerClassName = "response-displayer-collapsible" + (error ? " error" : "");

        // There is content in the response, we'll add a collapsible to display the response. 
        if (!objectIsEmpty(this.props.json)) {
            return (
                <div key={this.props.statusCode} className="response-wrapper codeview">
                    <button className={buttonClassName} onClick={this.expandCollapsible}>
                        <b>{this.props.statusCode}</b> {this.props.description}
                    </button>
                    <div className="response-content">
						<PrismView code={JSON.stringify(this.props.json, null, this.props.spaceForJson)}/>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div key={this.props.statusCode} className="response-wrapper">
                    <div className={displayerClassName}>
                        <b>{this.props.statusCode}</b> {this.props.description}
                    </div>
                </div>
           );
        }
    }
}


ResponseBox.propTypes = propTypes;

export default ResponseBox;