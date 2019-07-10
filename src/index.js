import React from 'react';
import ReactDOM from 'react-dom';
import { Sidebar } from './components/sidebar/sidebar.js';
import { DocCard } from './components/startpage/startpage.js';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MarkdownHTML from './components/MarkdownHTML/MarkdownHTML.js'
import './vippsstyle.css';
import './index.css';
import vipps_dev from "./img/vipps_dev.svg"

// TODO: startpath should be "/documentation/" and not "/"
const StartPage = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Cards}/>
            <Route path="/how-it-works/ecommerce/" exact component={props => "howitworks"}/>
            <Route path="/how-it-works/invoice/" exact component={props => "howitworks"}/>
            <Route path="/how-it-works/secure-login/" exact component={props => "howitworks"}/>

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
        this.setState({
            fullText: originalMarkdown,
            // First element i navbarHeaders is an empty collection
            // Second element is just the name of the documentation, not needed in navigation bar
            // In case second header is not 'table of contents' do not exclude the second header
            headers: navbarHeaders[2].name === "Table of contents" ? navbarHeaders.slice(3) : navbarHeaders.slice(2)
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
                  //url={"https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/vipps-ecom-api.md"}
                  text={this.state.fullText}
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
