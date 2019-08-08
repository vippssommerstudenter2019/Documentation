import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './flowchart.css';

const propTypes = {
  content: PropTypes.object.isRequired,
  pagewidth: PropTypes.object.isRequired,
};

class Flowchart extends Component {
  createImageComponent() {
    const { pagewidth, content } = this.props;
    if (pagewidth <= 812 && content.mobileImage) {
      return <img src={content.mobileImage} alt="flowchart" />;
    }
    if (pagewidth <= 1100 && content.tabletImage) {
      return <img src={content.tabletImage} alt="flowchart" />;
    }
    if (content.browserImage) {
      return <img src={content.browserImage} alt="flowchart" />;
    }
    if (content.tabletImage) {
      return <img src={content.tabletImage} alt="flowchart" />;
    }
    return <img src={content.mobileImage} alt="flowchart" />;
  }

  render() {
    const { content } = this.props;
    return (
      <div className="flow-wrapper">
        <div className="step-title">
          {content.title}
        </div>
        <div className="FlowChart">
          {this.createImageComponent()}
        </div>
      </div>
    );
  }
}

Flowchart.propTypes = propTypes;

export default Flowchart;
