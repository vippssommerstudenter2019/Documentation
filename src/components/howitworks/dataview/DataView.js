import PropTypes from "prop-types";
import React, { Component } from 'react';
import "./DataView.css"
import { objectIsEmpty, getHashCodeFromString } from "../../../Util";
import PrismView from "../prismview/PrismView";
import ResponseTable from "../responses/ResponseTable";
import lottie from "lottie-web";

const propTypes = {
    title: PropTypes.string.isRequired,
    header: PropTypes.object.isRequired,
    body: PropTypes.object.isRequired,
	responses: PropTypes.object.isRequired,
    spaceForJson: PropTypes.number.isRequired
};

class LottieAnimation extends React.Component {
	ref = null;
 
	componentDidMount() {
	  lottie.loadAnimation({
		container: this.ref,
		renderer: "svg",
		loop: true,
		autoplay: true,
		path: this.props.path
	  });
	}
 
	render() {
	  return <div ref={ref => this.ref = ref} />;
	}
  }

/**
 * A component which displays some header and body data and has got the option to copy from it.
 */
class DataView extends Component {
    constructor(props) {
        super(props);
		
		// how much whitespace the json's will use for indentation 
		const jsonSpace = this.props.spaceForJson;
		const title = this.props.title;
		
		
		// Defining how the different elements should look
		function makeElement(str, el) { return{title: str, element: el}; };
		const code = (json) => JSON.stringify(json, null, jsonSpace);
		
		//Checking which json's that actually have content 
		let content = [];
		if (!objectIsEmpty(this.props.header)) content.push(makeElement(
			"Header", 
			<PrismView key={title+"-header"} className="prismview-1" code={code(this.props.header)}/>
		));
		if (!objectIsEmpty(this.props.body)) content.push(makeElement(
			"Body", 
			<PrismView key={title+"-body"} className="prismview-1" code={code(this.props.body)}/>
		));
		if (!objectIsEmpty(this.props.responses)) content.push(makeElement(
			"Responses", 
			<ResponseTable key={title+"-responses"} className="prismview-2" responses={this.props.responses} spaceForJson={jsonSpace}/>
		));
		
		// Setting the content, and selecting the first.
        this.state = {
			content: content,
			selected: content[0].title,
			copyID: getHashCodeFromString(title),
			showAnimation: false
        };

		// Binding callbacks to this instance
        this.handleCopyClick = this.handleCopyClick.bind(this);
        this.switchMode = this.switchMode.bind(this);
    }

	/**
	 * Handles the click when the user wants to copy the code.
	 */
    handleCopyClick() {
		// Change button text to Copied and change back after 1 sec
		this.setState({showanimation: true}, () => {
		  setTimeout(() => {
			this.setState({showanimation: false})
		  }, 1330);
		});

        // We create a fake text area that we can inject the code into
        let textArea = document.createElement("textarea");
		
		// We check which state that is selected
		const json = (()=>{
			const selected = this.state.selected;
			if (selected === "Header") return this.props.header;
			if (selected === "Body") return this.props.body;
			if (selected === "Responses") {
				for (const json of Object.values(this.props.responses)) {
					if (!objectIsEmpty(json)) return json;
				}
			}
			return null;
		})();
		if (json === null) return;
		
		// Injection of the code into the text field
        const value = JSON.stringify(json, null, this.props.spaceForJson);
        const id = this.state.copyID;
        textArea.value = value;

        // Append the textarea under this code view.
        document.getElementById(id).appendChild(textArea);
        textArea.focus();
        textArea.select();

        // Try to copy from that text area
        try {
            document.execCommand("copy");

            // TODO: Implement overlay for successful copy when design is ready
            var successful = document.execCommand('copy');
            if (successful) {
				this.setState({showAnimation: true}, () => {
					setTimeout(() => {
					  this.setState({showAnimation: false})
					}, 1330);
				  });
			}
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.getElementById(id).removeChild(textArea);
    }


    /**
     * Switches to showing body or header depending on what is currently viewed.
     */
    switchMode(event) {

        const button = event.target;
        const title = button.innerHTML;
        if (title === this.state.selected) return;
		this.setState({selected: title});
	}

    render() {
		const selected = this.state.selected;
        let elements = this.state.content.map((comp, i) => {
			const title = comp.title;
			if (title === selected) 
			return comp.element;
			return null;
		});

        // We add the components for switching between header, body and responses. If they exists.
		const mainTitle = this.props.title;
        let buttonComponents = this.state.content.map((comp, i) => {
			const title = comp.title;
			if (title === selected) 
			return (
			<button key={mainTitle + title} className="header-body-button header-body-button-activated" onClick={this.switchMode}>
				{title}
			</button>
			);
			return (
			<button key={mainTitle + title} className="header-body-button" onClick={this.switchMode}>
				{title}
			</button>
			);
		});
		const animation = <LottieAnimation path="/loading_spinner.json"></LottieAnimation>;
        return (
            // Render a container with code with an utility bar and style it according to Vipps style.
            // We give the first div an id of an unique hash corresponding to the code so when
            // we want to copy something out of it, we know which component to grab the codde from
            <div className="dataview" id={this.state.copyID}>
                <div className="dataview-title">{this.props.title}</div>
                <div className="dataview-utility-bar">
                    <button className="copy-button" onClick={this.handleCopyClick}>
						{this.state.showAnimation ? animation : "copy"}
					</button>
                    {buttonComponents}
                </div>
				{elements}
			</div>
		);
    }
}


DataView.propTypes = propTypes;

export default DataView;