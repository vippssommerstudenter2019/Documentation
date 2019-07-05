import React from "react";
import ReactDOM from "react-dom";
import { Sidebar } from "./sidebar.js";
import MarkdownHTML from "./components/MarkdownHTML/MarkdownHTML.js";
import Prism from "prismjs";
import "./vippsstyle.css";
import "./style.css";
import "./prism.css"

// The entire page is contained here
const DocuPage = () => (
  <div className="container bold">
    <div className="sidebar">
      <Sidebar />
    </div>
    <div className="content">
      <MarkdownHTML
        key={0}
        url={
          "https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/vipps-ecom-api.md"
        }
      />
    </div>
  </div>
);

ReactDOM.render(
  <DocuPage />,

  document.getElementById("root")
);
