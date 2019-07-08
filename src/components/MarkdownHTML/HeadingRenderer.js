import React from "react";

const flatten = (text, child) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}

const HeadingRenderer = (props) => {
  var children = React.Children.toArray(props.children)
  var text = children.reduce(flatten, '')
  var slug = text.toLowerCase().replace(/\W/g, '-')
  return React.createElement('h' + props.level, {name: slug}, props.children)
}

export default HeadingRenderer;