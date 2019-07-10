import React from "react";
import ReactMarkdown from "react-markdown";
import HeadingRenderer from "./HeadingRenderer.js";
import CodeBlock from "./CodeBlock.js";
import Sidebar from '../sidebar/sidebar.js'

class DocuPage extends React.Component {
  constructor(props) {
    super(props);
    this.urls = {
      ecom:
        "https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/vipps-ecom-api.md",
      login:
        "https://raw.githubusercontent.com/vippsas/vipps-login-api/master/vipps-login-api.md",
      invoice:
        "https://raw.githubusercontent.com/vippsas/vipps-invoice-api/master/vipps-invoice-api.md"
    };
    this.state = {
      fullText: "",
      headers: []
    };
  }

  componentDidMount() {
    this.getMarkdown().then(response =>
      response.text().then(text => this.getHeaders(text))
    );
  }

  // Fetches raw content from Github and puts it in the DocuPage state
  getMarkdown() {
    return fetch(this.urls[this.props.doc]);
  }

  // Removes Table of Content, as we're using a sidebar with navigation
  removeTableOfContent(data) {
    let lines = data.split("\n");
    let markdownWithoutTableOfContent = "";
    let withinTableOfContent = false;
    for (let line of lines) {
      if (line.toLowerCase().includes("table of content")) {
        withinTableOfContent = true;
      } else if (withinTableOfContent === true && line.startsWith("#")) {
        markdownWithoutTableOfContent += line.toString() + "\n";
        withinTableOfContent = false;
      } else if (withinTableOfContent === false) {
        markdownWithoutTableOfContent += line.toString() + "\n";
      }
    }
    console.log("Original Markdown " + data);
    console.log('\n');
    console.log('\n');
    console.log('\n');
    console.log('\n');
    console.log("Edited Markdown " + markdownWithoutTableOfContent);
    return markdownWithoutTableOfContent;
  }

  // Returns a HTML anchor from a given header
  makeAnchor(string) {
    return (
      "#" +
      string
        .replace(new RegExp("[|&;:$%@<>()+,#]", "g"), " ")
        .trim()
        .replace(new RegExp(" ", "g"), "-")
        .toLowerCase()
      );
    }

    // Filters the content fetched from Github into headers
    getHeaders(data) {
        const editedText = this.removeTableOfContent(data);
        const lines = editedText.split("\n");
        let navbarHeaders = []
        let navbarHeader = {name: "", anchor: "", children: []}
        lines.forEach((line) => {
            if (line.startsWith("###")) {
                return;
            } else if (line.startsWith("##")) {
                navbarHeader.children.push({name: line.replace("##", "").trim(),
                    anchor: this.makeAnchor(line)});
            } else if (line.startsWith("#")) {
                navbarHeaders.push(navbarHeader);
                navbarHeader = {name: "", anchor: "", children: []}
                navbarHeader.name = line.replace("#", "").trim();
                navbarHeader.anchor = this.makeAnchor(line);
            } else {
                return;
            }
        });
        this.setState({
            fullText: editedText,
            // First element i navbarHeaders is an empty collection
            // Second element is just the name of the documentation, not needed in navigation bar
            // In case second header is not 'table of contents' do not exclude the second header
            headers: navbarHeaders.slice(2)
        });
    }

  render() {
    return (
      // Container for grid-template
      <div className="Container">

      // Sidebar-div
        <div className="Sidebar">
          <Sidebar headers={this.state.headers} api={this.props.doc} />
        </div>

      // Div for the documentation
        <div className="Content">
        <ReactMarkdown
          source={this.state.fullText}
          renderers={{ code: CodeBlock,
                      heading: HeadingRenderer}}
                  />;
        </div>

      </div>
    );
  }
}

export default DocuPage;
