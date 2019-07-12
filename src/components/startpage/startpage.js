import React from 'react';
import { Link } from "react-router-dom";
import './startpage.css'
import vipps_dev from "../../img/vipps_dev.svg"


export const StartPage = () => (
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
    </div>
)

const DocCard = (props) => (
    <div className="DocCard">
        <div className="DocCardImg">
            <img  src={props.img.src} alt={props.img.alt} />
        </div>
        <div className="DocCardText">
            <h2 className="DocCardTitle">{props.title}</h2>
            <p>{props.text}</p>
        </div>
        <div className="DocCardLinks">
            <Link className="GetStartedLink"  to={props.startLink}>
                <div className="GetStartedText">
                    How it works
                </div>
            </Link>
            <Link className="DocumentationLink"  to={props.docLink}>Documentation</Link>
        </div>
    </div>
)