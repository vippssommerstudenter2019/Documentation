import React from 'react';
import ReactDOM from 'react-dom';
import { Sidebar } from './sidebar.js';
import { ContentField } from './content.js';
import './index.css';


// The entire page is contained here
class DocuPage extends React.Component{

    state = {fullText: ""}
    componentDidMount = () => {
        this.getContent();
    }

    getContent = () => {
        const url = "https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/vipps-ecom-api.md"
        fetch(url)
        .then(response => 
            response.text().then(rendered => this.setState({ fullText: rendered}))
        )
        .catch(error => console.log("Something went wrong..", error));
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
    <body>
        <DocuPage/>
    </body>,
    document.getElementById('root')
)