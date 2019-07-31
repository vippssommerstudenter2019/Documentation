import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import codeblockCSS from "./codeblock.module.css"
import "./syntaxhighlighting.css"

const CodeBlock = (props) =>  {
  const { language, value } = props;

  const handleCopyClick = (e) => {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value =  value;
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

  return (
      <div className={codeblockCSS.codeblock}>
        <div className={codeblockCSS.codeblockHeader}>
          <div className={codeblockCSS.codeblockLanguage}>
            {language}
          </div>
          <button className={codeblockCSS.copyButton} onClick={e => handleCopyClick(e)}>Copy</button>
        </div>
        <div className={codeblockCSS.codeblockBody}>
          <div className={codeblockCSS.codeblockNumbering}>
            {value.split('\n').map((line, number) => (<li>{number + 1}</li>))}
          </div>
          <SyntaxHighlighter language={language} useInlineStyles={false} >{value}</SyntaxHighlighter>
        </div>
      </div>
    );
}

export default CodeBlock;
