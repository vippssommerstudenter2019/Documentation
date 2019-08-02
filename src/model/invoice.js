const invoiceSections = `
---
Prerequisites:
    access_token:
        title: Get access token
        introduction: In order to make API calls to Vipps, you need a valid [access token]. The token is valid for 24 hours.
        imagePath: ../../assets/ecom-steps/PayWithVipps.svg
        endpoints:
            - /accesstoken/get
        descriptions:
            /accesstoken/get: Gets called when you ask for a valid acess token from Vipps		
        modes:
            /accesstoken/get: POST
        responses: true
        keywords:
            access token:
                title: What is an access token?
                description : A token is an object which represents the right to perform some operation. An access token, is a system object representing the subject of access control operations. All API calls are authenticated and authorized based on the application access token (JWT bearer token).
                linkTitle: API documentation
                link: http://localhost:3000/documentation/invoice/#api-access-token
    
    customer_registry_washing:
        title: Registry washing and customer lookup
        introduction: Before sending an invoice to a customer, it is important to do a customer registry lookup to ensure that the invoice is sent to the right customer. This could either be done by using [Vipps Customer Data Query Service] or other washing systems by your choice. 
        imagePath:
        endpoints:
            -  registry_washing
        descriptions:
            registry_washing:
        modes:
            registry_washing:
        responses: false
        keywords:
            Vipps Customer Data Query Service:
                title: What is Vipps Customer Data Query Service?
                description: All invoice issuers that would like to distribute their invoices through Vipps will need to know whom of their customers have agreed to receive invoices through Vipps.
                linkTitle: VIPPS Customer Data Query Service at Infotorg
                link: https://www.infotorg.no/partners-portal/main-page#


    recipient_token:
        title: Get recipient token
        introduction: To submit an invoice, you need both an access token and a [recipient token]. You will only receive a recipient token if your customer fulfills the [requirements] specified for receiving invoices through Vipps. 
        imagePath: ../../assets/ecom-steps/MobileAndBrowser.svg
        endpoints:
            - "/recipients/tokens"
        descriptions:
            "/recipients/tokens" : The shown body is called when requesting a valid recipient token from Vipps. You have to provide either the recipients Norwegian national identification or mobile number (with prefix e.g. 47 for Norway) for the value in the body, for national indentification number set type as 'nin-no' and for phone, set type as 'msisdn'.
        modes:
            "/recipients/tokens" : POST
        responses: true 
        keywords:
            recipient token:
                title: What is a recipient token?
                description:  The recipient token grants access for the ISP to deliver an invoice to the specific customer in Vipps. The recipient token has is valid for 15 minutes.
                linkTitle: API documentation
                link: http://localhost:3000/documentation/invoice/#recipient-token
            requirements:
                title: What requirements?
                description: Vipps will only return a recipient token for users that have opted in to Vipps Regninger and have a bank account that can be used with Vipps Regninger. Read more about it in the documentation.
                linkTitle: API documentation
                link: http://localhost:3000/documentation/invoice/#recipient-token

The invoice process:
    send_invoice:
        title: Send invoice
        introduction: The first step in the invoice payment process is sending an invoice to the customer. As an ISP you should have recieved an invoice from your partner with a URL and [necessary credentials].
        imagePath: ../../assets/ecom-steps/Initiate.svg
        endpoints:
            - "/invoices/{invoiceId}"
        descriptions:
            "/invoices/{invoiceId}" : Submits an invoice to Vipps for processing.
        modes:
            "/invoices/{invoiceId}" : PUT 
        responses: true 
        keywords:
            necessary credentials:
                title: What necessary credentials?
                description: An invoice need to contain some necessary information and credentials. Read about what information to include and what rules to be aware of
                linkTitle: API documentation invoice validation
                link: https://github.com/vippsas/vipps-invoice-api/blob/master/vipps-invoice-api.md#invoice-validation


    checking_status:
        title: Checking status of an invoice
        introduction: After the invoice is sent, you can check if the [state] has changed from "created" to "pending". This will usually happen within 5 seconds, but during high load, it might take longer. Other states may also occur at this point and this can be seen in the [state machine diagram]. When the status is pending, the invoice is visible for the customer in Vipps. Note that if the customer wants to open the attached invoice pdf. the IPP/invoice hotel need to perform a [validation] of the JSON Web Token included in the URL.
        imagePath: ../../assets/ecom-steps/MobileAndBrowser.svg
        endpoints:
            - "/invoices/{invoiceId}" 
        descriptions:
            "/invoices/{invoiceId}" : In order to verify the state of an invoice, e.g. if it has been validated and now is available for recipients, call this endpoint with the invoice ID. 
        modes:
            "/invoices/{invoiceId}" : GET
        responses: true 
        keywords: 
            state:
                title: States?
                description: An invoice will go through several states, and it's important to keep track of these. Read more in the API documentation.
                linkTitle: API documentation
                link: http://localhost:3000/documentation/invoice/#invoice-states
            state machine diagram:
                title: What state machine diagram?
                description: Go to documentation to see all possibles states for invoices throughout the process.
                linkTitle: API documentation 
                link: https://github.com/vippsas/vipps-invoice-api/blob/master/vipps-invoice-api.md#detailed-information-about-invoice-states-and-transitions
            validation:
                title: What validation?
                description: The IPP/invoice hotel is responsible for validation the JWT before returning the document. This is necessary to make sure that the customer can only access the specific invoice.
                linkTitle: API documentation Validating JWT
                link: https://github.com/vippsas/vipps-invoice-api/blob/master/vipps-invoice-api.md#validating-the-json-web-token-jwt-and-the-request

    customer_confirms:
        title: Customer confirms the invoice
        introduction: As the state has gone from created to pending, the customer will be notified and the invoice will appear in customers Vipps app. If the customer confirms the invoice the status will change from pending to approved. Note that after due date it is useful to know if the invoice was confirmed by the customer. This is easily done by checking the status once again.
        imagePath: ../../assets/ecom-steps/ConfirmInApp.svg
        endpoints:
            - customer_pays
        descriptions:
            customer_pays:
        modes:
            customer_pays: NA
        responses: false
        keywords:


    paid_invoice:
        title: Payment is transferred 
        introduction: The payment is fulfilled when the customers bank is transferring money to the issuers bank. This happens at the date specified by the customer. Neither Vipps or the ISP is included in this step or is given any further information about the result of the payment.
        imagePath:
        endpoints:
            - paid_invoice
        descriptions:
            paid_invoice:
        modes:
            paid_invoice: NA
        responses: false
        keywords:

Important to implement:

    revoke_invoice:
        title: Revoking an invoice
        introduction: If something is wrong with the invoice, you should be able to revoke so that the customer no longer sees it. Note that invoices can be revoked if they currently are in the states created, pending or rejected. If an invoice has been approved, deleted or expired it cannot be revoked anymore.
        imagePath: ../../assets/ecom-steps/Cancel.svg
        endpoints:
            - "/invoices/{invoiceId}/status/revoked" 
        descriptions:
            "/invoices/{invoiceId}/status/revoked" : An ISP can revoke an invoice by calling this endpoint. It cointains the unique invoice id, a property for optimistic concurrency control, a unique identifier for the requested state transition and an authorization token obtained from Access Token API.
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