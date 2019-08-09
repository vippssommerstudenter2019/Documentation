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

function generateEndpointData(endpointName, endpointType, swaggerData) {
  let header; let body; let responses;

  if (Object.prototype.hasOwnProperty.call(swaggerData, 'openapi')) {
    [header, body, responses] = openAPIExtracter.getExampleData(
      endpointName,
      swaggerData,
    );
  } else if (Object.prototype.hasOwnProperty.call(swaggerData, 'swagger')) {
    [header, body, responses] = swaggerExtracter.getExampleData(
      endpointName,
      endpointType,
      swaggerData,
    );
  }

  return {
    header,
    body,
    responses,
  };
}

class Content extends React.Component {

  contentFromSection(title, section) {
    const steps = [];
    const { swaggerData } = this.props;

    // Generate content for every step in this section
    Object.keys(section).forEach((key) => {
      const step = section[key];

      // We use the swagger and openapi extracter to get example headers,
      // bodies and responses for every endpoint in this step
      const endpointData = {};

      // Since a step can include information about multiple endpoints, we
      // have to get the endpoint data (header, body and responses) for each
      // endpoint in the step
      if (step.endpoints) {
        step.endpoints.forEach((endpoint) => {
          endpointData[endpoint.name] = generateEndpointData(
            endpoint.name,
            endpoint.mode,
            swaggerData,
          );
        });
      }
      steps.push(
        <Step
          titleid={key}
          key={key + step.title}
          metaData={step}
          endpointData={endpointData}
        />,
      );
    });

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
    const { sections } = this.props;

    Object.keys(sections).forEach((title) => {
      components.push(this.contentFromSection(title, sections[title]));
    });

    return (
      <div className="content-wrapper">
        {components}
      </div>
    );
  }
}

Content.propTypes = propTypes;

export default Content;
