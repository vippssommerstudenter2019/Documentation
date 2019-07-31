import React from "react";
import docupageCSS from "./docupage.module.css";

const InlineCodeRenderer = (props) => (
    <code className={docupageCSS.InlineCode}>
        {props.value}
    </code>
)

export default InlineCodeRenderer;