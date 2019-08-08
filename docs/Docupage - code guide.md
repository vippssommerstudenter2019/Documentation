# Docupage - Code guide

This guide describes how the code is structured for the «documentation» section of the documentation. There are 4 main aspects:

1. Retrieving content and getting data from the API files 
2. The flow
3. The components
4. Styling

## Retrieving content and getting data from the API files 



## The flow

Inside docupage.js we render both the loading screen and the documentation screen. The documentation screen consists of the sidebar, the developer resourses part, and the markdown file from github. The react markdown element has four renderers: CodeBlockRenderer, InlineCodeRenderer, HeadingRenderer and TableRenderer. Each of these has their own .js file.
 
## The components


## Styling

We use CSS classes for more or less all our components, and the stylesheets are located in the folders with the given components. 