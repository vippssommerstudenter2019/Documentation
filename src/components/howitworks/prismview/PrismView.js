import PropTypes from "prop-types";
import React, { Component } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import "./PrismView.css"

const propTypes = {
    code: PropTypes.string.isRequired
};

/**
 * A component which displays some header and body data and has got the option to copy from it.
 */
class PrismView extends Component {
	constructor(props) {
		super(props);
		this.getCode.bind(this);
	}
	
	getCode() {return this.props.code;};
	
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

    render() {
        const className = this.props.className? this.props.className : "";
        return (
		<div className={"prismview " + className}>
            <pre>
                <code className={"language-javascript"}>
                    {/* We have to add a new line here to get correct indentation in the code view. */}
                    {"\n" + this.props.code}
                </code>
            </pre>
		</div>
        );
    }
}


PrismView.propTypes = propTypes;

export default PrismView;