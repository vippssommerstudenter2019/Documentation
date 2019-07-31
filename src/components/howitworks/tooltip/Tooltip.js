import React from "react";
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from "rc-tooltip";
import PropTypes from "prop-types";
import "./Tooltip.css"

const customToolTipPropTypes = {
    keyword: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkTitle: PropTypes.string.isRequired,
}

class CustomTooltip extends React.Component {

    render() {
        return (
            <Tooltip
                key={this.props.keyword}
                overlay={
                    <div className="default-font-size keyword-overlay tool-tip">
                        <div className="large-font-size">
                            <b>{this.props.title}</b>
                        </div>
                        <br />
                        <div className="default-font-size">
                            {this.props.description}
                        </div>
                        <br />
                        <br />
                        <a className="rc-custom-link" href={this.props.link} target="_blank" rel="noopener noreferrer">{this.props.linkTitle}</a>
                    </div>
                }
                placement="bottom">
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
    keywordsData: PropTypes.object
}

/**
 * Injects tooltips (popups on hover) for a given input for some keywords.
 */
class TooltipText extends React.Component {

    render() {
        // Find the words in the input which has got square brackets, e.g. [access token]
        if (!this.props.input) return [];
        const matches = this.props.input.match(/\[.*?\]/g);
        let result = [];

        if (matches && this.props.keywordsData) {
            let currentIndex = 0;

            // Loop through all the matches and inject a tooltip
            for (const match of matches) {
                const indexOfMatch = this.props.input.indexOf(match);
                result.push(this.props.input.substring(currentIndex, indexOfMatch));

                const matchWithoutBrackets = match.replace(/[[\]]/g, '');
                result.push(
                    <CustomTooltip key={this.props.keywordsData[matchWithoutBrackets].title}
                                   keyword={matchWithoutBrackets}
                                   title={this.props.keywordsData[matchWithoutBrackets].title}
                                   description={this.props.keywordsData[matchWithoutBrackets].description}
                                   link={this.props.keywordsData[matchWithoutBrackets].link}
                                   linkTitle={this.props.keywordsData[matchWithoutBrackets].linkTitle} />
                );
                currentIndex = indexOfMatch + match.length;
            }

            result.push(this.props.input.substring(currentIndex, this.props.input.length));
        }
        else {
            result.push(this.props.input.replace(/[[\]]/g, ''));
        }

        return result;
    }
}


CustomTooltip.propTypes = customToolTipPropTypes;
TooltipText.propTypes = tooltipTextPropTypes;

export {
    CustomTooltip,
    TooltipText
};
