import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Prism from 'prismjs';
import '../../../styles/syntaxhighlighting.css';
import './PrismView.css';

const propTypes = {
  code: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

/**
 * A component which displays some header and body data and has got the option to copy from it.
 */
class PrismView extends Component {
  /**
     * Need to re-run Prism when the component mounts to get syntax highlightning.
     */
  componentDidMount() {
    Prism.highlightAll();
  }

  /**
     * Makes Prism highlight the json after we switch between body and header.
     */
  componentDidUpdate() {
    Prism.highlightAll();
  }

  render() {
    const { className, code } = this.props;
    const name = className || '';
    return (
      <div className={`prismview ${name}`}>
        <pre>
          <code className="language-javascript">
            {/* We have to add a new line here to get correct indentation in the code view. */}
            {`\n${code}`}
          </code>
        </pre>
      </div>
    );
  }
}


PrismView.propTypes = propTypes;

export default PrismView;
