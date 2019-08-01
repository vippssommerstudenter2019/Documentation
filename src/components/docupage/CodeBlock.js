import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vippsColours from "./codeblockStyles";
import codeblockCSS from "./codeblock.module.css"
import copyemoji from "../../img/blunk.svg";


class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  handleCopyClick = (e) => {
    let targetButton = e.target;
    var emoji = document.querySelector("button + img");
    emoji.style.display = "block";
    
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
    targetButton.changeText='Copied';

    console.log("hei");
    emoji.style.opacity = "1";

    //vipps emoij fading away
    setTimeout(
      function changeText() {
        emoji.style.transition = "1s ease-in";
        emoji.style.opacity = "0";
      }.bind(this),
      0
    );

    setTimeout(
      function changeText() {
        // Vipps black
        targetButton.changeText='Copy';
      }.bind(this),
      1000
    );
    emoji.style.transition = "none";
  }

  render() {
    const { language, value } = this.props;
    return (
      <div className={codeblockCSS.codeblock}>
        <div className={codeblockCSS.codeblockHeader}>
          <div className={codeblockCSS.codeblockLanguage}>
            {language}
          </div>
          <button className={codeblockCSS.copyButton} onClick={e=> this.handleCopyClick(e)}>
            Copy
          </button>
          <img className={codeblockCSS.copied} src={copyemoji} align="right"/>
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
