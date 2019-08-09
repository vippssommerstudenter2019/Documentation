import React from 'react';
import docupageCSS from './docupage.module.css';

const UrlElement = (LinkTitle, LinkURL) => (
  <div key={`${LinkTitle}-${LinkURL}`}>
    <a href={LinkURL} target="_blank" rel="noopener noreferrer">
      <div>
        {LinkTitle}
        <p>➔</p>
      </div>
    </a>
    <hr />
  </div>
);

const DeveloperResources = args => (
  <div className={docupageCSS.devResources}>
    <h1 id={docupageCSS.pageTitle}>
      Documentation -
      {' '}
      {args.pageTitle}
    </h1>
    <h2 className={docupageCSS.developerResources} id="developer-resources">Developer resources</h2>
    <div className={docupageCSS.resourceLink}>
      <hr />
      {args.devURLs.map(element => (
        UrlElement(element[0], element[1])
      ))}
    </div>
  </div>
);

export default DeveloperResources;
