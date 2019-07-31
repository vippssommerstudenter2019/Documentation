import React from 'react';
import ReactDOM from 'react-dom';
import DocuPage from './components/docupage/docupage.js'
import HowItWorks from "./components/howitworks/HowItWorks"
import { StartPage } from './components/startpage/startpage.js';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {eComSections, eComIntro, eComOutro, eComFlowChart} from "./model/eCom"
import {invoiceSections, invoiceIntro, invoiceOutro} from "./model/invoice"
import {loginSections, loginIntro, loginOutro} from "./model/login"
import './styles/index.css';
import './styles/vipps-style.css';

// TODO: startpath should be "/documentation/" and not "/"
const PageRouter = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={StartPage}/>
            <Route path="/how-it-works/ecommerce/" exact component={props => <HowItWorks apiName="eCom"
                                                                                         swaggerURL="https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/docs/swagger.json" 
                                                                                         intro={eComIntro} 
                                                                                         sections={eComSections} 
                                                                                         outro={eComOutro} 
																						 flowchart={eComFlowChart}/>}/>
            <Route path="/how-it-works/invoice/" exact component={props => <HowItWorks apiName="invoice" 
                                                                                       swaggerURL="https://raw.githubusercontent.com/vippsas/vipps-invoice-api/master/docs/swagger-isp.json"
                                                                                       intro={invoiceIntro} 
                                                                                       sections={invoiceSections} 
                                                                                       outro={invoiceOutro}/>}/>
            <Route path="/how-it-works/secure-login/" exact component={props => <HowItWorks apiName="login" 
                swaggerURL="https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/docs/swagger.json"
                                                                                            intro={loginIntro} 
                                                                                            sections={loginSections} 
                                                                                            outro={loginOutro}/>} />
            <Route path="/documentation/ecommerce/" component={props => <DocuPage doc="ecom"/>}/>
            <Route path="/documentation/invoice/" component={props => <DocuPage doc="invoice"/>}/>
            <Route path="/documentation/secure-login/" component={props => <DocuPage doc="login"/>}/>
        </Switch>
    </Router>
)

ReactDOM.render(
    <PageRouter/>,
    document.getElementById('root')
)
