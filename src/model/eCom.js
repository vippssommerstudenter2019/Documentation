const eComSections = `
---
Prerequisites:
    access_token:
        title: Get access token
        introduction: In order to make API calls to Vipps, you need a valid [access token]. This token has to be renewned every 24 hours.
        endpoints:
            - /accesstoken/get
        descriptions:
            /accesstoken/get: Gets called when you ask for a valid acess token from Vipps.
        modes:
            /accesstoken/get: POST
        responses: true
        keywords:
            access token:
                title: What is an access token?
                description : A token is an object which represents the right to perform some operation. An access token, is a system object representing the subject of access control operations. All API calls are authenticated and authorized based on the application access token (JWT bearer token).
                linkTitle: API documentation
                link: http://localhost:3000/documentation/ecommerce/#authentication

    endpoints:
        title: Set up endpoints
        introduction: To let Vipps send and receive information from you, you need to implement [endpoints] at your [backend]. They make it possible for you to for example get transaction updates and provide shipping details.
        endpoints:
            - "[callbackPrefix]/v2/payments/{orderId}"
            - "[shippingDetailsPrefix]/v2/payments/{orderId}/shippingDetails"
            - "[consentRemovalPrefix]/v2/consents/{userId}"
        descriptions:
            "[callbackPrefix]/v2/payments/{orderId}": Gets called when there is an transaction update for an order. The callback prefix is the endpoint at your backend where Vipps will send this information to. You have to check this for updates during the payment process, we'll guide you through it.
            "[shippingDetailsPrefix]/v2/payments/{orderId}/shippingDetails": A way for you to provide shipping details for your orders. The shipping details prefix is the endpoint at your backend where Vipps can get shipping details for a given order. The header will inlcude the order ID.
            "[consentRemovalPrefix]/v2/consents/{userId}": If the user has notifed Vipps that they want their personal information removed from your site, their data has to be deleted permanently according to GDPR. The consent removal prefix is the endpoint at your backend where Vipps will issue this request.
        modes:
            "[callbackPrefix]/v2/payments/{orderId}" : POST
            "[shippingDetailsPrefix]/v2/payments/{orderId}/shippingDetails" : POST
            "[consentRemovalPrefix]/v2/consents/{userId}" : DELETE
        responses: false
        keywords:
            backend:
                title: What is a backend?
                description: A backend is the machinery under the hood of your website. It can for example take care of the customer registry and orders you've received. 
                linkTitle: How to set up a backend at your website
                link: https://facebook.github.io/create-react-app/docs/integrating-with-an-api-backend
            endpoints:
                title: What is an endpoint?
                description: An endpoint is just a way for you to get information from Vipps at your backend. Think of it like your mailbox which Vipps can send letters to.
                linkTitle: How to set up an endpoint
                link: https://facebook.github.io/create-react-app/docs/integrating-with-an-api-backend


The payment process:
    initate:
        title: Initiate payment
        introduction: The customer is now selecting a service or item at your webstore, and wants to pay with Vipps. 
        imagePath: ../../assets/ecom-illustrations/initiatePayment2.svg
        endpoints:
            - /ecomm/v2/payments
        descriptions:
            /ecomm/v2/payments: Sends a request to Vipps to start the payment. Once the transaction is successfully initiated in Vipps, you will receive a URL in response which you can direct the customer to the [Vipps landing page] with. You need to provide a [fallbackURL] to you site which the customer will return to after confirming in the Vipps app. Passing ‘isApp’ as true will make Vipps respond with an [app-switch deeplink] that can take the customer directly to the Vipps app.

        modes:
            /ecomm/v2/payments: POST
        responses: true
        keywords:
            Vipps landing page:
                title: What is the Vipps landing page?
                description: The Vipps landing page provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way.
                linkTitle: API Documentation
                link: http://localhost:3000/documentation/ecommerce/#initiate-payment 
            fallbackURL:
                title: What is the fallback URL?
                description: An URL on your site that the customer willl be redirected to after they have confirmed the payment in the Vipps app, which makes it possible for you to provide an order confirmation or a receipt. 
                linkTitle: API Documentation
                link: http://localhost:3000/documentation/ecommerce/#initiate-payment 
            app-switch deeplink:
                title: What is app-switch?
                description: If you are implementing Vipps in an iOS or Android App, you can – with the help of the app-switch deeplink – guide your customers directly towards the Vipps app to make a more streamlined experience.
                linkTitle: API Documentation
                link: http://localhost:3000/documentation/ecommerce/#initiate-payment


    customer_confirms:
        title: Customer confirmation and checking status
        introduction: The customer is now being taken to the landing page and will confirm the [reservation of the payment] in the Vipps app. 
        imagePath: ../../assets/ecom-illustrations/customerConfirms2.svg
        endpoints:
            - "[callbackPrefix]/v2/payments/{orderId}"
        descriptions:
            "[callbackPrefix]/v2/payments/{orderId}": You have to check if the reservation of the payment was successful before doing anything else. This is where the endpoint for transaction updates comes into the picture. You'll have to check the information you get passed there to see if the status is 'reserve' as in the example to the right.

        modes:
            "[callbackPrefix]/v2/payments/{orderId}": POST
        responses: false
        keywords:
            reservation of the payment:
                title: Reservation of the payment 
                description: According to Norwegian law, the seller may only reserve the amount in the buyer's account until the item is sent or service is delivered. This money will not be available to the buyer, but remain in the buyer’s possession.
                linkTitle: API Documentation
                link: http://localhost:3000/documentation/ecommerce/#reserve

    ship_item:
        title: Confirm the order and ship/deliver the item
        introduction: Now, you'll have to provide the customer with a confirmation of that you’ve been given the order and that payment is reserved. Next step is delivering the service or shipping the items ordered from the customer.
        imagePath: ../../assets/ecom-illustrations/confirmOrder2.svg
        endpoints:
            - ship_item
        descriptions:
            ship_item:
    
        modes:
        responses: false
        keywords:

    capture:
        title: Withdraw the money
        introduction: Up to this point, the money is only reserved. According to Norwegian law, you can't withdraw money before the services are delivered or the items are shipped.  This is called a capture.
        imagePath: ../../assets/ecom-illustrations/capture2.svg
        endpoints:
            - "/ecomm/v2/payments/{orderId}/capture"
        descriptions:
            "/ecomm/v2/payments/{orderId}/capture": You send a capture request to Vipps so the money can be withdrawn from the buyer's account.
        modes:
            "/ecomm/v2/payments/{orderId}/capture" : POST
        responses: true
        keywords:

Nice to know:
    cancellation:
        title: Cancellation of payment
        introduction: If you as the seller can't deliver the ordered service or the item isn't in stock, you can send a cancel message to Vipps in order to free up the reservation of the payment.
        imagePath: ../../assets/ecom-illustrations/cancel2.svg
        endpoints:
            - /ecomm/v2/payments/{orderId}/cancel
        descriptions:
            /ecomm/v2/payments/{orderId}/cancel: Sends a request to Vipps for cancellation. The money will be availabe for the buyer.		
        modes:
            /ecomm/v2/payments/{orderId}/cancel: PUT
        responses: true
        keywords:

    refund:
        title: Refunding of payment
        introduction: If the customer wants a refund, you’ll have to send a refund request to Vipps. A refund can be either partial or full.
        imagePath: ../../assets/ecom-illustrations/refund.svg
        endpoints:
            - /ecomm/v2/payments/{orderId}/refund
        descriptions:
            /ecomm/v2/payments/{orderId}/refund: You initiate the refund by sending information as serial number, amount and transaction text.		
        modes:
            /ecomm/v2/payments/{orderId}/refund: POST
        responses: true
        keywords:
`;

const eComIntro = `
---
title: Vipps eCom API
introduction: Understanding how the process of online payments works
description: Before implementing the Vipps eCom API, you’ll need to get keys for testing and production through the developer portal. Look here for how to get started. 
descriptiontwo: Also, you should know how the payment process works. Underneath is a stepwise description of the payment process, including the customer, the Vipps eCom API and your website.
imagePath: "../../assets/images/womanWithPhone.svg"
`;

const eComFlowChart = `
---
title: Steps to implement for eCom
imagePath: "../../assets/ecom-illustrations/ecom-flowchart.svg"
stepTitles: false
`;

const eComOutro = `
---
title: Great! Now you know how the payment process works
description: You're ready to move forward to the documentation
imagePath: ../../assets/ecom-illustrations/jumpingMan.svg
link: http://localhost:3000/documentation/ecommerce/
`;

export { eComSections, eComIntro, eComOutro, eComFlowChart};