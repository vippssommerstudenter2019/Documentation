import React from "react";
import {SideNav, Collapsible, CollapsibleItem} from "react-materialize";
import M from "materialize-css";
import "./materialize.css";
import "./sidebar.css";
import { Link } from "react-router-dom";
import vipps_dev from "../../img/vipps_dev.svg"

// Contains the menuitems and backlink
const Sidebar = props => (
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
      src={vipps_dev}
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
/*const DeveloperResources = () => (
  <button className="ApiLink sidebarMarg">
    Developer
  </button>
);*/

/*const SwaggerISPLink = () => (
  <button className="ApiLink sidebarMarg">
    <a href="https://vippsas.github.io/vipps-invoice-api/isp.html" id="mySwaggerISP">Swagger ISP</a></button>
);

const SwaggerIPPLink = () => (
  <button className="ApiLink sidebarMarg">
    <a href="https://vippsas.github.io/vipps-invoice-api/ipp.html" id="mySwaggerIPP">Swagger IPP</a></button>
);*/

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
            <a  key={"a index: "+ index + ", indice: " + indice }
                href={Object.values(child)[1]}> {Object.values(child)[0]} </a>
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
          <div className='fadeout-top'>
          </div>
          <div className='fadeout-bottom'>
          </div>
        </SideNav>
      </div>
      )
  };

  // If documentpage is invoice then show two swagger buttons
  return props.api === "invoice" ? retNavBar(false) : retNavBar(true);
}

export default Sidebar
