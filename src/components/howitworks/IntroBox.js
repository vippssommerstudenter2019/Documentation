import React from 'react';

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

export default IntroBox;
