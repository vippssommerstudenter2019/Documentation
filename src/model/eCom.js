const eComSections = [
    {
        "id": "fetchAuthorizationTokenUsingPost",
        "title": "1. Customer chooses to pay with Vipps",
        "description": "A customer browses around on your website. As the customer has chosen an item or service to buy, the customer pushes the “betal med Vipps” button.\n\nFor this command to be possible, you need to send a request for a [valid token] from Vipps, as shown below. The token needs to be renewed every 24 hours. ",
        "img": "../../assets/ecom-steps/Step1.svg",
        "keywords": {
            "valid token": "A token is an object which represents the right to perform some operation. An Access token, is a system object representing the subject of access control operations. All API calls are authenticated and authorized based on the application access token (JWT bearer token) and a subscription key.",
        }
    },
    {
        "id": "initiatePaymentV3UsingPOST",
        "title": "2. Vipps handles the payment",
        "description": "When pushing the button on you’re website, [initiation of payment] to Vipps should happen. This is done by sending an initiate payment request containing the information specified in the code snippet below.",
        "img": "../../assets/ecom-steps/Step2.svg",
        "keywords": {
            "initiation of payment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Mauris at volutpat dolor.Cras vel sollicitudin sapien.Morbi eleifend felis nunc, et dictum augue tristique ac.Sed et mi a dui viverra malesuada quis ac massa.",
        }
    },
    {
        "id": "customerApproval",
        "title": "3. Customer confirms in Vipps application",
        "description": "The customer is now being notified on a mobile device and chooses to confirm the payment in the Vipps app.\n\nFor mobile and desktop browsers, integration is handled by Vipps using the Vipps [landing page]. You need to provide Vipps with a valid [fallBackURL] so that the customer is taken back to your website. This is normally an URL to the confirmation page.",
        "img": "../../assets/ecom-steps/Step3.svg",
        "keywords": {
            "landing page": "The Vipps landing page is mandatory, and provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way. See more in API Documentation",
            "fallbackURL": "A fallback or callback URL will be invoked by the API method you're calling after it's done. See documentation on how its used.",
        }
    },

    {
        "id": "transactionUpdateCallbackForRegularPaymentUsingPOST",
        "title": "4. Vipps reserves the amount",
        "description": "An amount is now [reserved] in the customers bank account, and a confirmation is sent to you by Vipps, containing a status set to reserve.",
        "img": "../../assets/ecom-steps/Step5.svg",
        "keywords": {
            "reserved": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Mauris at volutpat dolor.Cras vel sollicitudin sapien.Morbi eleifend felis nunc, et dictum augue tristique ac.Sed et mi a dui viverra malesuada quis ac massa.",
        }
    },
    {
        "id": "merchantConfirm",
        "title": "5. You confirm order and ships the item",
        "description": "Now, you´ll have to provide the customer with a confirmation of that you’ve been given the order and that payment is insured.\n\nNext step is delivering the service or shipping the items ordered from the customer.",
        "img": "../../assets/ecom-steps/Step6.svg",
        "keywords": {
        }
    },
    {
        "id": "capturePaymentUsingPOST",
        "title": "6. The amount is withdrawn from the customers account",
        "description": "The customer is given the service payed for or is notified that the items are being shipped.\n\nNow, you’ll need to confirm to Vipps that the item or services is delivered, and Vipps will perform [capture]. According to [Norwegian law], you cannot capture the amount from the customer before the item or service is shipped or delivered to the customer.",
        "img": "../../assets/ecom-steps/Step7.svg",
        "keywords": {
            "Norwegian law": "The seller may reserve the amount in the Purchaser’s account until the good is sent. This money will not be available to the Purchaser, but remain in the Purchaser’s possession.",
            "capture": "Capture payment allows the merchant to capture the reserved amount. The API allows for both a full amount capture and a partial amount capture. See API documentation for more info.",
        }
    },
    {
        "id": "cancelPaymentRequestUsingPUT",
        "title": "Cancellation of payment",
        "description": "If the customer choose to reject the initiated payment in the Vipps app, the payment will be [cancelled]. This also happens if the customer does not respond within 5 to 10 minutes in the app.\n\nThe order confirmation sent to you by Vipps will contain a status set to Cancel.",
        "img": "../../assets/ecom-steps/Step4.svg",
        "keywords": {
            "cancelled": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Mauris at volutpat dolor.Cras vel sollicitudin sapien.Morbi eleifend felis nunc, et dictum augue tristique ac.Sed et mi a dui viverra malesuada quis ac massa.",
        }
    },
    {
        "id": "refundPaymentUsingPOST",
        "title": "Refunding the customer",
        "description": "If the customer wants a [refund], and is guaranteed to have one, you’ll have to send a refund request to Vipps. A refund can be either partial or full. You initiate the refund by sending information as serial number, amount and transaction text, as shown in the code snippet below.",
        "img": "../../assets/ecom-steps/Step8.svg",
        "keywords": {
            "refund": "The merchant can initiate a refund of the captured amount. The refund can be a partial or full. See refund in API documentation.",
        }
    }
];

const eComIntro = {
    "title": "Vipps eCom API",
    "subtitle": "Understanding the process of online payments",
    "description": "Before implementing the Vipps eCom API, you’ll need to get keys for testing and production through the developer portal. Look here for how to get started.\n\nAlso, you should know how the payment process works.Underneath is a stepwise description of the payment process, including the customer, the Vipps eCom API and your website.",
    "imgPath": "../../assets/images/womanWithPhone.svg"
};

const eComOutro = {
    "title": "Great! Now you know how the payment process works",
    "description": "You're ready to move forward to the documentation",
    "imgPath": "../../assets/images/jumpingMan.svg"
};

export { eComSections, eComIntro, eComOutro };