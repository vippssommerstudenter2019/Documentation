import React, {Component}from "react";
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

function createSections(headers) {
	let sections = [];
	Array.from(headers, (head, i) => {
		const name = Object.values(head)[1].replace("#","");
		sections.push(name);
		Array.from(Object.values(head)[2], (head, i) => {
			const name = Object.values(head)[1].replace("#","");
			sections.push(name);
			return name;
		});
		return name;
	});
	console.log("Create:\n", headers, "\nTo\n", sections);
	return sections;
}

// """ScrollSpy"""
// This class will take in a list of id's => from the create sections function
// And figure out which element whit that id that is currently on the screen
class HeaderSpy extends Component {
	constructor(props) {
		super(props);
		
		// the offset lowers the line
		const offset = this.props.offset? this.props.offset : 0;
		// the percent lowers the line by a percent of the screen height
		const percent = this.props.percent? (this.props.percent / 100) : 1;
		
		this.state = {
			activeSection: "",
			line: offset + window.innerHeight * percent
		};
		
		this.elementAboveLine.bind(this);
		this.spy.bind(this);
	}
	

	// returns a value based on the position of a element, 
	// the higest value should be the selected element 
	elementAboveLine(element) {
		const line = this.state.line;
		const rect = element.getBoundingClientRect();
		//return rect.top >= 0 - offset && rect.bottom <= window.innerHeight + offset;
		return rect.bottom <= line;
	}
	
	spy(headers) {
		const sections = this.props.sections
		const above = sections.map((section, index) => {
			const element = document.getElementById(section); 
			return element && this.elementAboveLine(element);
		});
		var index = -1;
		Array.from(above, (bool, i) => {if (bool) index = i});
		if (index === -1) return;
		this.setState({activeSection: sections[index]});
	}

	componentDidMount() {
		this.spy();
		this.timerID = window.setInterval(() => this.spy(), 100);
	}
	
	componentWillUnmount() {
		window.clearInterval(this.timerID);
	}
 
	render() {
		
		return (
			<div>
			{this.state.activeSection}
			</div>
		);
	}
}

class SidebarNavClass extends Component {
	constructor(props) {
		super(props);
	}
	
	
	
	
}


// Navigation Menu
const SidebarNav = props => {
  const headers = props.headers.slice();  
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
	
  //function retNavBar () {
      return (
        <div>
			<SideNav className="sidebarMarg">
			<div className='static sidebarlogo'>
			<SidebarHeader />
				</div>
					<div className='scrollable'>
					<Collapsible accordion={false}>{sidebarHeaders}</Collapsible>
					<HeaderSpy offset={0} percent={50} sections={createSections(headers)}/>
				</div>
			<div className='fadeout-top'/>
			<div className='fadeout-bottom'/>
			</SideNav>
		</div>
      );
  //};

  //return retNavBar()
}

export default Sidebar
