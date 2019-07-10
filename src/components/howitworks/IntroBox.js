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
                    <div className="large-font-size">
                        {this.props.content.subtitle}
                    </div>
                    <div className="xxlarge-font-size">
                        <div className="intro-title">
                            {this.props.content.title}
                        </div>
                    </div>
                    <div className="large-font-size">
                        {this.props.content.description} 
                    </div>
                </div>
                <div className="intro-image">
                    <img src={this.props.content.imgPath} alt="Woman Using ecom"/>
                </div>
            </div>
        );
    }
}

IntroBox.propTypes = propTypes;

export default IntroBox;