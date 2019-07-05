import React from 'react';

// Contains the menuitems and backlink
export const Sidebar = () => (
    <div>
        <SidebarHeader/>
        <SidebarMenu/>
    </div>
)


// Header for logo and backlink
const SidebarHeader = () => (
        <img className="sidebarheader" src="https://www.vipps.no/static/vipps_theme/1.0.31/media/extra-images/vipps-logo.svg" alt="logo"/>
)

// Structures the sidebar content
const SidebarMenu = () => (
    <div className="SidebarMenu">
        <SidebarNav />
        <div className="sidebarfooter">
        <ApiLink />
        </div>
    </div>
)

// Navigation Menu
const SidebarNav = () => (
    //TODO: List elements should be
    <div className="sidebar">
        <ul className="NavListTop">
            <li className="NavElemTop">Lorem</li>
            <ul className="NavListBot">
                <li className="NavElemBot">
                    Ipsum
                </li>
                <li className="NavElemBot">
                    Dolor
                </li>
                <li className="NavElemBot">
                    Sit Amet
                </li>
            </ul>
            <li className="NavElemTop">Ipsum</li>
            <li className="NavElemTop">Dolor</li>
            <li className="NavElemTop">Sit</li>
            <li className="NavElemTop">Amet</li>
            <li className="NavElemTop">Ferdig</li>
        </ul>
    </div>
)

// Links to full api doc
const ApiLink = () => (
    <button className="ApiLink">Full API Documentation</button>
)
