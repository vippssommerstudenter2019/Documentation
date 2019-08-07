# How it works - Code guide

This guide describes how the code is structured for the «How it works» section of the documentation. There are 4 main aspects:

1. Retrieving content and getting data from the API files 
2. The flow
3. The components
4. Styling

## Retrieving content and getting data from the API files 
All the content for the guides are retrieved from the yaml files inside `src/model`. It also specifies the url for the swagger/openAPI file to get the API data from (read more about how the yaml files are set up in the respective documentation). Extracters for OpenAPI and Swagger files are also located there.  They specify methods to get example data for body, header and responses for a given API. These are used on the page to give real life examples of how e.g. a response might look for a given endpoint.

The content gets loaded in `src/components/howitworks/HowItWorks.js`, which is the start point for the flow. The class takes in an API name and the yaml content URL (this gets passed in from `src/index.js`).  

## The flow

In `HowItWorks.js` we render the intro box, content and the outro box. The intro box includes the main title, a description and a flow chart. The content includes all the steps for the guide and the outro box includes the outro section furthest down on the page.

### Content and step

The content renders all the sections in the yaml files, where each section consist of one of more step. The step (located in `src/howitworks/components/step/Step.js`) renders the bread and butter of the guide. It includes a title, an image, an introduction and a description and a view for the body, header and responses for the given endpoint. Mind that one step can render data for multiple endpoints.

 
## The components

Each component we use is located in the howitworks folder. The components that have got their own styling is located in a folder with their respective names. 

### DataView

In each step there is a data view which renders the body, header and responses. The actual code (in our case JSON) is rendered by the PrismView.

### Responses

In each step there is also a table of responses. Each response is rendered in a response box and grouped together in a response table. 

### Tooltips

We also use tooltips to show popups for certain words in the text. We scan the input text for a word enclosed by brackets, e.g. [access token] and replace it with just «access token» and a tooltip when you hover the word. 


## Styling

We use CSS classes for more or less all our components, and the stylesheets are located in the folders with the given components. 