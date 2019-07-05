import React from "react";
import {
  SideNav,
  SideNavItem,
  Collapsible,
  CollapsibleItem
} from "react-materialize";
import "./materialize.css";
import M from "materialize-css";

// Contains the menuitems and backlink
export const Sidebar = () => (
  <section className="Sidebar">
    <SidebarHeader />
    <SidebarMenu />
  </section>
);

// Header for logo and backlink
const SidebarHeader = () => (
  <div className="SidebarHeader">
    <img
      className="Logo logoMarg"
      src="https://www.vipps.no/static/vipps_theme/1.0.31/media/extra-images/vipps-logo.svg"
      alt="logo"
    />
  </div>
);

// Structures the sidebar content
const SidebarMenu = () => (
  <div className="SidebarMenu">
    <SidebarNav />
    <ApiLink />
  </div>
);

// Navigation Menu
const SidebarNav = () => (
  //TODO: List elements should be
  <div>
    <SideNav class="sidebarMarg">
      <Collapsible>
        <CollapsibleItem header="Introduction">
          <li>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
          </li>
        </CollapsibleItem>
        <CollapsibleItem header="Payment types">
          <li>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
          </li>
        </CollapsibleItem>
        <CollapsibleItem header="Webstore payments">
          <li>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
          </li>
        </CollapsibleItem>
        <CollapsibleItem header="Webstore payments">
          <li>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
          </li>
        </CollapsibleItem>
        <CollapsibleItem header="Webstore payments">
          <li>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
          </li>
        </CollapsibleItem>
        <CollapsibleItem header="Webstore payments">
          <li>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
            <ul class="listEl">test</ul>
          </li>
        </CollapsibleItem>
      </Collapsible>
    </SideNav>
  </div>
);

// Links to full api doc
const ApiLink = () => (
  <button className="ApiLink sidebarMarg">Full API Documentation</button>
);
