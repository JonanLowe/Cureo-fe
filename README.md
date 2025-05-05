# Cureo

Dear Reader,

This project allows the user to search, browse and create collections of items from museums across Europe.

It is linked to two museum group APIs - The Science Museum Group, and Europeana, and a user API made with MongoDB.

This front end was built with React, Vite, Javascript and CSS.

## Visiting the site:

Please visit:



If you wish to clone and access this repo:

### How to Clone:

Use the terminal to navigate to your chosen directory and enter:

    git clone https://github.com/JonanLowe/nc-news-jl

### Installing Dependencies:

To install all required dependencies, enter:

    npm i

### Accessing Europeana API

You will need to apply for an API key from Europeana via their website

Create a file titled ".env" in your root directory

In this file, write:

    VITE_EUROPEANA_KEY=
    followed by the api key you receive from Europeana in quotation marks:
    VITE_EUROPEANA_KEY="yourAPIkey"

This will allow requests to the Europeana API for use in this app.

### running on localhost:

To run the file from the terminal, navigate to the root directory and eter:
    npm run dev

---

This portfolio project was created as part of the LaunchPad project from [Northcoders](https://northcoders.com/)
