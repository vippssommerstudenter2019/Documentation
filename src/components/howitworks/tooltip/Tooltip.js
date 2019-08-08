import React, { Component } from 'react';
/* import 'rc-tooltip/assets/bootstrap.css';
 */import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';
import './Tooltip.css';
import { Link } from 'react-router-dom';

const customToolTipPropTypes = {
  keyword: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

class CustomTooltip extends Component {
  render() {
    const link = (
      (this.props.link && this.props.linkTitle) ?
  <Link className="rc-custom-link" to={this.props.link} target="_blank" rel="noopener noreferrer">
  {this.props.linkTitle}
		</Link> : null
    );
    return (
          <Tooltip
              key={this.props.keyword}
              overlay={(
<div className="keyword-overlay tool-tip">
                        <div className="tool-tip-head">
                            <b>{this.props.title}</b>
                        </div>
                        <br />
                        <div className="tool-tip-text">
                            {this.props.description}
                        </div>
                        <br />
                        <br />
                        {link}
                    </div>
)}
              placement="bottom"
            >
              <button className="underlined-purple">{this.props.keyword}</button>
            </Tooltip>
    );
  }
}

/**
 * @param {*} input The text to inject tooltips into.
 * @param {*} keywordData The keyword data that should be hoverable and display a tooltip.
 */
const tooltipTextPropTypes = {
  input: PropTypes.string.isRequired,
  keywordsData: PropTypes.object,
};

/**
 * Injects tooltips (popups on hover) for a given input for some keywords.
 */
class TooltipText extends Component {
  render() {
    // Find the words in the input which has got square brackets, e.g. [access token]
    if (!this.props.input) return [];
    const matches = this.props.input.match(/\[.*?\]/g);
    const result = [];

    if (matches && this.props.keywordsData) {
      let currentIndex = 0;

      // Loop through all the matches and inject a tooltip
      for (const match of matches) {
        const indexOfMatch = this.props.input.indexOf(match);
        result.push(this.props.input.substring(currentIndex, indexOfMatch));

        const matchWithoutBrackets = match.replace(/[[\]]/g, '');
        result.push(
                  <CustomTooltip
key={this.props.keywordsData[matchWithoutBrackets].title}
                      keyword={matchWithoutBrackets}
                      title={this.props.keywordsData[matchWithoutBrackets].title}
                      description={this.props.keywordsData[matchWithoutBrackets].description}
                      link={this.props.keywordsData[matchWithoutBrackets].link}
                      linkTitle={this.props.keywordsData[matchWithoutBrackets].linkTitle}
                    />,
        );
        currentIndex = indexOfMatch + match.length;
      }

      result.push(this.props.input.substring(currentIndex, this.props.input.length));
    } else {
      result.push(this.props.input.replace(/[[\]]/g, ''));
    }

    return result;
  }
}


CustomTooltip.propTypes = customToolTipPropTypes;
TooltipText.propTypes = tooltipTextPropTypes;

export {
  CustomTooltip,
  TooltipText,
};
