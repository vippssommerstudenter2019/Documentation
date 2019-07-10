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
                    <div className="xxlarge-font-size">
                        <div className="intro-title">
                            {this.props.content.title}
                        </div>
                    <div className="xlarge-font-size">
                        {this.props.content.subtitle}
                    </div>
                    <br/>
                    </div>
                    <div className="default-font-size">
                        {this.props.content.description} 
                    </div>
                </div>
            </div>
        );
    }
}

IntroBox.propTypes = propTypes;

export default IntroBox;