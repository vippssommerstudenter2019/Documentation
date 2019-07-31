import React, {Component} from "react";
import PropTypes from "prop-types";
import "./flowchart.css"

const propTypes = {
    content: PropTypes.object.isRequired,
};

class Flowchart extends Component {
	createImageComponent() {
		console.log("Rendering Flowchart!");
		if (window.innerWidth <= 812 && !!this.props.content.mobileImage) {
			return <img src={this.props.content.mobileImage} alt="flowchart" />;
		} else if (!!this.props.content.browserImage) {
			return <img src={this.props.content.browserImage} alt="flowchart" />;
		} else if (!!this.props.content.mobileImage) {
			return <img src={this.props.content.mobileImage} alt="flowchart" />;
		}
		return <div className="img-circle"> Missing Flowchart </div>;
	}
	createFlexList() {
		if (!this.props.content.stepTitles) return;
		return this.props.content.stepTitles.map((val, i) => {
			
		});
	}
	render() {
		return (
			<div className="flow-wrapper">
				<div className="FlowTitle xlarge-font-size">
					{this.props.content.title}
				</div>
				<div className="FlowChart">
					{this.createImageComponent()}
				</div>
				<div className="FlowSteps">
					{this.createFlexList()}
				</div>
			</div>
		);
	}
}

Flowchart.propTypes = propTypes;

export default Flowchart;
