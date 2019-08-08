import React from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import codeblockCSS from './codeblock.module.css';
import LottieAnimation from './LottieAnimation';
import '../../styles/syntaxhighlighting.css';

class CodeBlockRenderer extends React.Component {
 state = {
   showAnimation: false,
 }


 handleCopyClick = () => {
   const { value } = this.props;
   // Create new element
   const el = document.createElement('textarea');
   // Set this.props.value (string to be copied)
   el.value = value;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(el);

   // Change button text to Copied and change back after 1 sec
   this.setState({ showAnimation: true }, () => {
     setTimeout(() => {
       this.setState({ showAnimation: false });
     }, 1330);
   });
 }


  render = () => {
    const { language, value } = this.props;
    const { showAnimation } = this.state;
    const animation = <LottieAnimation path="/loading_spinner.json" />;
    return (
      <div className={codeblockCSS.codeblock}>
        <div className={codeblockCSS.codeblockHeader}>
          <div className={codeblockCSS.codeblockLanguage}>
            {language}
          </div>
          <button type="button" className={codeblockCSS.copyButton} onClick={this.handleCopyClick}>
            {(showAnimation) ? animation : 'Copy'}
          </button>
        </div>
        <div className={codeblockCSS.codeblockBody}>
          <div className={codeblockCSS.codeblockNumbering}>
            {value.split('\n').map((line, number) => (<li>{number + 1}</li>))}
          </div>
          {/* SyntaxHighlighter will inject inline styling if not explicitly denied */}
          <SyntaxHighlighter language={language} useInlineStyles={false}>{value}</SyntaxHighlighter>
        </div>
      </div>
    );
  }
}

CodeBlockRenderer.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CodeBlockRenderer;
