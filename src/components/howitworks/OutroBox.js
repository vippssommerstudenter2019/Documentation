import React from 'react';
import { Link } from 'react-router-dom';

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
						<Link to={this.props.content.link}>
							<button className="outro-button" > 
								{this.props.content.buttonTitle}
							</button>
						</Link>
					</div>
				</div>
			</div>
        );
    }
}


export default OutroBox;
