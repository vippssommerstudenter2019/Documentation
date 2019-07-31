const vippsorange = "#ff5b24";
const vippspurple = "#4d3280";
const vippsblue = "#59cbe8";
const lightgrey = "#f6f6f9";
const vippsgray = "#938FA8";
const vippsblack = "#484848";

export default {
    "code[class*=\"language-\"]": {
      "color": vippsgray,
      "background": "none",
      "fontFamily": "'PT Mono', monospace",
      "textAlign": "left",
      "whiteSpace": "pre",
      "wordSpacing": "normal",
      "wordBreak": "normal",
      "wordWrap": "normal",
      "MozTabSize": "4",
      "OTabSize": "4",
      "tabSize": "4",
      "WebkitHyphens": "none",
      "MozHyphens": "none",
      "msHyphens": "none",
      "hyphens": "none",
      "margin": "0px 0px 25px 25px",
    },
    "pre[class*=\"language-\"]": {
      "color": vippsgray,
      "background": "none",
      "fontFamily": "'PT Mono', monospace",
      "textAlign": "left",
      "whiteSpace": "pre",
      "wordSpacing": "normal",
      "wordBreak": "normal",
      "wordWrap": "normal",
      "MozTabSize": "4",
      "OTabSize": "4",
      "tabSize": "4",
      "WebkitHyphens": "none",
      "MozHyphens": "none",
      "msHyphens": "none",
      "hyphens": "none",
      "position": "relative",
      "overflow": "auto",
      "padding": "0",
      "backgroundColor": lightgrey,
      "WebkitBoxSizing": "border-box",
      "MozBoxSizing": "border-box",
      "boxSizing": "border-box",
      "border-radius": "0px 0px 20px 20px"

    },
    "pre[class*=\"language-\"]>code": {
      "position": "relative",
      "borderLeft": "10px solid #358ccb",
      "boxShadow": "-1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf",
      "backgroundColor": lightgrey,
      "backgroundImage": "linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%)",
      "backgroundSize": "3em 3em",
      "backgroundOrigin": "content-box",
      "backgroundAttachment": "local"
    },
    "code[class*=\"language\"]": {
      "maxHeight": "inherit",
      "height": "inherit",
      "padding": "0 1em",
      "display": "block",
      "overflow": "auto"
    },
    ":not(pre) > code[class*=\"language-\"]": {
      "backgroundColor": lightgrey,
      "WebkitBoxSizing": "border-box",
      "MozBoxSizing": "border-box",
      "boxSizing": "border-box",
      "marginBottom": "1em",
      "position": "relative",
      "padding": ".2em",
      "borderRadius": "0.3em",
      "color": vippspurple,
      "border": "1px solid rgba(0, 0, 0, 0.1)",
      "display": "inline",
      "whiteSpace": "normal"
    },
    "pre[class*=\"language-\"]:before": {
      "content": "''",
      "zIndex": "-2",
      "display": "block",
      "position": "absolute",
      "bottom": "0.75em",
      "left": "0.18em",
      "width": "40%",
      "height": "20%",
      "maxHeight": "13em",
      "boxShadow": "0px 13px 8px #979797",
      "WebkitTransform": "rotate(-2deg)",
      "MozTransform": "rotate(-2deg)",
      "msTransform": "rotate(-2deg)",
      "OTransform": "rotate(-2deg)",
      "transform": "rotate(-2deg)"
    },
    "pre[class*=\"language-\"]:after": {
      "content": "''",
      "zIndex": "-2",
      "display": "block",
      "position": "absolute",
      "bottom": "0.75em",
      "left": "auto",
      "width": "40%",
      "height": "20%",
      "maxHeight": "13em",
      "boxShadow": "0px 13px 8px #979797",
      "WebkitTransform": "rotate(2deg)",
      "MozTransform": "rotate(2deg)",
      "msTransform": "rotate(2deg)",
      "OTransform": "rotate(2deg)",
      "transform": "rotate(2deg)",
      "right": "0.75em"
    },
    ":not(pre) > code[class*=\"language-\"]:after": {
      "right": "0.75em",
      "left": "auto",
      "WebkitTransform": "rotate(2deg)",
      "MozTransform": "rotate(2deg)",
      "msTransform": "rotate(2deg)",
      "OTransform": "rotate(2deg)",
      "transform": "rotate(2deg)"
    },
    "comment": {
      "color": "#7D8B99"
    },
    "block-comment": {
      "color": "#7D8B99"
    },
    "prolog": {
      "color": "#7D8B99"
    },
    "doctype": {
      "color": "#7D8B99"
    },
    "cdata": {
      "color": "#7D8B99"
    },
    "punctuation": {
      "color": vippsblack
    },
    "property": {
      "color": vippspurple
    },
    "tag": {
      "color": vippspurple
    },
    "boolean": {
      "color": vippspurple
    },
    "number": {
      "color": vippspurple
    },
    "function-name": {
      "color": vippspurple
    },
    "constant": {
      "color": vippspurple
    },
    "symbol": {
      "color": vippspurple
    },
    "deleted": {
      "color": vippspurple
    },
    "selector": {
      "color": vippsblue
    },
    "attr-name": {
      "color": vippsblue
    },
    "string": {
      "color": vippsblue
    },
    "char": {
      "color": vippsblue
    },
    "function": {
      "color": vippsblue
    },
    "builtin": {
      "color": vippsblue
    },
    "inserted": {
      "color": vippsblue
    },
    "operator": {
      "color": vippsblack,
      // "background": "rgba(255, 255, 255, 0.5)"
    },
    "entity": {
      "color": vippsblack,
      // "background": "rgba(255, 255, 255, 0.5)",
      "cursor": "help"
    },
    "url": {
      "color": vippsblack,
      // "background": "rgba(255, 255, 255, 0.5)"
    },
    "variable": {
      "color": vippsblack,
      // "background": "rgba(255, 255, 255, 0.5)"
    },
    "atrule": {
      "color": vippsorange
    },
    "attr-value": {
      "color": vippsorange
    },
    "keyword": {
      "color": vippsorange
    },
    "class-name": {
      "color": vippsorange
    },
    "regex": {
      "color": vippsorange
    },
    "important": {
      "color": vippsorange,
      "fontWeight": "normal"
    },
    ".language-css .token.string": {
      "color": vippsblack,
      // "background": "rgba(255, 255, 255, 0.5)"
    },
    ".style .token.string": {
      "color": vippsblack,
      // "background": "rgba(255, 255, 255, 0.5)"
    },
    "bold": {
      "fontWeight": "bold"
    },
    "italic": {
      "fontStyle": "italic"
    },
    ".namespace": {
      "Opacity": ".7"
    },
    "tab:not(:empty):before": {
      "color": "#e0d7d1"
    },
    "cr:before": {
      "color": "#e0d7d1"
    },
    "lf:before": {
      "color": "#e0d7d1"
    },
    "pre[class*=\"language-\"].line-numbers.line-numbers": {
      "paddingLeft": "0"
    },
    "pre[class*=\"language-\"].line-numbers.line-numbers code": {
      "paddingLeft": "3.8em"
    },
    "pre[class*=\"language-\"].line-numbers.line-numbers .line-numbers-rows": {
      "left": "0"
    },
    "pre[class*=\"language-\"][data-line]": {
      "paddingTop": "0",
      "paddingBottom": "0",
      "paddingLeft": "0"
    },
    "pre[data-line] code": {
      "position": "relative",
      "paddingLeft": "4em"
    },
    "pre .line-highlight": {
      "marginTop": "0"
    }
  };