import React from "react";
import ReactMarkdown from 'react-markdown'
import './MarkdownHTML.css'
import HeadingRenderer from "./HeadingRenderer.js";
import CodeBlock from "./CodeBlock.js";
import { formatDescriptionToIncludeHoverLinks } from "../howitworks/Step";

class MarkdownHTML extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      lines: [],
    }
    this.removeTableOfContent = this.filterMarkdown.bind(this);
  }

  componentDidMount() {
      this.setState({data: this.props.text});
    }

    // Filters out table of content and first heading + paragraph
  filterMarkdown() {
    let lines = this.props.text.split('\n');
    let filtered_markdown = '';
    let filter_out = false;
    for (let line of lines) {
      if ((line.startsWith('# ') && line.toLowerCase().includes(this.props.pageTitle.toLowerCase())) || line.toLowerCase().includes("table of content")  ) {
        filter_out = true;
      }
      else if (filter_out === true && line.startsWith('#')) {
        filtered_markdown += line.toString() + '\n';
        filter_out = false;
      }
      else if (filter_out === false) {
        filtered_markdown += line.toString() + '\n';
      }
    }
    return filtered_markdown;
  }

  devResUrls = () => (
    <div className="devResources">
      <h2>
        Developer resources
      </h2>
      <hr/>
      {this.props.devResUrls.map(
        (element) => (
          <div>
            <a href={element[1]}>
              <div>
                {element[0]}
                <p>{String.fromCharCode(10132)}</p>
              </div>
            </a>
            <hr/>
          </div>
        )
      )}
    </div>
  )



  render() {
    const { text } = this.props;
    if (text) {
      return (
        <div>
          <h1 id="developer-resources">
            Documentation - {this.props.pageTitle}
          </h1>
          {this.devResUrls()}
          <ReactMarkdown
                source={this.filterMarkdown()}
                renderers={{ code: CodeBlock,
                            heading: HeadingRenderer
                          }}
            />;
        </div>)
    }
    return <ReactMarkdown
            source={this.state.data}
            linkTarget="_blank"
              />;
  }
}

export default MarkdownHTML
