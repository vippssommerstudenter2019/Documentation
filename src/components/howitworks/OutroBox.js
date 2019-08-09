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
       return (
			<div className="outro-wrapper">
				<div className="outro-element">
					<div className="outro-image">
						<img src={this.props.content.imagePath} alt="Springing into action!"/>
					</div>
					<div className="outro-text" >
						
							<div className="outro-title">
								{this.props.content.title}
							</div>
						
						<div className="outro-sub">
							{this.props.content.description} 
						</div>
					</div>
					<div className="outro-link" >
						<a href={this.props.content.link}>
							<button className="outro-button" > 
								eCom API Documentation
							</button>
						</a>
					</div>
				</div>
			</div>
        );
    }
}

OutroBox.propTypes = propTypes;

export default OutroBox;