import React from 'react';
import Content from "./Content"
import { StickyContainer } from 'react-sticky';
import IntroBox from "./IntroBox";
import OutroBox from "./OutroBox";

import '../../styles/how-it-works.css';

class HowItWorks extends React.Component {
	render() {
		return (
			<div className="App">
				<IntroBox content={this.props.intro} />
				<Content 
					url="https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/docs/swagger.yaml" 
					sections={this.props.sections}
				/>
				<OutroBox content={this.props.outro} />
			</div>
		)
	}
}

export default HowItWorks;
