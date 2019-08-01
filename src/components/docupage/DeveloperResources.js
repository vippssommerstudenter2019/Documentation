import React from 'react';
import docupageCSS from "./docupage.module.css";

const UrlElement = (LinkTitle, LinkURL) => (
    <div >
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
    <div className={docupageCSS.devResources}>
        <h1 id={docupageCSS.pageTitle}>
                Documentation - {props.pageTitle}
        </h1>
        <h2 className={docupageCSS.developerResources} id="developer-resources">Developer resources</h2>
    <div className= {docupageCSS.resourceLink}>
        <hr />
        {props.devURLs.map(element => (
            UrlElement(element[0], element[1])
        ))}
        </div>
    </div>
  );

export default DeveloperResources;