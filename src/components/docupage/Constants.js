const SOURCE_URLS = {
    ecom:
      "https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/vipps-ecom-api.md",
    login:
      "https://raw.githubusercontent.com/vippsas/vipps-login-api/master/vipps-login-api.md",
    invoice:
      "https://raw.githubusercontent.com/vippsas/vipps-invoice-api/master/vipps-invoice-api.md"
  };

const DEV_URLS = {
    ecom: [
      [
        "Postman",
        "https://github.com/vippsas/vipps-ecom-api/tree/master/tools"
      ],
      [
        "FAQ",
        "https://github.com/vippsas/vipps-ecom-api/blob/master/vipps-ecom-api-faq.md"
      ],
      ["Swagger", "https://vippsas.github.io/vipps-ecom-api/"]
    ],
    login: [
      [
        "Postman",
        "https://github.com/vippsas/vipps-login-api/tree/master/tools"
      ],
      ["FAQ", "#faq"],
      ["Swagger", "https://vippsas.github.io/vipps-login-api/"]
    ],
    invoice: [
      [
        "Postman",
        "https://github.com/vippsas/vipps-invoice-api/tree/master/tools"
      ],
      ["FAQ", "#faq"],
      ["Swagger ISP", "https://vippsas.github.io/vipps-invoice-api/isp.html"],
      ["Swagger IPP", "https://vippsas.github.io/vipps-invoice-api/ipp.html"]
    ]
  };

const PAGE_TITLES = {
    ecom: "Vipps eCommerce API",
    login: "Vipps Login API",
    invoice: "Vipps Invoice API"
  };


// Because of design issues, we add our own header and subheaders to the sidebar
const DEV_SIDEBAR_HEADER = (children) => ({
    name: "Developer resources",
    anchor: "#developer-resources",
    children: children
});

export {
    SOURCE_URLS,
    DEV_URLS,
    PAGE_TITLES,
    DEV_SIDEBAR_HEADER
}