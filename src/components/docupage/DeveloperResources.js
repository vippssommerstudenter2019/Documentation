import React from 'react';

const UrlElement = (LinkTitle, LinkURL) => (
    <div>
        <a href={LinkURL}>
            <div>
                {LinkTitle}
                <p>{String.fromCharCode(10132)}</p>
            </div>
        </a>
        <hr />
    </div>
);

const DeveloperResources = (props) => (
    <div className="devResources">
        <h1 id="developer-resources">
                Documentation - {props.pageTitle}
        </h1>
        <h2>Developer resources</h2>
        <hr />
        {props.devURLs.map(element => (
            UrlElement(element[0], element[1])
        ))}
    </div>
  );

export default DeveloperResources;