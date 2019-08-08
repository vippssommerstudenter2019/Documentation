import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DocuPage from './components/docupage/docupage';
import HowItWorks from './components/howitworks/HowItWorks';
import { StartPage } from './components/startpage/startpage';
import './styles/index.css';
import './styles/vipps-style.css';
import eComYaml from './model/eCom.yaml';
import invoiceYaml from './model/invoice.yaml';
import loginYaml from './model/login.yaml';


// TODO: startpath should be "/documentation/" and not "/"
const PageRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={StartPage} />
      <Route path="/how-it-works/ecommerce/" exact component={props => <HowItWorks apiName="eCom" yamlContentURL={eComYaml} />} />
      <Route path="/how-it-works/invoice/" exact component={props => <HowItWorks apiName="invoice" yamlContentURL={invoiceYaml} />} />
      <Route path="/how-it-works/secure-login/" exact component={props => <HowItWorks apiName="login" yamlContentURL={loginYaml} />} />
      <Route path="/documentation/ecommerce/" component={props => <DocuPage doc="ecom" />} />
      <Route path="/documentation/invoice/" component={props => <DocuPage doc="invoice" />} />
      <Route path="/documentation/secure-login/" component={props => <DocuPage doc="login" />} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <PageRouter />,
  document.getElementById('root'),
);
