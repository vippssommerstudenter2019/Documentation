import React from 'react';
import { Link } from "react-router-dom";
import './startpage.css'

export const DocCard = (props) => (
    <div className="DocCard">
        <div className="DocCardImg">
            <img  src={props.img.src} alt={props.img.alt} />
        </div>
        <div className="DocCardText">
            <h2 className="DocCardTitle">{props.title}</h2>
            <p>{props.text}</p>
        </div>
        <div className="DocCardLinks">
            <Link className="GetStartedLink"  to={props.startLink}>
                <div className="GetStartedText">
                    Get Started
                </div>
            </Link>
            <Link className="DocumentationLink"  to={props.docLink}>Documentation</Link>
        </div>
    </div>
)

export const ApiDoc = (props) => (
    <div className="ApiDoc">
        <p>or go straight to...</p>
        <Link to={props.apiLink} className="FullAPILink" >Full API Documentation</Link>
    </div>
)
