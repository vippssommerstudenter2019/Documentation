import React from "react";
import PropTypes from "prop-types";
import {Step2, Step, CodeStep} from "./Step";

const propTypes = {
    sections: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired
};

class Content extends React.Component {

    constructor(props) {
        super(props);
        let languages = ["python", "shell", "http", "javascript", "ruby", "java", "go"];
        this.state = {
            activeLanguage: languages[0],
			languages: languages,
            swaggerResponse: {},
            sections: this.props.sections,
        };
		
		this.languageCallback = this.languageCallback.bind(this)
    }
	
	languageCallback(language) {
		if (language === this.props.activeLanguage) return;
		const languages = this.state.languages.slice();
		for (let i in languages) {
			if (language === languages[i]) {
				this.setState({activeLanguage: language});
				break;
			}
		}
	}

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const data = {
            url: this.props.url
        };

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch("/swaggerdata/get", options)
            .then(response => response.json())
            .then(response => this.setState({ swaggerResponse: response }))
    }

    contentFromSection(section, i) {
        const language  = this.state.activeLanguage;
		const languages = this.state.languages.slice();
		const langcall  = this.languageCallback;
        const swagger   = this.state.swaggerResponse;

        const id = section.id;
        const title = section.title;
        const description = section.description;
        const imagelink = section.img;
        const position = (i % 2 === 0) ?  'left' : 'right';
        const keywords = section.keywords;
		
		if (JSON.stringify(swagger).indexOf(id) >= 0) {
            const code = swagger["data"][id]["code"][language];
            return (
                <Step2 
					key={id} 
					scrollId={id} 
					title={title} 
					description={description}
					statusCodes={languages}
					head={code}
					body={code}
					imagelink={imagelink}
                    keywords={keywords}
				/>
            );
        } else {
            return (
                <Step2
					key={id} 
					scrollId={id} 
					title={title} 
					description={description}
                    keywords={keywords}
				/>
            );
        }

        if (JSON.stringify(swagger).indexOf(id) >= 0) {
            const code = swagger["data"][id]["code"][language];
            return (
                <CodeStep 
					key={id} 
					scrollId={id} 
					title={title} 
					description={description} 
					language={language}
					languages={languages}
					langcall={langcall}
					code={code} 
					imagelink={imagelink}
                    position={position}
                    keywords={keywords}
				/>
            );
        } else {
            return (
                <Step
					key={id} 
					scrollId={id} 
					title={title} 
					description={description} 
					imagelink={imagelink}
					position={position}
                    keywords={keywords}
				/>
            );
        }
    }

    render() {
        const sections = this.state.sections.slice();

        let items = [];
        Array.from(sections, (val, index) => { return items.push(this.contentFromSection(val, index)); });

        return (
            <div className={this.props.className} > 
		        {items}
            </div>
        );
    }

}

Content.propTypes = propTypes;

export default Content;