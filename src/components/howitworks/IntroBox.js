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
				<div className="intro-text" >
					
					<div className="xxlarge-font-size intro-title">
						{this.props.content.title}
					</div>

					<div className="intro-sub">
						{this.props.content.introduction}
					</div>

					<div className="intro-description">
						{this.props.content.description} 
					</div>

					<div className="intro-description">
						{this.props.content.descriptiontwo} 
					</div>
				</div>
				
			</div>
        );
    }
};

class IntroPoints extends React.Component {
	render() {
		return (
			<div className="top-list">
				<div className="col-1">
					<li>test</li>
				</div>
				<div className="col-2">

				</div>
			</div>
		);
	}
}

IntroBox.propTypes = propTypes;

export default IntroBox;
