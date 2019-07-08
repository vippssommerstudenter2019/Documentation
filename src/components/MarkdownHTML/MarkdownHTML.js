import React from "react";
import ReactMarkdown from 'react-markdown'


class MarkdownHTML extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    }
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

  render() {
    console.log(<ReactMarkdown source={this.state.data} />)
    console.log("render", this.state, this.props)
    const { text, url } = this.props;
    if (text) {
      console.log(1111)
      return <ReactMarkdown source={text} />;
    }
    return <ReactMarkdown source={this.state.data} />;
  }
}

export default MarkdownHTML
