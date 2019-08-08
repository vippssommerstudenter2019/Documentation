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

 
## The components

## Styling

We use CSS classes for more or less all our components, and the stylesheets are located in the folders with the given components. 