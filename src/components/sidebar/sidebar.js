import React from "react";
import {SideNav, Collapsible, CollapsibleItem} from "react-materialize";
import "materialize-css";
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

// Navigation Menu
const SidebarNav = props => {
  const sidebarHeaders = props.headers.map((head, index) => (
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

  function retNavBar () {
      return (
        <div>
        <SideNav className="sidebarMarg">
        <div className='static sidebarlogo'>
          <SidebarHeader />
          </div>
            <div className='scrollable'>
            <Collapsible accordion={false}>{sidebarHeaders}</Collapsible>
            </div>
          <div className='fadeout-top'/>
          <div className='fadeout-bottom'/>
        </SideNav>
      </div>
      )
  };

  return retNavBar()
}

export default Sidebar
