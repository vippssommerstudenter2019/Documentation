const loginSections = `
---
The login process:
    start_authorization:
        title: Start authorization
        introduction: 
        imagePath: ../../assets/ecom-steps/MobileAndBrowser.svg
        endpoints:
            - /oauth2/auth
        descriptions:
            /oauth2/auth: Start authorization against Vipps login.
        modes:
            /oauth2/auth: GET
        responses: true
        keywords:

    access_token:
        title: Get access token
        introduction: 
        imagePath: ../../assets/ecom-steps/Initiate.svg
        endpoints:
            - /oauth2/token
        descriptions:
            /oauth2/token: Retrieves an access token so you can get user information.

        modes:
            /oauth2/token: POST
        responses: true
        keywords:

    user_info:
        title: Get information from the user
        introduction: 
        imagePath: ../../assets/ecom-steps/ConfirmInApp.svg
        endpoints:
            - /userinfo
        descriptions:
            /userinfo: Retrieves the customer information.
        modes:
            /userinfo: GET
        responses: true
        keywords:
`;

const loginIntro = `
---
title: Vipps Login API
introduction: Understanding the process of logging in with Vipps
description: Before implementing the Vipps login API, you’ll need to get keys for testing and production through the developer portal. 
imagePath: "../../assets/images/womanWithPhone.svg"
`;

const loginOutro = `
---
title: Great! Now you know how the payment process works
description: You're ready to move forward to the documentation
imagePath: ../../assets/ecom-illustrations/jumpingMan.svg
link: http://localhost:3000/documentation/secure-login/
`;

export { loginSections, loginIntro, loginOutro};