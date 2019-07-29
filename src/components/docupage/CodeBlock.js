import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vippsColours from './codeblockStyles';


class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  render() {
    const { language, value } = this.props;
    return (
      <div className="codeblock">
      <SyntaxHighlighter language={language} showLineNumbers={true} style={vippsColours}>
        {value}
      </SyntaxHighlighter>
      </div>
    );
  }
}

export default CodeBlock;
