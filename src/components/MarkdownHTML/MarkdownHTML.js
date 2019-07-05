import React from "react";
import ReactMarkdown from 'react-markdown'
import "./prism.css"


class MarkdownHTML extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    }
  }

  componentDidMount() {
    console.log("this is empty" + this.props.text);
    if (!this.props.text) {
        fetch(this.props.url)
        .then((response) => {
          response.text().then((markdown) => {
            this.setState({data: markdown});
          })
        })
    } else {
      const text = this.props.text;
      console.log(text);
      this.setState({data: this.props.text});
    }
  }

  render() {
    return <ReactMarkdown source={this.state.data} />;
  }
}

export default MarkdownHTML
