import React, {Component} from "react";
import PropTypes from "prop-types";
import "./flowchart.css"

const propTypes = {
    content: PropTypes.object.isRequired,
};

class Flowchart extends Component {
	createImageComponent() {
		const width = window.innerWidth; 
		if (width <= 812 && this.props.content.mobileImage) {
			return <img src={this.props.content.mobileImage} alt="flowchart" />;
		}
		if (width <= 1100 && this.props.content.tabletImage) {
			return <img src={this.props.content.tabletImage} alt="flowchart" />;
		}
		if (this.props.content.browserImage) {
			return <img src={this.props.content.browserImage} alt="flowchart" />;
		}
		if (this.props.content.tabletImage) {
			return <img src={this.props.content.tabletImage} alt="flowchart" />;
		}
		return <img src={this.props.content.mobileImage} alt="flowchart" />;
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
