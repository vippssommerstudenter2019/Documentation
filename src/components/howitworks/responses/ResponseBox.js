import React from 'react';
import PropTypes from "prop-types";
import { objectIsEmpty } from '../../../Util';
import "./ResponseBox.css"
import Prism from 'prismjs';
import '../../../../node_modules/prismjs/themes/prism.css';

const propTypes = {
    statusCode: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    json: PropTypes.object.isRequired
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
                    <div key={this.props.statusCode} className="response-content">
                        <pre>
                            <code className="language-javascript">

                                {/* We have to add a new line here to get correct indentation in the code view. */}
                                {"\n" + JSON.stringify(this.props.json, null, 4)}
                            </code>
                        </pre>
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