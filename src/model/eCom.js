const eComSections = [
    {
        "id": "fetchAuthorizationTokenUsingPost",
        "title" : "1. The customer wants to pay with Vipps",
        "description": "A customer wants to buy something online and chooses Vipps as their payment method. For this to be possible, the merchant needs a [valid token]. The merchant needs to renew the token every [24 hours].",
        "img" : "../../assets/ecom-steps/Step1.svg",
        "keywords" : {
            "valid token": "A token is an object which represents the right to perform some operation. An Access token, is a system object representing the subject of access control operations. All API calls are authenticated and authorized based on the application access token (JWT bearer token) and a subscription key.",
            "24 hours": "The access token is valid for 1 hour in Merchant Test (MT) and 24 hours in Production. This is done for various security reasons."
        }
   },
   {
       "id": "initiatePaymentV3UsingPOST",
       "title" : "2. Vipps handles the payment",
       "description": "The merchant provides Vipps with [price and ID] for items that are being sold",
       "img": "../../assets/ecom-steps/Step2.svg",
       "keywords": {
           "price and ID": "Price and ID is included in the Initiate request body, and no information about the customer is needed. ",
       }
   },
   {
       "id": "customerApproval",
       "title": "3. Customer confirms in Vipps application",
       "description": "For mobile and desktop browsers, integration is handled by Vipps using the Vipps [landing page].\nIf customer is in an application using Vipps as a service, the Vipps app is triggered using [app-switch].",
       "img": "../../assets/ecom-steps/Step3.svg",
       "keywords": {
           "landing page": "The Vipps landing page is mandatory, and provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way. ",
           "app-swich": "The Vipps landing page is mandatory, and provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way. ",
       }
   },
   {
       "id": "cancelPaymentRequestUsingPUT",
       "title": "4. Payment cancellation",
       "description": "A reservation is [cancelled] if the user rejects the initiated payment in the Vipps app.\nAlso, due to safety reasons, a cancellation will be triggered if the user does not respond within 5 to 10 minutes.",
       "img": "../../assets/ecom-steps/Step4.svg",
       "keywords": {
           "cancelled": "The Vipps landing page is mandatory, and provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way. ",
       }
   },
   {
       "id": "transactionUpdateCallbackForRegularPaymentUsingPOST",
       "title": "5. Vipps reserves the amount",
       "description": "If everything goes smoothly, an [amount is reserved] in the customers bank account. This means that the money is on hold, and can not be used or withdrawn by the customer. According to [Norwegian law], the merchant cannot capture the money before the item or service is shipped or delivered to the customer. This is to secure a safe payment! A [confirmation] of the reservation is sent to the merchant.",
       "img": "../../assets/ecom-steps/Step5.svg",
       "keywords": {
           "amount is reserved": "The Vipps landing page is mandatory, and provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way. ",
           "Norwegian law": "The Vipps landing page is mandatory, and provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way. ",
           "confirmation": "The Vipps landing page is mandatory, and provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way. ",
       }
    },
    {
        "id": "merchantConfirm",
        "title": "6. Merchant confirms order and ships the item",
        "description": "As the customer receives the [order confirmation], the transaction is accepted and the order is processed in the merchant systems.",
        "img": "../../assets/ecom-steps/Step6.svg",
        "keywords": {
            "order confirmation": "The Vipps landing page is mandatory, and provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way. ",
        }
    },
    {
        "id": "capturePaymentUsingPOST",
        "title": "7. The amount is withdrawn from the customers account",
        "description": "When an item or service is shipped or delivered, the [merchant notifies Vipps] that the order is completed. This is when Vipps and the merchant can make a [capture] of the reserved amount.",
        "img": "../../assets/ecom-steps/Step7.svg",
        "keywords": {
            "merchant notifies Vipps": "The Vipps landing page is mandatory, and provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way. ",
            "capture": "The Vipps landing page is mandatory, and provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way. ",
        }
    },
    {
        "id": "refundPaymentUsingPOST",
        "title": "8. Refunding the customer",
        "description": "If the item is sent in return, the merchant wants to [refund] the captured amount. To initiate a refund, the merchant request Vipps to refund and the amount will be in the customers bank account after 2-3 working days.",
        "img": "../../assets/ecom-steps/Step8.svg",
        "keywords": {
            "[refund]": "The Vipps landing page is mandatory, and provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way. ",
        }
    }
];

const eComIntro = {
    "subtitle": "Getting started",
    "title": "Vipps eCom API",
    "description": "Understanding the process of online payments",
    "imgPath": "../../assets/images/womanWithPhone.svg"
};

export { eComSections, eComIntro };