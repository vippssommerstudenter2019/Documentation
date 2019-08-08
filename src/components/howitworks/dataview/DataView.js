import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './DataView.css';
import { objectIsEmpty } from '../../../Util';
import LottieAnimation from '../../../LottieAnimation';

const propTypes = {
  mainTitle: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
};

/**
 * A Component that takes in a list of 'selectable' and 'copyable' content:
 * The expected components:
* {
*  title: string,  // The displayed title for the object
*  copyText: string,  // What the copy call to this element should return
*  component: reactComponent, // The component to render
* }
 *
 */
class DataView extends Component {
  constructor(props) {
    super(props);

    // Setting the content, and selecting the first.
    this.state = {
      selected: props.content[0].title,
      copyID: props.mainTitle,
      copyStatus: 'Copy',
    };

    // Binding callbacks to this instance
    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.switchMode = this.switchMode.bind(this);
  }

  /**
    * Handles the click when the user wants to copy the code.
    */
  handleCopyClick() {
    // Function to monentarily display something inside of the copy button.
    const setCopy = el => this.setState({ copyStatus: el }, () => {
      setTimeout(() => { this.setState({ copyStatus: 'Copy' }); }, 1330);
    });

    const { selected, copyID } = this.state;
    const { content } = this.props;
    // We check which state that is selected
    // Assumes uniqueness in the titles
    const value = content.find(cont => (cont.title === selected)).copyText;
    // an animation with sad-smiley?
    if (!value) { setCopy('Empty'); return; }

    // We create a fake text area that we can inject the code into
    const textArea = document.createElement('textarea');
    textArea.value = value;
    // Append the textarea under this code view.
    document.getElementById(copyID).appendChild(textArea);


    // Try to copy from that text area
    try {
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      // Change button text to an animation and change back after 1 sec
      setCopy(<LottieAnimation path="/loading_spinner.json" />);
    } catch (err) {
      // an animation with sad-smiley?
      setCopy('Error');
    }

    document.getElementById(copyID).removeChild(textArea);
  }


  /**
     * Switches to showing body or header depending on what is currently viewed.
     */
  switchMode(event) {
    const { selected } = this.state;
    const button = event.target;
    const title = button.innerHTML;
    if (title === selected) return;
    this.setState({ selected: title });
  }

  render() {
    const { content, mainTitle } = this.props;
    const { selected, copyStatus, copyID } = this.state;

    if (objectIsEmpty(content)) {
      console.warn('Empty content: ', mainTitle);
      return null;
    }

    // Assumes uniqueness in the titles
    const { component } = content.find(cont => (cont.title === selected));

    // We add the components for switching between header, body and responses. If they exists.
    const buttonComponents = content.map((comp) => {
      const { title } = comp;
      if (title === selected) {
        return (
          <button
            key={mainTitle + title}
            type="button"
            className="header-body-button header-body-button-activated"
            onClick={this.switchMode}
          >
            {title}
          </button>
        );
      }
      return (
        <button
          key={mainTitle + title}
          type="button"
          className="header-body-button"
          onClick={this.switchMode}
        >
          {title}
        </button>
      );
    });
    return (
    // Render a container with code with an utility bar and style it according to Vipps style.
    // We give the first div an id of an unique hash corresponding to the code so when
    // we want to copy something out of it, we know which component to grab the code from
      <div className="dataview">
        <div className="dataview-title" id={copyID}>{mainTitle}</div>
        <div className="dataview-utility-bar">

          {buttonComponents}

          <button
            className="copy-button"
            type="button"
            onClick={this.handleCopyClick}
          >
            {copyStatus}
          </button>
        </div>
        {component}
      </div>
    );
  }
}


DataView.propTypes = propTypes;

export default DataView;
