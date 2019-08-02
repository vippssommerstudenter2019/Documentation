import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import codeblockCSS from "./codeblock.module.css"
import "./syntaxhighlighting.css"
import lottie from "lottie-web";



class LottieAnimation extends React.Component {
   ref = null;

   componentDidMount() {
     lottie.loadAnimation({
       container: this.ref,
       renderer: "svg",
       loop: true,
       autoplay: true,
       path: this.props.path
     });
   }

   render() {
     return <div ref={ref => this.ref = ref} />;
   }
 }




class CodeBlock extends React.Component  {
 state = {
   showanimation: false
 }
 

 handleCopyClick = (e) => {
    let targetButton = e.target;
    // Create new element
    var el = document.createElement('textarea');
    // Set this.props.value (string to be copied)
    el.value =  this.props.value;
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
    this.setState({showanimation: true}, () => {
      setTimeout(() => {
        this.setState({showanimation: false})
      }, 1330);
    });
  }


  render = () => {
    const animation = <LottieAnimation path="/loading_spinner.json"></LottieAnimation>
    return (
    <div className={codeblockCSS.codeblock}>
    <div className={codeblockCSS.codeblockHeader}>
      <div className={codeblockCSS.codeblockLanguage}>
        {this.props.language}
      </div>
      <button className={codeblockCSS.copyButton} onClick={e => this.handleCopyClick(e)}>
        {(this.state.showanimation) ? animation : "Copy"}
      </button>
    </div>
    <div className={codeblockCSS.codeblockBody}>
      <div className={codeblockCSS.codeblockNumbering}>
        {this.props.value.split('\n').map((line, number) => (<li>{number + 1}</li>))}
      </div>
      {/* SyntaxHighlighter will inject inline styling if not explicitly denied */}
      <SyntaxHighlighter language={this.props.language} useInlineStyles={false} style={""}>{this.props.value}</SyntaxHighlighter>
    </div>
  </div>
    );
  }
}

export default CodeBlock;
