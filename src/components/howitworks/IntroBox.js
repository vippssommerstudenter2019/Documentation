import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    content: PropTypes.object.isRequired,
};

/**
 * Represents a box with a short overview over the content.
 */
class IntroBox extends React.Component {
    render() {
        return (
			<div className="intro-wrapper">

					<div className="first-headline vippsorange">
						{this.props.content.title}
					</div>

					<div className="preamble">
						{this.props.content.introduction}
					</div>

					<div className="body-text p-spacing">
						{this.props.content.description} 
					</div>

					<div className="body-text p-spacing">
						{this.props.content.descriptiontwo} 
					</div>
			</div>
        );
	}
};

IntroBox.propTypes = propTypes;

export default IntroBox;
