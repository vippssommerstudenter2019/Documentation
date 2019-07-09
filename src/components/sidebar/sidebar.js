import React from "react";
import {
  SideNav,
  Collapsible,
  CollapsibleItem
} from "react-materialize";
import M from "materialize-css";
import "./materialize.css";
import "./sidebar.css";
import { Link } from "react-router-dom";
import vipps_docs from "../../img/vipps_docs.svg"

// Contains the menuitems and backlink
export const Sidebar = props => (
  <section className="Sidebar">
    <SidebarHeader />
    <SidebarMenu headers={props.headers} api={props.api}/>
  </section>
);

// Header for logo and backlink
const SidebarHeader = () => (

  <Link to="/" className="SidebarHeader ">
    <img
      className="Logo logoMarg"
      src={vipps_docs}
      alt="logo"
    />
  </Link>
);

// Structures the sidebar content
const SidebarMenu = props => (
  <div className="SidebarMenu">
    <SidebarNav headers={props.headers} api={props.api}/>
  </div>
);

// Buttons to different swaggers
const SwaggerLink = (props) => (
  <button className="ApiLink sidebarMarg">
    <a href={props.document === "ecom" ?
  "https://vippsas.github.io/vipps-ecom-api/" : "https://vippsas.github.io/vipps-login-api/"}>Swagger</a>
  </button>
);

const SwaggerIPPLink = () => (
  <button className="ApiLink sidebarMarg">Swagger IPP</button>
);

const SwaggerISPLink = () => (
  <button className="ApiLink sidebarMarg">Swagger ISP</button>
);

// Navigation Menu
const SidebarNav = props => {
  //TODO: List elements should be
  const propHeaders = props.headers;
  const sidebarHeaders = propHeaders.map((head, index) => (
    <CollapsibleItem
      key={"Item: "+index}
      header={<a href={Object.values(head)[1]}>{Object.values(head)[0]}</a>}
    >
      <ul>
        {Object.values(head)[2].map((child, indice) => (
          <li className="listEl" key={"li index: "+ index + ", indice: " + indice }>
            <a key={"a index: "+ index + ", indice: " + indice } href={Object.values(child)[1]}>{Object.values(child)[0]}</a>
          </li>
        ))}
      </ul>
    </CollapsibleItem>
  ));

  function retNavBar (normal) {
      return (
        <div>
        <SideNav className="sidebarMarg">
        <div className='static sidebarlogo'>
          <SidebarHeader />
          </div>
          <div className='scrollable'>
            <Collapsible>{sidebarHeaders}</Collapsible>
          </div>
          {normal ?
          <div className='static apilink'>
          <SwaggerLink document={props.api}/>
          </div> :
          <div className='static apilink'>
          <SwaggerIPPLink />
          <SwaggerISPLink />
          </div>}
        </SideNav>
      </div>
      )
  };

  // If documentpage is invoice then show two swagger buttons
  return props.api === "invoice" ? retNavBar(false) : retNavBar(true);
}
