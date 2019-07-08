import React from 'react';


// Contains all components not including sidebar
export const ContentField = () => (
    <section className="ContentField">
        <ContentSection />
        {/* <ScrollSection /> */}
    </section>
)

// Contains all content on the page
const ContentSection = () => (
    <section className="ContentSection">
    <TitleHeader/>
    <ContentRow textbox={<TextBox header="Overview" body="The Vipps eCommerce API (eCom API) offers functionality for online payments, both using web browsers on websites and in native apps for iOS and Android, using app-switching."/>}
                mediabox={<MediaBox type="img" alt="ta_betalt" src="https://www.vipps.no/media/images/ta_betalt_i_butikk.max-160x160.png"/>}/>
    <ContentRow textbox={<TextBox header="Payment types" body="Vipps eCommerce API offers 2 types of payments <br />- Regular eCommerce payments <br />- Express checkout payments"/>}
                mediabox={<MediaBox type="img" alt="ta_betalt" src="https://www.vipps.no/media/images/vippsnummer.max-160x160.png"/>}
    />
    <ContentRow textbox={<TextBox header="Desktop and mobile browsers" body="When a user has selected Vipps for payment, the Vipps landing page detects whether user is using a desktop browser or a mobile browser: - In a mobile browser, the landing page detects if the Vipps app is installed, and automatically switches to the Vipps app if it is. - In a desktop browser, the landing page prompts the user for the phone number (the number may also be pre-filled). "/>}
                mediabox={<MediaBox type="code" code={"System.Out.Println(\"hei her er det kode\");"}/>}
    />

    </section>
)

/*TODO Custom scrollbar breaks with a lot of browsers
https://stackoverflow.com/questions/9251354/css-customized-scroll-bar-in-div
*/
const ScrollSection = () => (
    <div className="sidebar">

    </div>
)

const TitleHeader = () => (
    <div className="content">
        <h1>eCommerce</h1>
    </div>

)

const ContentRow = (props) => (
    <div className="content">
    {props.textbox}
    {props.mediabox}
    </div>
)

const TextBox = (props) => (
    <div className="content">
        <h2>{props.header}</h2>
        <p>{props.body}</p>
        </div>
)

const MediaBox = (props) => {
    let content;
    if (props.type==="img"){
        content = (
            <div className="content">
                <img src={props.src}
                    alt={props.alt}/>
            </div>
        )
    } else if (props.type==="code"){
        content = (
            <div className="content">
                <pre>
                    <code >
                        {props.code}
                    </code>
                </pre>
            </div>
        )
    }
    return content
}
