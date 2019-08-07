


## This file will cover the contents of the 'API_model.yaml' files.

# The content is made up by 5 key elements:
	- SwaggerURL	: This is the link to the respective API Swagger json
	- Intro			: This is a short introduction
	- Flowchart		: This can display a flowchart (or another useful image), but it is optional.
	- Sections		: This is the main contents of the page
	- Outro			: This is more of a 'clap on the back' to the reader, and will link them over to the full Documentation.
	
	
# SwaggerURL
	It is not optional (as of now), and needs to link to the Swagger JSON.
	

# Intro
	Non optional, but is should be quite short.
	Contains:
		- title				: The name of the API
		- introduction		: Present what they are about to read. [Understanding how the process of -API- works]
		- description		: Should mention if the API has some prerequisites. [API keys or testing environment]
		- descriptiontwo	: Optional, additional paragraph
		- imagePath			: Optional, image / illustration
		
# Flowchart
	Optional, but if provided can give the reader a quick and useful overview of the entire process.
	Contains:
		- title			: Title of the chart. [Steps to implement API]
		- browserImage	: Image to be displayed on browser.
		- tabletImage	: -- || -- tablet.
		- mobileImage	: -- || -- mobile.
		
	Note: If one, or more, of the images are lacking, we will select between the remaining.


# Sections
	Non optional, as this is the main contents of the site.
	It can contain multiple sections, with multiple subsections subsections.
	The names on the sections will also be the name on the website, and in the sidebar.
	
# Subsections
	Theese are listed directly inside of their respective Section.
	The name of a Subsection will -not- be the name on the website, or in the sidebar.
	Contains:
		- title			: The subsection title
		- introduction	: The optional introduction of the coming endpoint(s)
		- endpoints		: The optional list of formatted endpoint(s)
		- keywords		: The optional list of keyword(s) that will create hover-cards.
		- imagePath		: An optional link to an image / illustration.
		
	Notes: 
		- Words / phrases in the introduction encapsulated in [brackets] will be replaced by the keyword function.
		- A meta-step (a step only referencing process, with no endpoints) can be created by leaving enpoints empty
		- A single endpoint, might not need the introduction, therefore the introduction is also optional.
		- The imagePath, is ment to have a small illustration / icon to the left of the subsection title.
		
# Endpoint
	This is usually references to endpoints in the Swagger file.
	From the Swagger the endpoint will try to get the Header, Body and Responses,
	and display them if found.
	But they also have an option to list some custom fields as well, with a custom title.
	Contains:
		- name			: The name of the endpoint in the swagger file. F.ex: "/path/endpoint"
		- mode			: The mode of the endpoint in the swagger file. [GET, PUT, POST, ...]
		- description	: A description of the endpoint or which actions that is relevant.
		- extras		: An optional list of extra things to display.
		
	Notes:
		- Extras should not really be needed if the swagger file is good enought,
		 but in some cases there will be some extra information that would be nice to display.
		 Only use this option if there is no better way.
		 Contains:
			- name : The name of the code block
			- code : The actual code. (Use the yaml syntax that preserve formatting: "code: |")
		
		- The [keywords] will also process the endpoint description.									

# Keywords
	This is used to create boxes under selected words when they are hovered over.
	It is a powerfull tool to allow developers with a lot of understanding to ignore them,
	and explain (and maybe link to more resources) certain keywords / keyphrases to the 
	developers with less knowledge about the field/process.
	SO:
		The keywords work by parsing the subsection introduction and the endpoint(s) description(s)
		for [words] or [multi word phrases] encapsulated in [brackets] and will remove the brackets 
		on the website, but will put the respective popups below them:
			words: {the [words] popup}
			multi word phrases: {the [multi words phrases] popup}
			brackets: {the [brackets] popup}
			
	Important:
		If there exsist a "[bracketed]" word that does not exsist as a keyword, the site will currently crash.
		
	Contains:
		- title			: The title of the popup.
		- description	: The description / explanation of the element / phrase.
		- linkTitle		: An, optional Title of the optional link.
		- link			: Requires linkTitle, use to link to documentation / other resources.
	
	Note: If you are stuck at creating a titles use simple questions or leading questions.
	
# -- DONE with Sections --

# Outro
	This element is the 'finish line' of the website.
	The last ting after this entire guide.
	It should link to the full documentation.
	Contains:
		- title			: Something on completing the guide. "Great! Now you know how the -API- works!"
		- description	: Guiding them on their way. "You're now ready to move forward to the documentation."
		- imagePath		: Link to generic image, thypically the "jumpiong_man" svg.
		- link			: Link to the relevant documentation page for the API.


# That's it
	This is currently everything that is possible in the .yaml files.
	But there is some tips / tricks to get you rolling quickly as well:
	
	1. Comments
		Yaml only supports single line comments:
		
		# This would be a yaml comment
	
	2. Escaped text
		You dont want you descriptions or other text fields to be parsed as pure yaml always,
		so there is a few different ways to escape text in .yaml files:
		
		text: This is allowed but colons and other yaml syntax will cause problems.
		
		text: "This entire sentence is esaped."
		
		text: >
			This block of text
			is escaped but will 
			not keep newlines.
			# And, comments will be included in the text
		
		text: |
			This block of text
			will keep it's formatting
			with newlines.
			# and comments will be included in the text
	
	3. Lists
		As lists are used for 'endpoints:' (and 'extras:') here is an example:
		
		endpoints: # this is the name of the list
			- name: "endpoint-1 name" # the '-' prefix is a list entry
			  mode: GET
			  description: >
				Endpoint-1 description
			
			- name: "endpoint-2 name" # multiple entries in the list 
			  mode: POST
			  description: >
				Endpoint-2 description
				
	
	