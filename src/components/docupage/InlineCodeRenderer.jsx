import React from 'react';
import docupageCSS from './docupage.module.css';

const InlineCodeRenderer = args => (
  <code className={docupageCSS.InlineCode}>
    {args.value}
  </code>
);

export default InlineCodeRenderer;
