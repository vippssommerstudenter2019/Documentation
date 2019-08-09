import React from 'react';
/*
Adds id to h1 and h2 elements making it possible to href them
This is because we use ReactMarkdown
*/
const flatten = (text, child) => (typeof child === 'string'
  ? text + child
  : React.Children.toArray(child.props.children).reduce(flatten, text));

// Removes special characters and replaces spaces with '-' to make anchor linking work
const createAnchor = string => (string
  .replace(new RegExp("[|&;:$%@<>()+,#']", 'g'), '')
  .trim()
  .replace(new RegExp(' ', 'g'), '-')
  .toLowerCase()
);

const HeadingRenderer = (args) => {
  const children = React.Children.toArray(args.children);
  const text = children.reduce(flatten, '');
  const slug = createAnchor(text);
  const HeadingTag = `h${args.level}`;
  // We exclusively link to h1 and h2 tags in the sidebar
  if (args.level === 1 || args.level === 2) {
    return (
      <HeadingTag id={slug}>
        {args.children}
      </HeadingTag>
    );
  }
  return (
    // This prefix is needed, as heading titles are not unique in the current documentation
    <HeadingTag id={`h${args.level}${slug}`}>
      {args.children}
    </HeadingTag>
  );
};

export default HeadingRenderer;
