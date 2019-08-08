/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';
import './Tooltip.css';
import { Link } from 'react-router-dom';

const customToolTipPropTypes = {
  keyword: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

function CustomTooltip(props) {
  const {
    title, description, link, linkTitle, keyword,
  } = props;

  const linkComponent = (
    (link && linkTitle)
      ? (
        <Link className="rc-custom-link" to={link} target="_blank" rel="noopener noreferrer">
          {linkTitle}
        </Link>
      ) : null
  );
  return (
    <Tooltip
      key={keyword}
      overlay={(
        <div className="keyword-overlay tool-tip">
          <div className="tool-tip-head">
            <b>{title}</b>
          </div>
          <br />
          <div className="tool-tip-text">
            {description}
          </div>
          <br />
          <br />
          {linkComponent}
        </div>
      )}
      placement="bottom"
    >
      <button type="button" className="underlined-purple">{keyword}</button>
    </Tooltip>
  );
}

/**
 * @param {*} input The text to inject tooltips into.
 * @param {*} keywordData The keyword data that should be hoverable and display a tooltip.
 */
const tooltipTextPropTypes = {
  input: PropTypes.string.isRequired,
  keywordsData: PropTypes.object.isRequired,
};

/**
 * Injects tooltips (popups on hover) for a given input for some keywords.
 */
class TooltipText extends Component {
  render() {
    const { input, keywordsData } = this.props;

    // Find the words in the input which has got square brackets, e.g. [access token]
    if (!input) return [];
    const matches = input.match(/\[.*?\]/g);
    const result = [];

    if (matches && keywordsData) {
      let currentIndex = 0;

      // Loop through all the matches and inject a tooltip

      matches.forEach((match) => {
        const indexOfMatch = input.indexOf(match);
        result.push(input.substring(currentIndex, indexOfMatch));

        const matchWithoutBrackets = match.replace(/[[\]]/g, '');
        result.push(
          <CustomTooltip
            key={keywordsData[matchWithoutBrackets].title}
            keyword={matchWithoutBrackets}
            title={keywordsData[matchWithoutBrackets].title}
            description={keywordsData[matchWithoutBrackets].description}
            link={keywordsData[matchWithoutBrackets].link}
            linkTitle={keywordsData[matchWithoutBrackets].linkTitle}
          />,
        );
        currentIndex = indexOfMatch + match.length;
      });

      result.push(input.substring(currentIndex, input.length));
    } else {
      result.push(input.replace(/[[\]]/g, ''));
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
