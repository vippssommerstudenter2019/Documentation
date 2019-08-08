import React from 'react';
import PropTypes from 'prop-types';
import Step from './step/Step';
import SwaggerExtracter from '../../model/SwaggerExtracter';
import OpenAPIExtracter from '../../model/OpenAPIExtracter';

const propTypes = {
  sections: PropTypes.object.isRequired,
  swaggerData: PropTypes.object.isRequired,

};

const openAPIExtracter = new OpenAPIExtracter();
const swaggerExtracter = new SwaggerExtracter();

class Content extends React.Component {
  generateEndpointData(endpointName, endpointType, swaggerData) {
    let header; let body; let
      responses;
    if (swaggerData.hasOwnProperty('openapi')) {
      [header, body, responses] = openAPIExtracter.getExampleData(endpointName, swaggerData);
    } else if (swaggerData.hasOwnProperty('swagger')) {
      [header, body, responses] = swaggerExtracter.getExampleData(endpointName, endpointType, swaggerData);
    }
    return {
      header,
      body,
      responses,
    };
  }

  contentFromSection(title, section) {
    const steps = [];
    // Generate content for every step in this section
    for (const [id, step] of Object.entries(section)) {
      // We use the swagger and openapi extracter to get example headers,
      // bodies and responses for every endpoint in this step
      const endpointData = {};

      // Since a step can include information about multiple endpoints, we have to get the endpoint data
      // (header, body and responses) for each endpoint in the step
      if (step.endpoints) {
        for (const endpoint of step.endpoints) {
          endpointData[endpoint.name] = this.generateEndpointData(endpoint.name, endpoint.mode, this.props.swaggerData);
        }
      }
      steps.push(
        <Step
          titleid={id}
          key={id + step.title}
          metaData={step}
          endpointData={endpointData}
        />,
      );
    }
    // Wrap every step in a section
    return (
      <div key={`wrapper-${title}`}>
        <div id={title} className="intro-title">{title}</div>
        {steps}
      </div>
    );
  }


  render() {
    const components = [];

    for (const [title, section] of Object.entries(this.props.sections)) {
      components.push(this.contentFromSection(title, section));
    }

    return (
      <div className="content-wrapper">
        {components}
      </div>
    );
  }
}

Content.propTypes = propTypes;

export default Content;
