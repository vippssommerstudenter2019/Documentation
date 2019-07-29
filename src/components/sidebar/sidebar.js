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
{/*
  Takes in argument in the form of list containing collections
  Example: [{name: "ex1", anchor: "#ex1", children: [{name: "ex1a", anchor: "#ex1a"}, {name: "ex1b", anchor: "#ex1b"}]},
            {name: "ex2", anchor: "#ex2", children: [{name: ex2a", anchor: "#ex2a"}]}]
*/}
const SidebarNav = props => {
  const sidebarHeaders = props.headers.map((head, index) => (
    <CollapsibleItem
      key={"Item: "+index}
      header={<a href={Object.values(head)[1]}>{Object.values(head)[0]}</a>}
    >
      <ul>
        {Object.values(head)[2].map((child, indice) => (
          <li className="listEl" key={"li index: "+ index + ", indice: " + indice }>
            {/* Links from Developer resources opens in a new tab */}
            {Object.values(head)[0] === "Developer resources" 
              ? <a  key={"a index: "+ index + ", indice: " + indice }
                    href={Object.values(child)[1]}
                    target ="_blank"
                    rel="noopener noreferrer"> {Object.values(child)[0]} </a>
              : <a  key={"a index: "+ index + ", indice: " + indice }
                    href={Object.values(child)[1]}> {Object.values(child)[0]} </a>}
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
