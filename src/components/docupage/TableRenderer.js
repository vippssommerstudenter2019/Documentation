import React from 'react';
import docupageCSS from './docupage.module.css';

const TableRenderer = args => (
  <div className={docupageCSS.Tables}>
    <table>
      {args.children}
    </table>
  </div>
);

export default TableRenderer;
