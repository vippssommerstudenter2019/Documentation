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
        fetch(this.urls[this.props.location])
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
    <StartPage/>,
    document.getElementById('root')
)