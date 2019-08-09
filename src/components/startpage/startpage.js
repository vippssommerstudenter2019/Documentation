import React from 'react';
import { Link } from 'react-router-dom';
import startpageCSS from './startpage.module.css';
import vippsDev from '../../img/vipps_dev.svg';

const StartPage = () => (
  <div className={startpageCSS.StartPage}>
    <div className={startpageCSS.VippsDev}>
      <img src={vippsDev} alt="Vipps Developers" />
    </div>
    <div className={startpageCSS.Cards}>
      <DocCard
        img={{ src: 'https://www.vipps.no/media/images/ta_betalt_pa_nett.max-320x320.jpegquality-60.png', alt: 'Ta betalt på nett' }}
        title="eCommerce"
        text="Get Vipps checkout on your webstore"
        startLink="/how-it-works/ecommerce/"
        docLink="/documentation/ecommerce/"
        docName="ecom"
      />
      <DocCard
        img={{ src: 'https://www.vipps.no/media/images/sende_regninger.max-320x320.jpegquality-60.png', alt: 'Send regninger' }}
        title="Invoice"
        text="Send invoices with Vipps"
        startLink="/how-it-works/invoice/"
        docLink="/documentation/invoice/"
        docName="invoice"
      />
      <DocCard
        img={{ src: 'https://www.vipps.no/media/images/vipps_logginn.max-320x320.jpegquality-60.png', alt: 'Logg inn' }}
        title="Login"
        text="Secure login and identification with Vipps"
        startLink="/how-it-works/secure-login/"
        docLink="/documentation/secure-login/"
        docName="login"
      />
    </div>
  </div>
);

const DocCard = args => (
  <div className={startpageCSS.DocCard}>
    <div className={startpageCSS.DocCardImg}>
      <img src={args.img.src} alt={args.img.alt} />
    </div>
    <div className={startpageCSS.DocCardText}>
      <h2 className={startpageCSS.DocCardTitle}>{args.title}</h2>
      <p>{args.text}</p>
    </div>
    <div className={startpageCSS.DocCardLinks}>
      <Link className={startpageCSS.GetStartedLink} to={args.startLink}>
        <div className={startpageCSS.GetStartedText}>
            How it works
        </div>
      </Link>
      <Link className={startpageCSS.DocumentationLink} to={args.docLink}>Documentation</Link>
    </div>
  </div>
);

export default StartPage;
