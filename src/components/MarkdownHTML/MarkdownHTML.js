import React from "react";
import ReactMarkdown from 'react-markdown'
import Prism from "prismjs";
import "./prism.css"


class MarkdownHTML extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    }
  }

  componentDidMount() {
    fetch(this.props.url)
      .then((response) => {
        response.text().then((markdown) => {
          console.log(typeof(markdown.split(/(?=# )/g)));
          this.setState({data: markdown});
        })
      })
  }

  render() {
    return <ReactMarkdown source={this.state.data} />;
  }
}

export default MarkdownHTML
