import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SideNav, Collapsible, CollapsibleItem } from 'react-materialize';
import 'materialize-css';
// import "./materialize.css";
import './sidebar.css';
import { Link } from 'react-router-dom';
import vippsDev from '../../img/vipps_dev.svg';
import arrowRight from '../../img/arrowRight.svg';

/*
  Takes in argument in the form of list containing collections of headers
  Ex: [{name: "ex1", anchor: "#ex1", children:[
             {name: "ex1a", anchor: "#ex1a"}, {name: "ex1b", anchor: "#ex1b"}]},
            {name: "ex2", anchor: "#ex2", children: [{name: ex2a", anchor: "#ex2a"}]}]
*/

// Contains the menuitems and backlink
const Sidebar = args => (
  <div className="Sidebar">
    <SidebarMenu headers={args.headers} api={args.api} expandAll={args.expandAll} />
  </div>
);

// Header for logo and backlink
const SidebarHeader = () => (
  <Link to="/">
    <img src={vippsDev} alt="logo" />
  </Link>
);

// Structures the sidebar content
const SidebarMenu = args => (
  <SidebarNavSpy
    offset={0}
    percent={25}
    sections={args.headers}
    expandAll={args.expandAll}
  />
);

// Navigation Menu
class SidebarNavSpy extends Component {
  constructor(props) {
    super(props);

    // the offset lowers the line
    const offset = props.offset ? props.offset : 0;
    // the percent lowers the line by a percent of the screen height
    const percent = props.percent ? (props.percent / 100) : 1;

    this.state = {
      line: offset + window.innerHeight * percent,
      active: { section: -1, subsection: -1 },
    };

    this.elementSpy.bind(this);
    this.elementAboveLine.bind(this);
    this.myRef = React.createRef();
  }


  componentDidMount() {
    const { expandAll } = this.props;
    if (expandAll) this.expandAll();
    this.elementSpy();
    this.timerID = window.setInterval(() => this.elementSpy(), 300);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerID);
  }


  // This function spies on all the elements on the
  // Requires a Section to be visible by ID, to find it's subsections
  elementSpy() {
    const { sections } = this.props;
    const { active } = this.state;
    const getElement = el => document.getElementById(el.anchor.replace('#', ''));
    const activeSection = sections.map((section) => {
      const element = getElement(section);
      return element && this.elementAboveLine(element);
    }).lastIndexOf(true);
    if (activeSection === -1) return;
    const activeSubsection = sections[activeSection].children.map((subsection) => {
      const element = getElement(subsection);
      return element && this.elementAboveLine(element);
    }).lastIndexOf(true);

    const acSec = active.section;
    if (acSec !== activeSection) {
      const closing = document.getElementById(`secid-${acSec}`);
      if (closing && closing.classList.contains('active')) {
        closing.firstElementChild.click();
      }
      const opening = document.getElementById(`secid-${activeSection}`);
      if (opening && !opening.classList.contains('active')) {
        opening.firstElementChild.click();
      }
      this.setState({ active: { section: activeSection, subsection: activeSubsection } });
    } else if (active.subsection !== activeSubsection) {
      this.setState({ active: { section: acSec, subsection: activeSubsection } });
    }
  }

  expandAll() {
    const { sections } = this.props;
    sections.map((section, sec) => {
      if (section.children.length === 0) return null;
      const opening = document.getElementById(`secid-${sec}`);
      if (opening && !opening.classList.contains('active')) {
        opening.firstElementChild.click();
      }
      return null;
    });
  }

  createSubsection = (subsection, sec, sub, activeSection, activeSubsection) => {
    const headSelect = (activeSection === sec && activeSubsection === sub) ? 'selectedElement' : '';
    const header = (
      <a href={subsection.anchor}>
        {' '}
        {subsection.name}
        {' '}
      </a>
    );
    return (
      <li className={`listEl ${headSelect}`} key={`sec${sec}sub${sub}`}>
        {header}
      </li>
    );
  }

  createLinks = (link, sec, sub) => (
    <li className="listEl" key={`sec${sec}sub${sub}`}>
      <a
        key={`sec${sec}sub${sub}`}
        href={link.anchor}
        target="_blank"
        rel="noopener noreferrer"
      >
        {` ${link.name} `}
      </a>
    </li>
  );

createSidebarHeaders = (sections, activeSection, activeSubsection) => (
  sections.map((section, sec) => {
    const headSelect = (activeSection === sec && activeSubsection === -1) ? 'selectedElement' : '';
    const header = (
      (section.children.length === 0)
        ? (
          <div className={`listTop ${headSelect}`}>
            <a className="sidebarLink" href={section.anchor}>{section.name}</a>
          </div>
        )
        : (
          <div className={`listTop ${headSelect}`}>
            <a className="sidebarLink" href={section.anchor}>{section.name}</a>
            <img className="arrow" alt="arrow" src={arrowRight} />
          </div>
        )
    );
    const subsections = (
      (section.name === 'Developer resources')
        ? (
          <ul>
            {section.children.map((el, sub) => this.createLinks(el, sec, sub))}
          </ul>
        )
        : (
          <ul>
            {section.children.map(
              (el, sub) => this.createSubsection(el, sec, sub, activeSection, activeSubsection),
            )}
          </ul>
        )
    );
    const key = `secid-${sec}`;
    return (
      <CollapsibleItem id={key} key={key} header={header}>
        {subsections}
      </CollapsibleItem>
    );
  })
)

// returns a value based on the position of a element,
// the higest value should be the selected element
elementAboveLine(element) {
  const { line } = this.state;
  const rect = element.getBoundingClientRect();
  // return rect.top >= 0 - offset && rect.bottom <= window.innerHeight + offset;
  return rect.bottom <= line;
}

// TODO: Please re-write and split up this mammoth render function, avoid nested functions.
render() {
  const { active } = this.state;
  const { sections } = this.props;
  const activeSection = active.section;
  const activeSubsection = active.subsection;
  const sidebarHeaders = this.createSidebarHeaders(sections, activeSection, activeSubsection);
  return (
    <SideNav className="sidebarPadding">
      <div className="SidebarHeader">
        <SidebarHeader />
      </div>
      <div className="scrollable">
        <Collapsible accordion={false}>
          {sidebarHeaders}
        </Collapsible>
      </div>
    </SideNav>
  );
}
}

SidebarNavSpy.propTypes = {
  offset: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  sections: PropTypes.array.isRequired,
  expandAll: PropTypes.bool.isRequired,
};

export default Sidebar;
