import React from "react";
import ReactMarkdown from "react-markdown";
import HeadingRenderer from "./HeadingRenderer";
import InlineCodeRenderer from "./InlineCodeRenderer";
import CodeBlockRenderer from "./CodeBlockRenderer";
import TableRenderer from "./TableRenderer"
import Sidebar from "../sidebar/sidebar";
import DeveloperResources from './DeveloperResources'
import { SOURCE_URLS,
          DEV_URLS,
          PAGE_TITLES,
          DEV_SIDEBAR_HEADER } from './Constants.js'
import "./../../styles/vipps-style.css";
import docupageCSS from "./docupage.module.css";
import LottieAnimation from "./LottieAnimation.js";

class DocuPage extends React.Component {
  state = {
    content: "",
    headers: [],
    loaded: false
  }

  srcURL = SOURCE_URLS[this.props.doc];
  devURLs = DEV_URLS[this.props.doc];
  pageTitle = PAGE_TITLES[this.props.doc];
  devResourceHeader = DEV_SIDEBAR_HEADER;



  componentDidMount() {
    // Get source data, then process it, then set the content of the page
    fetch(this.srcURL).then(response =>
      response.text().then(fullText => 
        this.setContent(fullText))
    );
  }

  setContent(fullText) {
    const content = this.filterMarkdown(fullText);
    const headers = this.getHeaders(content);
    // Timeout is used to avoid choppy load-in
    setTimeout(() => {
      // After content is set, the page is loaded
      this.setState({
        content: content,
        headers: headers,
        loaded: true
      }, () => this.goToAnchor()) // After the state is updated and the page re-rendered, we can navigate to the proper place in the text
    }, 1000);
  }

  // Scroll to link location on the page, if there is one
  goToAnchor() { 
    const hash = window.document.location.hash;
    if (hash !=="") {
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
    let children = [];
    this.devURLs.forEach(header => {
      children.push({ name: header[0], anchor: header[1] });
    });
    return children;
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
    })
    navbarHeaders.push(navbarHeader);
    ;
    {/* First element is empty*/}
    let sidebarHeaders = navbarHeaders.slice(1);
    sidebarHeaders.unshift(this.devResourceHeader(this.getChildren()));
    return sidebarHeaders;
  }

  // Filters out table of content and first heading + paragraph
  filterMarkdown(text) {
    let filtered_markdown = "";
    let filter_out = false;
    for (let line of text.split("\n")) {
      if (
        (line.startsWith("# ") && line.toLowerCase().includes(this.pageTitle.toLowerCase())) ||
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
    return filtered_markdown;
  }

  // Creates the spinner
  loadingScreen = () => (
    <div className={docupageCSS.LoadingSpinner} >
      <LottieAnimation path="/loading_spinner.json"/>
    </div>
  )

  // Creates the docupage screen
  docuScreen = () => (
    <div className={docupageCSS.Container}>
        <Sidebar headers={this.state.headers} api={this.props.doc} />
        <div className={docupageCSS.Content}>
          <DeveloperResources devURLs={this.devURLs} pageTitle={this.pageTitle}/>
          <ReactMarkdown
            source={this.state.content}
            renderers={{code: CodeBlockRenderer,
                        inlineCode: InlineCodeRenderer,
                        heading: HeadingRenderer,
                        table: TableRenderer}}
          />
        </div>
    </div>
  )

  render = () => (
    this.state.loaded ? this.docuScreen() : this.loadingScreen()
    );
}

export default DocuPage;