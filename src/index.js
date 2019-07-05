import React from 'react';
import ReactDOM from 'react-dom';
import { Sidebar } from './sidebar.js';
import { ContentField } from './content.js';
import './index.css';


// The entire page is contained here
class DocuPage extends React.Component{
    state = {fullText: ""};
    urls = {
        ecom: "https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/vipps-ecom-api.md",
        login:"https://raw.githubusercontent.com/vippsas/vipps-login-api/master/vipps-login-api.md",
        invoice:"https://raw.githubusercontent.com/vippsas/vipps-invoice-api/master/vipps-invoice-api.md"
    }

    componentDidMount = () => {
        this.getContent();
    }

    getContent = () => {
        fetch(this.urls[this.props.doc])
        .then(response => 
            response.text().then(rendered => this.setState({ fullText: rendered}))
        )
        .catch(error => console.log("Something went wrong..", error));
    };

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
    <body>
        <DocuPage doc="login"/>
    </body>,
    document.getElementById('root')
)