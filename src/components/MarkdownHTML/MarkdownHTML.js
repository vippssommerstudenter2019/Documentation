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
      this.setState({data: this.props.text});
    }


  removeTableOfContent() {
    let lines = this.props.text.split('\n');
    let markdownWithoutTableOfContent = '';
    let withinTableOfContent = false;
    for (let line of lines) {
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
    const { text } = this.props;
    if (text) {
      return <ReactMarkdown
          source={this.removeTableOfContent()}
          renderers={{ code: CodeBlock,
                      heading: HeadingRenderer
                    }}
        />;
    }
    return <ReactMarkdown
            source={this.state.data}
            linkTarget="_blank"
              />;
  }
}

export default MarkdownHTML
