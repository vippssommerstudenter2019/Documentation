import React, {Component} from "react";
import PropTypes from "prop-types";
import "./flowchart.css"

const propTypes = {
    content: PropTypes.object.isRequired,
};

class Flowchart extends Component {
	createImageComponent() {
		console.log("Rendering Flowchart!");
		if (this.props.content.imagePath) {
			return <img src={this.props.content.imagePath} alt="flowchart" />
		} else {
			return <div className="img-circle"></div>
		}
	}
	createFlexList() {
		if (!this.props.content.stepTitles) return;
		return this.props.content.stepTitles.map((val, i) => {
			
		});
	}
	render() {
		return (
			<div className="flow-wrapper">
				<div className="FlowTitle">
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
