import React from 'react';
import ReactDOM from 'react-dom';
import { Sidebar } from './components/sidebar/sidebar.js';
import { DocCard } from './components/startpage/startpage.js';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MarkdownHTML from './components/MarkdownHTML/MarkdownHTML.js'
import './styles/vipps-style.css';
import './styles/index.css';
import vipps_dev from "./img/vipps_dev.svg"
import HowItWorks from "./components/howitworks/HowItWorks"
import {eComSections, eComIntro} from "./model/eCom"
import {loginSections, loginIntro} from "./model/login"
import {invoiceSections, invoiceIntro} from "./model/invoice"

// TODO: startpath should be "/documentation/" and not "/"
const StartPage = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Cards}/>
            <Route path="/how-it-works/ecommerce/" exact component={props => <HowItWorks intro={eComIntro} sections={eComSections}/>}/>
            <Route path="/how-it-works/invoice/" exact component={props => <HowItWorks intro={invoiceIntro} sections={invoiceSections}/>}/>
            <Route path="/how-it-works/secure-login/" exact component={props => <HowItWorks intro={loginIntro} sections={loginSections}/>} />
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
                    startLink="/how-it-works/ecommerce/"
                    docLink="/documentation/ecommerce/"
                    docName="ecom"
            />
            <DocCard img={{src:"https://www.vipps.no/media/images/sende_regninger.max-320x320.jpegquality-60.png", alt:"Send regninger"}}
                    title="Invoice"
                    text="Send invoices with Vipps"
                    startLink="/how-it-works/invoice/"
                    docLink="/documentation/invoice/"
                    docName="invoice"
            />
            <DocCard img={{src:"https://www.vipps.no/media/images/vipps_logginn.max-320x320.jpegquality-60.png", alt:"Logg inn"}}
                    title="Login"
                    text="Secure login and identification with Vipps"
                    startLink="/how-it-works/secure-login/"
                    docLink="/documentation/secure-login/"
                    docName="login"
            />
        </div>
        {/* <div className="APIcontainer">
            <ApiDoc apiLink="/"/>
        </div> */}
    </div>
)

// The entire page is contained here
class DocuPage extends React.Component {
  constructor(props) {
    super(props);
    this.urls = {
      ecom:
        "https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/vipps-ecom-api.md",
      login:
        "https://raw.githubusercontent.com/vippsas/vipps-login-api/master/vipps-login-api.md",
      invoice:
        "https://raw.githubusercontent.com/vippsas/vipps-invoice-api/master/vipps-invoice-api.md"
    };
    this.devResUrls = {
      ecom: [
        ["Postman", "https://github.com/vippsas/vipps-ecom-api/tree/master/tools"],
        ["FAQ", "https://github.com/vippsas/vipps-ecom-api/blob/master/vipps-ecom-api-faq.md"],
        ["Swagger", "https://vippsas.github.io/vipps-ecom-api/"]
      ],
      login: [
        ["Postman", "https://github.com/vippsas/vipps-login-api/tree/master/tools"],
        ["FAQ", "#faq"],
        ["Swagger", "https://vippsas.github.io/vipps-login-api/"]
      ],
      invoice: [
        ["Postman", "https://github.com/vippsas/vipps-invoice-api/tree/master/tools"],
        ["FAQ", "#faq"],
        ["Swagger ISP", "https://vippsas.github.io/vipps-invoice-api/isp.html"],
        ["Swagger IPP",  "https://vippsas.github.io/vipps-invoice-api/ipp.html"]
      ]
    }
    this.pageTitles = {
      ecom: "Vipps eCommerce API",
      login: "ipps Login API",
      invoice: "Vipps Invoice API"
    }

    this.state = {
      fullText: "",
      headers: []
    };
  }

  componentDidMount() {
    this.getContent().then(response =>
      response.text().then(text => this.getHeaders(text))
    );
  }

  // Fetches raw content from Github and puts it in the DocuPage state
  getContent() {
    return fetch(this.urls[this.props.doc]);
  }

  // Returns a HTML anchor from a given header
  makeAnchor(string) {
    return (
      "#" +
      string
        .replace(new RegExp("[|&;:$%@<>()+,#']", "g"), "")
        .trim()
        .replace(new RegExp(" ", "g"), "-")
        .toLowerCase()
      );
    }

      // Return one or two swagger subheaders
      getChildren() {
        let childs = [];
        this.devResUrls[this.props.doc].forEach((header) => {
          childs.push({name: header[0], anchor: header[1]})
        });
        return childs;
      }

      // Because of design issues, we add our own header and subheaders to the sidebar
      addSpecialHeader() {
        let devRes = {name: "Developer resources", anchor: "#developer-resources",
          children: this.getChildren()};
        return devRes;
      }

    // Filters the content fetched from Github into headers
    getHeaders(data) {
        const originalMarkdown = (' ' + data).slice(1);
        const lines = data.split("\n");
        let navbarHeaders = []
        let navbarHeader = {name: "", anchor: "", children: []}
        lines.forEach((line) => {
            if (line.startsWith("###")) {
                return;
            } else if (line.startsWith("##")) {
                navbarHeader.children.push({name: line.replace("##", "").trim(),
                    anchor: this.makeAnchor(line)});
            } else if (line.startsWith("#")) {
                navbarHeaders.push(navbarHeader);
                navbarHeader = {name: "", anchor: "", children: []}
                navbarHeader.name = line.replace("#", "").trim();
                navbarHeader.anchor = this.makeAnchor(line);
            } else {
                return;
            }
        });
        let sidebarHeaders = navbarHeaders[2].name === "Table of contents" ? navbarHeaders.slice(3) : navbarHeaders.slice(2);
        sidebarHeaders.unshift(this.addSpecialHeader());
        this.setState({
            fullText: originalMarkdown,
            // First element i navbarHeaders is an empty collection
            // Second element is just the name of the documentation, not needed in navigation bar
            // In case second header is not 'table of contents' do not exclude the second header
            headers: sidebarHeaders
        });
    }

    render() {
        return (
            <div className="container bold">
              <div className="sidebar">
                <Sidebar headers={this.state.headers} api={this.props.doc}/>
              </div>
              <div className="content">
                <MarkdownHTML
                  text={this.state.fullText}
                  pageTitle={this.pageTitles[this.props.doc]}
                  devResUrls={this.devResUrls[this.props.doc]}
                />
              </div>
            </div>
        )
    }
}

ReactDOM.render(
    <StartPage/>,
    document.getElementById('root')
)
