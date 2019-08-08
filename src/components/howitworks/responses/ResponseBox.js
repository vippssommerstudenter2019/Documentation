import React from 'react';
import PropTypes from 'prop-types';
import { objectIsEmpty } from '../../../Util';
import './ResponseBox.css';
import PrismView from '../prismview/PrismView';

const propTypes = {
  statusCode: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  json: PropTypes.object.isRequired,
  spaceForJson: PropTypes.number.isRequired,
};

function expandCollapsible(event) {
  const current = event.currentTarget;
  current.classList.toggle('response-active');
  const content = current.nextElementSibling;

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = `${content.scrollHeight}px`;
  }
}

class ResponseBox extends React.Component {
  constructor(props) {
    super(props);
    this.expandCollapsible = expandCollapsible.bind(this);
  }

  render() {
    const {
      statusCode,
      json,
      spaceForJson,
      description,
    } = this.props;

    const error = !statusCode.startsWith('2');
    const buttonClassName = `response-button-collapsible${error ? ' error' : ''}`;
    const displayerClassName = `response-displayer-collapsible${error ? ' error' : ''}`;

    // There is content in the response, we'll add a collapsible to display the response.
    if (!objectIsEmpty(json)) {
      return (
        <div key={statusCode} className="response-wrapper codeview">
          <button type="button" className={buttonClassName} onClick={this.expandCollapsible}>
            <b>{statusCode}</b>
            {' '}
            {description}
          </button>
          <div className="response-content">
            <PrismView code={JSON.stringify(json, null, spaceForJson)} />
          </div>
        </div>
      );
    }

    return (
      <div key={this.props.statusCode} className="response-wrapper">
        <div className={displayerClassName}>
          <b>{this.props.statusCode}</b>
          {' '}
          {this.props.description}
        </div>
      </div>
    );
  }
}


ResponseBox.propTypes = propTypes;

export default ResponseBox;
