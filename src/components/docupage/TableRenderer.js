import React from "react";
import docupageCSS from "./docupage.module.css";

const TableRenderer = (props) => (
    <div className={docupageCSS.Tables}>
      <table>
        {props.children}
      </table>
    </div>
  )

export default TableRenderer;