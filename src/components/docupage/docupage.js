import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import HeadingRenderer from './HeadingRenderer';
import InlineCodeRenderer from './InlineCodeRenderer';
import CodeBlockRenderer from './CodeBlockRenderer';
import TableRenderer from './TableRenderer';
import Sidebar from '../sidebar/sidebar';
import DeveloperResources from './DeveloperResources';
import {
  SOURCE_URLS,
  DEV_URLS,
  PAGE_TITLES,
  DEV_SIDEBAR_HEADER,
} from './Constants';
import '../../styles/vipps-style.css';
import docupageCSS from './docupage.module.css';
import LottieAnimation from '../../LottieAnimation';

const goToAnchor = () => {
  const { hash } = window.document.location;
  if (hash !== '') {
    setTimeout(() => {
      if (window.location.hash) {
        window.scrollTo(0, 0);
        window.location.href = hash;
      }
    }, 1);
  }
};

// Returns a HTML anchor from a given header
const makeAnchor = string => (
  `#${
    string
      .replace(new RegExp("[|&;:$%@<>()+,#']", 'g'), '')
      .trim()
      .replace(new RegExp(' ', 'g'), '-')
      .toLowerCase()}`
);


class DocuPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      headers: [],
      loaded: false,
    };
    this.srcURL = SOURCE_URLS[props.doc];
    this.devURLs = DEV_URLS[props.doc];
    this.pageTitle = PAGE_TITLES[props.doc];
    this.devResourceHeader = DEV_SIDEBAR_HEADER;
  }

  componentDidMount() {
    // Get source data, then process it, then set the content of the page
    fetch(this.srcURL)
      .then(response => response.text()
        .then(fullText => this.setContent(fullText)));
  }

  setContent(fullText) {
    const content = this.filterMarkdown(fullText);
    const headers = this.getHeaders(content);
    // Timeout is used to avoid choppy load-in
    setTimeout(() => {
      // After content is set, the page is loaded
      this.setState({
        content,
        headers,
        loaded: true,
      }, () => goToAnchor());
      // After the state is updated and the page re-rendered,
      // we can navigate to the proper place in the text
    }, 1000);
  }


  // Return the subheaders for developer resources
  getChildren() {
    const children = [];
    this.devURLs.forEach((header) => {
      children.push({ name: header[0], anchor: header[1] });
    });
    return children;
  }

  // Filters the content fetched from Github into headers
  // Assumes that the there is no ##-heading before the first #-heading
  getHeaders(data) {
    const lines = data.split('\n');
    const navbarHeaders = [];
    let navbarHeader = { name: '', anchor: '', children: [] };
    lines.forEach((line) => {
      if (line.startsWith('###')) {
        // Do nothing here, so that we don't catch level 3 headings.
      } else if (line.startsWith('##')) {
        navbarHeader.children.push({
          name: line.replace('##', '').trim(),
          anchor: makeAnchor(line),
        });
      } else if (line.startsWith('#')) {
        navbarHeaders.push(navbarHeader);
        navbarHeader = { name: '', anchor: '', children: [] };
        navbarHeader.name = line.replace('#', '').trim();
        navbarHeader.anchor = makeAnchor(line);
      }
    });
    navbarHeaders.push(navbarHeader);
    /* First element is empty */
    const sidebarHeaders = navbarHeaders.slice(1);
    sidebarHeaders.unshift(this.devResourceHeader(this.getChildren()));
    return sidebarHeaders;
  }


  // Creates the spinner
  loadingScreen = () => (
    <div className="LoadingSpinner">
      <LottieAnimation path="/loading_spinner.json" />
    </div>
  )

  // Creates the docupage screen
  docuScreen = () => {
    const { headers, content } = this.state;
    const { doc } = this.props;
    return (
      <div className={docupageCSS.Container}>
        <Sidebar headers={headers} api={doc} />
        <div className={docupageCSS.Content}>
          <DeveloperResources devURLs={this.devURLs} pageTitle={this.pageTitle} />
          <ReactMarkdown
            source={content}
            renderers={{
              code: CodeBlockRenderer,
              inlineCode: InlineCodeRenderer,
              heading: HeadingRenderer,
              table: TableRenderer,
            }}
          />
        </div>
      </div>
    );
  }

  // Filters out table of content and first heading + paragraph
  filterMarkdown(text) {
    let filteredMarkdown = '';
    let filterOut = false;
    text.split('\n').forEach((line) => {
      if (
        (line.startsWith('# ') && line.toLowerCase().includes(this.pageTitle.toLowerCase()))
            || line.toLowerCase().includes('table of content')
      ) {
        filterOut = true;
      } else if (filterOut === true && line.startsWith('#')) {
        filteredMarkdown += `${line.toString()}\n`;
        filterOut = false;
      } else if (filterOut === false) {
        filteredMarkdown += `${line.toString()}\n`;
      }
    });
    return filteredMarkdown;
  }

  render = () => {
    const { loaded } = this.state;
    return (loaded ? this.docuScreen() : this.loadingScreen());
  }
}

DocuPage.propTypes = {
  doc: PropTypes.string.isRequired,
};


export default DocuPage;
