import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    content: PropTypes.object.isRequired,
};

/**
 * Represents a box with a short overview over the content.
 */
class OutroBox extends React.Component {

    render() {
		/*
		<div className="large-font-size">
							{this.props.content.subtitle}
						</div>
		*/
        return (
				<div className="outro-wrapper">
					<div className="outro-image">
						<img src={this.props.content.imgPath} alt="Springing into action!"/>
					</div>
					<div className="outro-text" >
						<div className="xxlarge-font-size">
							<div className="outro-title">
								{this.props.content.title}
							</div>
						</div>
						<div className="large-font-size">
							{this.props.content.description} 
						</div>
					</div>
					<div className="outro-link" >
						<a href="https://www.vipps.no">
							<button className="button" > 
								eCom API Documentation
							</button>
						</a>
					</div>
				</div>
        );
    }
}

OutroBox.propTypes = propTypes;

export default OutroBox;