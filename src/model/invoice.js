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
                link: http://localhost:3000/documentation/invoice/#api-access-token

    recipient_token:
        title: Get recipient token
        introduction: 
        imagePath: ../../assets/ecom-steps/MobileAndBrowser.svg
        endpoints:
            - "/recipients/tokens"
        descriptions:
            "/recipients/tokens" : To submit an invoice, you need both an access token and a [recipient token]. You have to provide either the recipients Norwegian national identification or mobile number (with prefix e.g. 47 for Norway) for the value in the body, for national indentification number set type as 'nin-no' and for phone, set type as 'msisdn'.
        modes:
            "/recipients/tokens" : POST
        responses: true 
        keywords:
            recipient token:
                title: What is a recipient token?
                description: Vipps will only return a recipient token for users that have opted in to Vipps Regninger and have a bank account that can be used with Vipps Regninger. The recipient token has a 15 minute lifetime.
                linkTitle: API documentation
                link: http://localhost:3000/documentation/invoice/#recipient-token

The invoice process:
    send_invoice:
        title: Send invoice
        introduction: 
        imagePath: ../../assets/ecom-steps/Initiate.svg
        endpoints:
            - "/invoices/{invoiceId}"
        descriptions:
            "/invoices/{invoiceId}" : Submits an invoice to Vipps for processing. The invoice will go through several [states], and you have to check for that. We'll guide you through it in the following steps.
        modes:
            "/invoices/{invoiceId}" : PUT 
        responses: true 
        keywords:
            states:
                title: States
                description: An invoice will go through several states, and it's important to keep track of these. Read more in the API documentation.
                linkTitle: API documentation
                link: http://localhost:3000/documentation/invoice/#invoice-states

    customer_pays:
        title: Customer gets notification and pays the invoice
        introduction: 
        imagePath: ../../assets/ecom-steps/ConfirmInApp.svg
        endpoints:
            - customer_pays
        descriptions:
            customer_pays: The invoice will now pop up in the user's app. They confirm the payment.
        modes:
            customer_pays: NA
        responses: false
        keywords:

Nice to know:
    checking_status:
        title: Checking status of an invoice
        introduction: 
        imagePath: ../../assets/ecom-steps/MobileAndBrowser.svg
        endpoints:
            - "/invoices/{invoiceId}" 
        descriptions:
            "/invoices/{invoiceId}" : In order to verify the state of an invoice, e.g. if it has been validated and now is available for recipients, call this endpoint with the invoice ID. 
        modes:
            "/invoices/{invoiceId}" : GET
        responses: true 
        keywords: 

    revoke_invoice:
        title: Revoking an invoice
        introduction: 
        imagePath: ../../assets/ecom-steps/Cancel.svg
        endpoints:
            - "/invoices/{invoiceId}/status/revoked" 
        descriptions:
            "/invoices/{invoiceId}/status/revoked" : A revoked invoice is not shown to the recipient. Invoices can be revoked if they currently are in the states created, pending or rejected. If an invoice has been approved, deleted or expired it cannot be revoked anymore.
        modes:
            "/invoices/{invoiceId}/status/revoked" : PUT
        responses: true 
        keywords:  
    
`;

const invoiceIntro = `
---
title: Vipps Invoice API
introduction: Understanding the process of digital invoices
description: Before implementing the Vipps Invoice API, you’ll need to get keys for testing and production through the developer portal. 
imagePath: "../../assets/images/womanWithPhone.svg"
`;

const invoiceOutro = `
---
title: Great! Now you know how invoices with Vipps works
description: You're ready to move forward to the documentation
imagePath: "../../assets/images/jumpingMan.svg"
link: http://localhost:3000/documentation/invoice/
`;

export { invoiceSections, invoiceIntro, invoiceOutro};