import React from 'react';
import ReactDOM from 'react-dom';
import DocuPage from './components/docupage/docupage.js'
import { Sidebar } from './components/sidebar/sidebar.js';
import { DocCard } from './components/startpage/startpage.js';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './vippsstyle.css';
import './index.css';
import vipps_dev from "./img/vipps_dev.svg"

// TODO: startpath should be "/documentation/" and not "/"
const StartPage = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Cards}/>
            <Route path="/documentation/ecommerce/" component={props => <DocuPage doc="ecom"/>}/>
            <Route path="/documentation/invoice/" component={props => <DocuPage doc="invoice"/>}/>
            <Route path="/documentation/secure-login/" component={props => <DocuPage doc="login"/>}/>
        </Switch>
    </Router>
)

const Cards = () => (
    <div className="StartPage">
        <div className="VippsDev">
            <img src={vipps_dev} alt="Vipps Developers"/>
        </div>
        <div className="Cards">
            <DocCard img={{src:"https://www.vipps.no/media/images/ta_betalt_pa_nett.max-320x320.jpegquality-60.png", alt:"Ta betalt på nett"}}
                    title="eCommerce"
                    text="Get Vipps checkout on your webstore"
                    startLink="/"
                    docLink="/documentation/ecommerce/"
                    docName="ecom"
            />
            <DocCard img={{src:"https://www.vipps.no/media/images/sende_regninger.max-320x320.jpegquality-60.png", alt:"Send regninger"}}
                    title="Invoice"
                    text="Send invoices with Vipps"
                    startLink="/"
                    docLink="/documentation/invoice/"
                    docName="invoice"
            />
            <DocCard img={{src:"https://www.vipps.no/media/images/vipps_logginn.max-320x320.jpegquality-60.png", alt:"Logg inn"}}
                    title="Login"
                    text="Secure login and identification with Vipps"
                    startLink="/"
                    docLink="/documentation/secure-login/"
                    docName="login"
            />
        </div>
        {/* <div className="APIcontainer">
            <ApiDoc apiLink="/"/>
        </div> */}
    </div>
)


ReactDOM.render(
    <StartPage/>,
    document.getElementById('root')
)
