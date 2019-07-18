const eComSections = [
    {
        "title": "Get accesss token",
        "introduction": "",
        "imagePath": "../../assets/ecom-steps/Step1.svg",
        "descriptions": {
            "/accesstoken/get": "In order to make API calls to Vipps, you need a valid [access token]. This token has to be renewned every 24 hours.",
        },
        "endpoints": [
            "/accesstoken/get"
        ],
        "modes" : {
            "/accesstoken/get": "POST",
        },
        "responses" : [
            "/accesstoken/get"
        ],
        "keywords": {
            "access token": {
                "title" : "What is an access token?",
                "description": "A token is an object which represents the right to perform some operation. An access token, is a system object representing the subject of access control operations. All API calls are authenticated and authorized based on the application access token (JWT bearer token).",
                "titleLink": "API documentation",
                "link": "http://localhost:3000/documentation/ecommerce/#authentication"
            }
        }
    },
    {
        "endpoints": [
            "[callbackPrefix]/v2/payments/{orderId}",
            "[shippingDetailsPrefix]/v2/payments/{orderId}/shippingDetails",
            "[consentRemovalPrefix]/v2/consents/{userId}",
        ],
        "modes": {
            "[callbackPrefix]/v2/payments/{orderId}": "POST",
            "[shippingDetailsPrefix]/v2/payments/{orderId}/shippingDetails" : "POST",
            "[consentRemovalPrefix]/v2/consents/{userId}": "DELETE"
        },
        "title": "Setup endpoints required by Vipps",
        "introduction": "In order for Vipps to send and receive information from you, you need to implement some [endpoints]. They make it possible for you to for example get transaction updates and provide shipping details.",
        "imagePath": "../../assets/ecom-steps/Step1.svg",
        "descriptions": {
            "[callbackPrefix]/v2/payments/{orderId}": "Gets called when there is an transaction update for an order. The callback prefix is the endpoint at your site where Vipps can send transaction updates to.",
            
            "[shippingDetailsPrefix]/v2/payments/{orderId}/shippingDetails": "A way for you to provide shipping details for your orders.",

            "[consentRemovalPrefix]/v2/consents/{userId}": "The user has notifed Vipps that they want their personal information removed from your site. Their data has to be deleted permanently according to GDPR. The consent removal prefix is the endpoint at your site where Vipps will issue this request.",
        },
        "responses" : [

        ],
        "keywords": {
        }
    },
    {
        "endpoints": [
            "/ecomm/v2/payments"
        ],
        "modes": {
            "/ecomm/v2/payments" : "POST"
        },
        "title": "1. Initiate payment",
        "introduction" : "",
        "imagePath": "../../assets/ecom-steps/Step2.svg",
        "descriptions": {
            "/ecomm/v2/payments": "Sends a request to Vipps to start the payment. Once the transaction is successfully initiated in Vipps, you will receive a URL in response which you can direct the customer to the [Vipps landing page] with. You need to provide a [fallback URL] to you site which the customer will return to after confirming in the Vipps app. In order to get the status of the payment, Vipps will send infomation to the [callbackPrefix URL]. Passing ‘isApp’ as true will make Vipps respond with an [app-switch deeplink] that can take the customer directly to the Vipps app..",
        },
        "responses": [
            "/ecomm/v2/payments"
        ],
        "keywords": {
            "Vipps landing page": {
                "title": "What is the Vipps landing page?",
                "description": "The Vipps landing page provides a consistent and recognizable user experience, that helps guide the user through the payment flow. In this way Vipps takes responsibility for helping the user from the browser to the app, and to complete the payment in a familiar way.",
                "titleLink": "API documentation",
                "link": "http://localhost:3000/documentation/ecommerce/#initiate-payment"
            },
            "app-switch deeplink": {
                "title": "What is app switch?",
                "description": "If you are implementing Vipps in an iOS or Android App, you can – with the help of the app-switch deeplink – guide your customers directly towards the Vipps app to make a more streamlined experience.",
                "titleLink": "API documentation",
                "link": "http://localhost:3000/documentation/ecommerce/#initiate-payment"
            },
            "callbackPrefix URL": {
                "title": "What is the callback prefix URL?",
                "description": "The URL to your backend where Vipps can send information to for status updates about the payment.",
                "titleLink": "API documentation",
                "link": "http://localhost:3000/documentation/ecommerce/#initiate-payment"
            },
            "fallback URL": {
                "title": "What is the fallback URL?",
                "description": "An URL on your site that the customer willl be redirected to after they have confirmed the payment in the Vipps app, which makes it possible for you to provide order confirmation or a receipt.",
                "titleLink": "API documentation",
                "link": "http://localhost:3000/documentation/ecommerce/#initiate-payment"
            }
        }
    },
    {
        "endpoints": [
            "[callbackPrefix]/v2/payments/{orderId}"
        ],
        "modes": {
            "[callbackPrefix]/v2/payments/{orderId}" : "POST"
        },
        "title": "2. Customer confirmation and checking status",
        "introduction": "",
        "imagePath": "../../assets/ecom-steps/Step3.svg",
        "descriptions": {
            "[callbackPrefix]/v2/payments/{orderId}": "The customer is now being taken to the landing page and will confirm the [reservation of the payment] in the Vipps app. You have to check if the reservation of the payment was successful before doing anything else. This is where the callback prefix URL comes into the picture. You have set up an [endpoint] at that URL where you'll get status updates and can check that the money is reserved. The transactionInfo will yield a status of 'RESERVE' if everything is OK.",
        },
        "responses": [
        ],
        "keywords": {
            "reservation of the payment": {
                "title": "Reservation of the payment",
                "description": "According to Norwegian law, the seller may only reserve the amount in the buyer's account until the item is sent or service is delivered. The money will not be available to the buyer, but remain in the buyer’s possession.",
                "titleLink": "API Documentation",
                "link": "http://localhost:3000/documentation/ecommerce/#reserve"
            },
            "endpoint": {
                "title": "What is an endpoint?",
                "description": "An endpoint is just a way for you to get information from Vipps at your backend. Think of it like your mailbox that Vipps can send letters to.",
                "titleLink": "API Documentation",
                "link": "https://facebook.github.io/create-react-app/docs/integrating-with-an-api-backend"
            },
        }
    },
    {
        "endpoints": [
            "merchantConfirm"
        ],
        "modes": {
        },
        "title": "4. You confirm the order and ship the item or deliver the service",
        "introduction": "",
        "imagePath": "../../assets/ecom-steps/Step5.svg",
        "descriptions": {
            "merchantConfirm": "Now, you can provide the customer with a confirmation of that you’ve been given the order and that payment is reserved. Next step is delivering the service or shipping the items ordered from the customer.",
        },
        "responses": [

        ],
        "keywords": {
        }
    },
    {
        "endpoints": [
            "/ecomm/v2/payments/{orderId}/capture"
        ],
        "modes": {
            "/ecomm/v2/payments/{orderId}/capture" : "POST"
        },
        "title": "5. Withdraw",
        "introduction": "",
        "imagePath": "../../assets/ecom-steps/Step7.svg",
        "descriptions": {
            "/ecomm/v2/payments/{orderId}/capture": "Up to this point, the money is only reserved. According to Norwegian law, you can't withdraw money before the services are delivered or the items are shipped.  This is called a capture. You send a capture request to Vipps so the money can be withdrawn from the buyer's account.",
        },
        "responses": [
            "/ecomm/v2/payments/{orderId}/capture"
        ],
        "keywords": {
        }
    },
    {
        "endpoints": [
            "/ecomm/v2/payments/{orderId}/cancel"
        ],
        "modes": {
            "/ecomm/v2/payments/{orderId}/cancel": "PUT"
        },
        "title": "Cancellation of payement",
        "introduction": "",
        "imagePath": "../../assets/ecom-steps/Step7.svg",
        "descriptions": {
            "/ecomm/v2/payments/{orderId}/cancel": "If you as the seller can't deliver the ordered service or the item isn't in stock, you can send a cancel message to Vipps in order to free up the reservation of the payment. In that way, the money will be availabe to use for the buyer again.",
        },
        "responses": [
            "/ecomm/v2/payments/{orderId}/cancel"
        ],
        "keywords": {
        }
    },
    {
        "endpoints": [
            "/ecomm/v2/payments/{orderId}/refund"
        ],
        "modes": {
            "/ecomm/v2/payments/{orderId}/refund": "POST"
        },
        "title": "Refunding the payment",
        "introduction": "",
        "imagePath": "../../assets/ecom-steps/Step7.svg",
        "descriptions": {
            "/ecomm/v2/payments/{orderId}/refund": "If the customer wants a refund, you’ll have to send a refund request to Vipps. A refund can be either partial or full. You initiate the refund by sending information as serial number, amount and transaction text.",
        },
        "responses": [
            "/ecomm/v2/payments/{orderId}/refund"
        ],
        "keywords": {
        }
    }
];

const eComIntro = {
    "title": "Vipps eCom API",
    "introduction": "Understanding the process of online payments",
    "description": "Before implementing the Vipps eCom API, you’ll need to get keys for testing and production through the developer portal. Look here for how to get started.\n\nAlso, you should know how the payment process works.Underneath is a stepwise description of the payment process, including the customer, the Vipps eCom API and your website.",
    "imgPath": "../../assets/images/womanWithPhone.svg"
};

const eComOutro = {
    "title": "Great! Now you know how the payment process works",
    "description": "You're ready to move forward to the documentation",
    "imgPath": "../../assets/images/jumpingMan.svg"
};

export { eComSections, eComIntro, eComOutro };