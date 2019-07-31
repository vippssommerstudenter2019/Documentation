import React, {Component}from "react";
import {SideNav, Collapsible, CollapsibleItem} from "react-materialize";
import "materialize-css";
import "./materialize.css";
import "./sidebar.css";
import { Link } from "react-router-dom";
import vipps_dev from "../../img/vipps_dev.svg";
import arrow_down from "../../img/arrowDown.svg";
import arrow_right from "../../img/arrowRight.svg";

/*
  Takes in argument in the form of list containing collections of headers
  Example: [{name: "ex1", anchor: "#ex1", children: [{name: "ex1a", anchor: "#ex1a"}, {name: "ex1b", anchor: "#ex1b"}]},
            {name: "ex2", anchor: "#ex2", children: [{name: ex2a", anchor: "#ex2a"}]}]
*/

// Contains the menuitems and backlink
const Sidebar = props => (
  <section className="Sidebar">
    <SidebarMenu headers={props.headers} api={props.api} />
  </section>
);

// Header for logo and backlink
const SidebarHeader = () => (
  <Link to="/" className="SidebarHeader ">
    <img className="Logo logoMarg" src={vipps_dev} alt="logo" />
  </Link>
);

// Structures the sidebar content
const SidebarMenu = props => (
  <div className="SidebarMenu">
	<SidebarNavSpy offset={0} percent={50} sections={props.headers} api={props.api}/>
  </div>
);

// Navigation Menu
class SidebarNavSpy extends Component {
	constructor(props) {
		super(props);
		
		// the offset lowers the line
		const offset = this.props.offset? this.props.offset : 0;
		// the percent lowers the line by a percent of the screen height
		const percent = this.props.percent? (this.props.percent / 100) : 1;
		
		this.state = {
			line: offset + window.innerHeight * percent,
			active: {section: 0, subsection: -1},
		}
		
		this.elementSpy.bind(this);
		this.elementAboveLine.bind(this);
		this.myRef = React.createRef();
	}
	
	// returns a value based on the position of a element, 
	// the higest value should be the selected element 
	elementAboveLine(element) {
		const line = this.state.line;
		const rect = element.getBoundingClientRect();
		//return rect.top >= 0 - offset && rect.bottom <= window.innerHeight + offset;
		return rect.bottom <= line;
	}
	
	getElement(el) {
		return document.getElementById(el.anchor.replace("#",""));
	}
	
	// This function spies on all the elements on the
	// Requires a Section to be visible by ID, to find it's subsections
	elementSpy() {
		const sections = this.props.sections;
		const activeSection = sections.map((section, i) => {
			const element = this.getElement(section);
			return element && this.elementAboveLine(element);
		}).lastIndexOf(true);
		if (activeSection === -1) return;
		const activeSubsection = sections[activeSection].children.map((subsection, i) => {
			const element = this.getElement(subsection); 
			return element && this.elementAboveLine(element);
		}).lastIndexOf(true);
		this.setState({active: {section: activeSection, subsection: activeSubsection}});
	}
	
	componentDidMount() {
		this.elementSpy();
		this.timerID = window.setInterval(() => this.elementSpy(), 300);
	}
	
	componentWillUnmount() {
		window.clearInterval(this.timerID);
	}
	
	render() {
		const activeSection = this.state.active.section;
		const activeSubsection = this.state.active.subsection;
		function createSubsection(subsection, sec, sub) {
			const header = <a href={subsection.anchor}> {subsection.name} </a>;
			if (activeSection === sec && activeSubsection === sub) {
			return (
				<li className="listEl hit" key={"sec"+sec+"sub"+sub}>
					{header}
				</li>
			);
			}
			return (
				<li className="listEl" key={"sec"+sec+"sub"+sub}>
					{header}
				</li>
			);
		};
		function createLinks(link, sec, sub) {
			return (
				<li className="listEl" key={"sec"+sec+"sub"+sub}>
					<a
						key={"sec"+sec+"sub"+sub}
						href={link.anchor}
						target="_blank"
						rel="noopener noreferrer"
					>
						{" " + link.name + " "}
					</a>
				</li>
			);
		}
		const sidebarHeaders = this.props.sections.map((section, sec) => {
			const header = (
				(section.children.length !== 0)?
				(<div>
					<a className="sidebarLink" href={section.anchor}>{section.name}</a>
					<img className="arrow" alt="arrow" src={arrow_right} />
				</div>)
			:
				(<div>
					<a className="sidebarLink" href={section.anchor}>{section.name}</a>
				</div>)
			);
			const subsections = (
				(section.name === "Developer resources")?
				(<ul>
					{section.children.map((el, sub) => createLinks(el, sec, sub))}
				</ul>)
				:
				(<ul>
					{section.children.map((el, sub) => createSubsection(el, sec, sub))}
				</ul>)
			);
			if (activeSection === sec) {
			if (activeSubsection === -1) {
			return (
				<li className="active" key={"sec"+sec}>
					<div className="collapsible-header hit">
						{header}	
					</div>
					<div className="collapsible-body hit">
						{subsections}
					</div>
				</li>
			);
			}
			return (
				<li className="active" key={"sec"+sec}>
					<div className="collapsible-header">
						{header}
					</div>
					<div className="collapsible-body hit">
						{subsections}
					</div>
				</li>
			);	
			}
			return (
				<CollapsibleItem key={"sec"+sec} header={header}>
					{subsections}
				</CollapsibleItem>
			);
		}); 
		return ( 
			<div>
				<SideNav className="sidebarMarg">
				<div className='fadeout-top'/>
				<div className='static sidebarlogo'>
					<SidebarHeader />
				</div>
				<div className='scrollable'>
					<Collapsible accordion={false}>
						{sidebarHeaders}
					</Collapsible>
				</div>
				<div className='fadeout-bottom'/>
				</SideNav>
			</div>
		);
	}
}

export default Sidebar;
