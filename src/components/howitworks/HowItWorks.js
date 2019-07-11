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
				<StickyContainer>
					<div className="content-wrapper">
						<div className="intro-area"> 
						<IntroBox 
							content={this.props.intro} 
						/>
						</div>
						
						<div className="step-area" >
						<Content 
							
							url="https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/docs/swagger.yaml" 
							sections={this.props.sections}
						/>
						</div>
						
						<div className="outro-area" >
						<OutroBox 
							
							content={this.props.outro} 
						/>
						</div>
					</div>
				</StickyContainer>
			</div>
		)
	}
}

export default HowItWorks;
