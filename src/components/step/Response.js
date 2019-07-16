import React from 'react';
import PropTypes from "prop-types";
import "../../Util"
import { objectIsEmpty } from '../../Util';

const propTypes = {
    statusCode: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired
};

class Response extends React.Component {

    render() {

        let content = [];

        // There is content in the response, we'll add a collapsible to display the response. 
        if (!objectIsEmpty(this.props.content)) {

        }

        const error = this.props.statusCode !== 200;
        const className = "collapsible" + (error ? " error" : "");

        return (
            <button className={className}><b>{this.props.statusCode}</b> {this.props.description}
                {content}
            </button>
        );
    }
}


Response.propTypes = propTypes;

export default Response;