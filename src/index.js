import React from 'react';
import ReactDOM from 'react-dom';
import { Sidebar } from './sidebar.js';
import { ContentField } from './content.js';
import { DocCard, ApiDoc } from './startpage.js';
import './index.css';

class StartPage extends React.Component {
    state = {location: 'startpage'}

    handleDocuClick = (doc) => {
        this.setState({location:{doc}})
    };

    handleStartClick = (doc) => {
// TODO
    }

    render = () => (
        <section>
            {this.state.location === 'startpage' ? (
                <div className="StartPage">
                    <div className="Cards">
                    <DocCard img={{src:"https://www.vipps.no/media/images/ta_betalt_pa_nett.max-320x320.jpegquality-60.png", alt:"Ta betalt på nett"}}
                            title="eCommerce"
                            text="Get Vipps checkout on your webstore"
                            startClick={this.handleStartClick}
                            docuClick={this.handleDocuClick}
                            docuLink="ecom"
                    />
                    <DocCard img={{src:"https://www.vipps.no/media/images/sende_regninger.max-320x320.jpegquality-60.png", alt:"Send regninger"}}
                            title="Invoice"
                            text="Send invoices with Vipps"
                            startClick={this.handleStartClick}
                            docuClick={this.handleDocuClick}
                            docuLink="invoice"
                    />
                    <DocCard img={{src:"https://www.vipps.no/media/images/vipps_logginn.max-320x320.jpegquality-60.png", alt:"Logg inn"}}
                            title="Login"
                            text="Secure login and identification with Vipps"
                            startClick={this.handleStartClick}
                            docuClick={this.handleDocuClick}
                            docuLink="login"
                    />
                    </div>
                    <div className="APIcontainer">
                        <ApiDoc apiClick=""/>
                    </div>
                </div>
            ):(
                <DocuPage doc={this.state.location}/>
            )}
        </section>
    )
}



// The entire page is contained here
class DocuPage extends React.Component{
    constructor(props) {
        super(props);
        this.urls = {
            ecom: "https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/vipps-ecom-api.md",
            login:"https://raw.githubusercontent.com/vippsas/vipps-login-api/master/vipps-login-api.md",
            invoice:"https://raw.githubusercontent.com/vippsas/vipps-invoice-api/master/vipps-invoice-api.md"
        }
        this.state = {
            fullText: "",
            headers: [],
            contents: [],
        }
    }

    componentDidMount() {
        this.getContent()
        .then(response => response.text().then(text => this.filterContent(text)))
    }

    // Fetches raw content from Github and puts it in the DocuPage state 
    getContent() {
        return fetch(this.urls[this.props.doc]);
    }

    // Returns a HTML anchor from a given header
    makeAnchor(level, string) {
        return "#" + string.replace(level, "").trim().replace(new RegExp(" ", 'g'),"-").toLowerCase()
    }

    // Filters the content fetched from Github into headers and content
    filterContent(data) {
        const lines = data.split("\n");
        let navbarHeaders = []
        let navbarHeader = {name: "", anchor: "", children: []}
        let content = [];
        lines.forEach((line) => {
            if (line.startsWith("###")) {
                return;
            } else if (line.startsWith("##")) {
                navbarHeader.children.push({name: line.replace("##", "").trim(), 
                    anchor: this.makeAnchor("##", line)});
            } else if (line.startsWith("#")) {
                navbarHeaders.push(navbarHeader);
                navbarHeader = {name: "", anchor: "", children: []}
                navbarHeader.name = line.replace("#", "").trim();
                navbarHeader.anchor = this.makeAnchor("#", line);
            } else {
                content.push(line);
            }
        });
        this.setState({headers: navbarHeaders.slice(1, navbarHeaders.length - 1), contents: content})
    }

    render() {
        return (
            <section className="DocuPage">
                <Sidebar dataFelt={"Ett eller annet her"}/>
                <ContentField/>
            </section>
        )
    }
}

ReactDOM.render(
    <StartPage/>,
    document.getElementById('root')
)