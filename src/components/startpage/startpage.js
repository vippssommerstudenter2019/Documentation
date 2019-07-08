import React from 'react';
import './startpage.css'

export const DocCard = (props) => (
    <div className="DocCard">
        <img src={props.img.src} alt={props.img.alt} width="80%"/>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
        <div className="DocCardButtons">
            <button className="GetStartedButton"  onClick={() => props.startClick(props.startLink)}>Get Started</button>
            <button className="DocumentationLink"  onClick={() => props.docuClick(props.docuLink)}>Documentation</button>
        </div>
    </div>
)

export const ApiDoc = (props) => (
    <div className="ApiDoc">
        <p>or go straight to...</p>
        <button className="FullAPIButton" onClick={ () => props.apiClick}>Full API documentation</button>
    </div>
)
