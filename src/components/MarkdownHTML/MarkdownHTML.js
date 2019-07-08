import React from "react";
import ReactMarkdown from 'react-markdown'
import './MarkdownHTML.css'
import HeadingRenderer from "./HeadingRenderer.js";
import CodeBlock from "./CodeBlock.js";

class MarkdownHTML extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      lines: [],
    }
    this.removeTableOfContent = this.removeTableOfContent.bind(this);
  }

  componentDidMount() {
    console.log("this is empty" + this.props.text);
    if (this.props.url) {
        fetch(this.props.url)
        .then((response) => {
          response.text().then((markdown) => {
            this.setState({data: markdown});
          })
        })
    } else {
      const text = this.props.text;
      console.log("not loading url")
      console.log(text);
      this.setState({data: this.props.text});
    }
  }

  removeTableOfContent() {
    console.log(this.props.text);
    let lines = this.props.text.split('\n');
    let markdownWithoutTableOfContent = '';
    let withinTableOfContent = false;
    let cnt = 0;
    for (let line of lines) {
      console.log("linje: " + line);
      if (line.toLowerCase().includes("table of content")) {
        withinTableOfContent = true;
      }
      else if (withinTableOfContent === true && line.startsWith('#')) {
        markdownWithoutTableOfContent += line.toString() + '\n';
        withinTableOfContent = false;
      }
      else if (withinTableOfContent === false) {
        markdownWithoutTableOfContent += line.toString() + '\n';
      }
    }
    return markdownWithoutTableOfContent;
  }




  render() {
    const { text, url } = this.props;
    if (text) {
      return <ReactMarkdown
          source={this.removeTableOfContent()}
          renderers={{ code: CodeBlock,
                      heading: HeadingRenderer}}            
        />;
    }
    return <ReactMarkdown
            source={this.state.data}
            linkTarget="_blank"
              />;
  }
}

export default MarkdownHTML
