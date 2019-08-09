import React from 'react';
import PropTypes from 'prop-types';
import $RefParser from 'json-schema-ref-parser';
import yaml from 'js-yaml';
import { Link } from 'react-router-dom';
import Content from './Content';
import IntroBox from './IntroBox';
import Flowchart from './flowchart/Flowchart';
import OutroBox from './OutroBox';
import '../../model/SwaggerExtracter';
import '../../styles/how-it-works.css';
import Sidebar from '../sidebar/sidebar';
import LottieAnimation from '../../LottieAnimation';

// This component is currently just copied from sidebar.js
// And this should probably be fixed
// Header for logo and backlink
import vippsDev from '../../img/vipps_dev.svg';

const LandingLogo = () => (
  <Link to="/">
    <img src={vippsDev} alt="logo" />
  </Link>
);

/**
 * The input props.
 */
const propTypes = {
  yamlContentURL: PropTypes.string.isRequired,
};

/**
 * Represents a site where a certain Vipps API is given an overview and an implementation example.
 */
class HowItWorks extends React.Component {
  constructor(props) {
    super(props);
    const getWidth = () => ((window.innerWidth > 0) ? window.innerWidth : window.screen.width);
    const setLoaded = () => setTimeout(() => this.setState({ loaded: true }), 1000);
    this.state = {
      pageWidth: getWidth(),
      intro: null,
      outro: null,
      flowchart: null,
      metaData: null,
      loaded: false,
      swaggerData: {},
    };
    fetch(props.yamlContentURL)
      .then(response => response.text())
      .then((text) => {
        const fullContent = yaml.safeLoad(text);
        this.setState({
          intro: fullContent.Intro,
          outro: fullContent.Outro,
          flowchart: fullContent.FlowChart,
          metaData: fullContent.Sections,
        });
        this.loadSwagger(fullContent.SwaggerURL);
        setLoaded();
      });

    const resize = () => this.setState({ pageWidth: getWidth() });
    resize.bind(this);
    window.onresize = resize;
  }

  loadSwagger(swaggerURL) {
    // Fetch the json data from the swagger file at the given url.
    fetch(swaggerURL)
      .then(response => response.json())
      .then((response) => {
        // We use a reference parser to inject all the references in the json file with content,
        // in that way we can extract bodies with examples for example.
        $RefParser.dereference(response, (error, data) => {
          if (error) {
            /* eslint no-alert: 0 */
            window.alert('Could not load data.');
          } else {
            this.setState({ swaggerData: data });
          }
        });
      });
  }

  sidebar() {
    const { pageWidth, metaData } = this.state;
    if (pageWidth <= 812) return <div className="topLogo"><LandingLogo /></div>;
    const sideBarData = [];

    Object.keys(metaData).forEach((sectionTitle) => {
      const steps = metaData[sectionTitle];

      const children = Object.keys(steps).map(stepKey => ({
        name: steps[stepKey].title,
        anchor: `#${stepKey}`,
      }));

      const sectionElement = {
        name: sectionTitle,
        anchor: `#${sectionTitle}`,
        children,
      };

      sideBarData.push(sectionElement);
    });

    return <Sidebar headers={sideBarData} expandAll api="#ecom" />;
  }

  render() {
    const {
      loaded, intro, flowchart, swaggerData, metaData, pageWidth, outro,
    } = this.state;
    if (!loaded) {
      return (
        <div className="LoadingSpinner">
          <LottieAnimation path="/loading_spinner.json" />
        </div>
      );
    }
    return (
      <div className="App">
        <IntroBox content={intro} />
        {flowchart ? <Flowchart content={flowchart} pagewidth={pageWidth} /> : null}
        <Content swaggerData={swaggerData} sections={metaData} />
        <OutroBox content={outro} />
        {this.sidebar()}
      </div>
    );
  }
}

HowItWorks.propTypes = propTypes;

export default HowItWorks;
