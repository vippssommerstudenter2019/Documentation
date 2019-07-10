import React from "react";

const flatten = (text, child) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}

const HeadingRenderer = (props) => {
  function renderString (string) {
    return (
      string
        .replace(new RegExp("[|&;:$%@<>()+,#']", "g"), "")
        .trim()
        .replace(new RegExp(" ", "g"), "-")
        .toLowerCase()
      );
  };
  var children = React.Children.toArray(props.children)
  var text = children.reduce(flatten, '')
  var slug = renderString(text);
  return React.createElement('h' + props.level, {id: slug}, props.children)
}

export default HeadingRenderer;