const invoiceSections = `
---
Prerequisites:
    access_token:
        title: Get accesss token
        introduction: 
        imagePath: ../../assets/ecom-steps/PayWithVipps.svg
        endpoints:
            - /accesstoken/get
        descriptions:
            /accesstoken/get: In order to make API calls to Vipps, you need a valid [access token]. The token has to be renewned every 24 hours.
        modes:
            /accesstoken/get: POST
        responses: true
        keywords:
            access token:
                title: What is an access token?
                description : A token is an object which represents the right to perform some operation. An access token, is a system object representing the subject of access control operations. All API calls are authenticated and authorized based on the application access token (JWT bearer token).
                linkTitle: API documentation
                link: http://localhost:3000/documentation/ecommerce/#authentication

    recipient_token:
        title: Get recipient token
        introduction: 
        imagePath: ../../assets/ecom-steps/MobileAndBrowser.svg
        endpoints:
            - "/recipients/tokens"
        descriptions:
            "/recipients/tokens" : To submit an invoice, you need both an access token and a recipient token. Vipps will only return a recipient token for users that have opted in to Vipps Regninger and have a bank account that can be used with Vipps Regninger.
        modes:
            "/recipients/tokens" : POST
        responses: true 
        keywords:
`;

const invoiceIntro = `
---
title: Vipps Login API
introduction: Understanding the process of online payments
description: Before implementing the Vipps eCom API, you’ll need to get keys for testing and production through the developer portal. Look here for how to get started. Also, you should know how the payment process works.Underneath is a stepwise description of the payment process, including the customer, the Vipps eCom API and your website.
imagePath: "../../assets/images/womanWithPhone.svg"
`;

const invoiceOutro = `
---
title: Great! Now you know how the payment process works
description: You're ready to move forward to the documentation
imagePath: "../../assets/images/jumpingMan.svg"
`;

export { invoiceSections, invoiceIntro, invoiceOutro};