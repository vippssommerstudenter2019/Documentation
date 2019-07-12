import React from "react";
import ReactMarkdown from "react-markdown";
import HeadingRenderer from "./HeadingRenderer.js";
import CodeBlock from "./CodeBlock.js";
import Sidebar from "../sidebar/sidebar.js";
import "./../../styles/index.css";
import "./../../styles/vipps-style.css";
import "./docupage.css";
import { formatDescriptionToIncludeHoverLinks } from "../howitworks/Step";

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
    this.devResUrls = {
      ecom: [
        [
          "Postman",
          "https://github.com/vippsas/vipps-ecom-api/tree/master/tools"
        ],
        [
          "FAQ",
          "https://github.com/vippsas/vipps-ecom-api/blob/master/vipps-ecom-api-faq.md"
        ],
        ["Swagger", "https://vippsas.github.io/vipps-ecom-api/"]
      ],
      login: [
        [
          "Postman",
          "https://github.com/vippsas/vipps-login-api/tree/master/tools"
        ],
        ["FAQ", "#faq"],
        ["Swagger", "https://vippsas.github.io/vipps-login-api/"]
      ],
      invoice: [
        [
          "Postman",
          "https://github.com/vippsas/vipps-invoice-api/tree/master/tools"
        ],
        ["FAQ", "#faq"],
        ["Swagger ISP", "https://vippsas.github.io/vipps-invoice-api/isp.html"],
        ["Swagger IPP", "https://vippsas.github.io/vipps-invoice-api/ipp.html"]
      ]
    };
    this.pageTitles = {
      ecom: "Vipps eCommerce API",
      login: "Vipps Login API",
      invoice: "Vipps Invoice API"
    };

    this.state = {
      content: "",
      headers: []
    };
  }

  componentDidMount() {
    this.getContent().then(response =>
      response.text().then(fullText => 
        this.displayContent(fullText).then(
          this.goToAnchor
        ))
    );
  }

  // Fetches raw content from Github and puts it in the DocuPage state
  getContent() {
    return fetch(this.urls[this.props.doc]);
  }

  async displayContent(fullText) {
    const content = this.filterMarkdown(fullText, this.props.doc);
    const headers = this.getHeaders(content);
    this.setState({
      content: content,
      headers: headers
    })
  }

  goToAnchor() { 
    const hash = window.document.location.hash;
    if (hash !="") {
        setTimeout(function() {
            if (window.location.hash) {
                window.scrollTo(0, 0);
                window.location.href = hash;
            }
        }, 1);
    }
}

  // Returns a HTML anchor from a given header
  makeAnchor(string) {
    return (
      "#" +
      string
        .replace(new RegExp("[|&;:$%@<>()+,#']", "g"), "")
        .trim()
        .replace(new RegExp(" ", "g"), "-")
        .toLowerCase()
    );
  }

  // Return one or two swagger subheaders
  getChildren() {
    let childs = [];
    this.devResUrls[this.props.doc].forEach(header => {
      childs.push({ name: header[0], anchor: header[1] });
    });
    return childs;
  }

  // Because of design issues, we add our own header and subheaders to the sidebar
  addSpecialHeader() {
    let devRes = {
      name: "Developer resources",
      anchor: "#developer-resources",
      children: this.getChildren()
    };
    return devRes;
  }

  // Filters the content fetched from Github into headers
  getHeaders(data) {
    const lines = data.split("\n");
    let navbarHeaders = [];
    let navbarHeader = { name: "", anchor: "", children: [] };
    lines.forEach(line => {
      if (line.startsWith("###")) {
        return;
      } else if (line.startsWith("##")) {
        navbarHeader.children.push({
          name: line.replace("##", "").trim(),
          anchor: this.makeAnchor(line)
        });
      } else if (line.startsWith("#")) {
        navbarHeaders.push(navbarHeader);
        navbarHeader = { name: "", anchor: "", children: [] };
        navbarHeader.name = line.replace("#", "").trim();
        navbarHeader.anchor = this.makeAnchor(line);
      } else {
        return;
      }
    });
    let sidebarHeaders =
      navbarHeaders[2].name === "Table of contents"
        ? navbarHeaders.slice(3)
        : navbarHeaders.slice(2);
    sidebarHeaders.unshift(this.addSpecialHeader());
    return sidebarHeaders;
  }

  // Filters out table of content and first heading + paragraph
  filterMarkdown(text, doc) {
    let lines = text.split("\n");
    let filtered_markdown = "";
    let filter_out = false;
    for (let line of lines) {
      if (
        (line.startsWith("# ") &&
          line.toLowerCase().includes(this.pageTitles[doc].toLowerCase())) ||
        line.toLowerCase().includes("table of content")
      ) {
        filter_out = true;
      } else if (filter_out === true && line.startsWith("#")) {
        filtered_markdown += line.toString() + "\n";
        filter_out = false;
      } else if (filter_out === false) {
        filtered_markdown += line.toString() + "\n";
      }
    }
    // this.setState(
    //   {
    //     editedText: filtered_markdown
    //   },
    //   this.getHeaders
    // );
    return filtered_markdown;
  }

  resourceSection = doc => (
    <div className="devResources">
      <h2>Developer resources</h2>
      <hr />
      {this.devResUrls[doc].map(element => (
        <div>
          <a href={element[1]}>
            <div>
              {element[0]}
              <p>{String.fromCharCode(10132)}</p>
            </div>
          </a>
          <hr />
        </div>
      ))}
    </div>
  );

  render() {
    const { doc } = this.props;
    return (
      <div className="Container">
        <div className="Sidebar">
          <Sidebar headers={this.state.headers} api={doc} />
        </div>
        <div>
          <h1 id="developer-resources">
            Documentation - {this.pageTitles[doc]}
          </h1>
          {this.resourceSection(doc)}
          <div className="Content">
            <ReactMarkdown
              source={this.state.content}
              renderers={{ code: CodeBlock, heading: HeadingRenderer }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DocuPage;
