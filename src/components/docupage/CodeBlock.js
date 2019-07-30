import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vippsColours from "./codeblockStyles";
import "./codeblock.css"


class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  handleCopyClick = () => {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = this.props.value;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
  }

  render() {
    const { language, value } = this.props;
    return (
      <div className="codeblock">
        <div className="codeblockHeader">
          <div className="codeblockLanguage">
            {language}
          </div>
          <button className="copy-button" onClick={this.handleCopyClick}>Copy</button>
        </div>
        <SyntaxHighlighter language={language} showLineNumbers={true} style={vippsColours}>
          {/* We have to add a new line here to get correct indentation in the code view. */}
          {value}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default CodeBlock;
