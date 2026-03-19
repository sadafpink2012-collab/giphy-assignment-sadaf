Giphy App – Cypress Testing

This project contains automated tests written for the Giphy React application using Cypress with TypeScript.

The goal of these tests is to check that the main features of the application work correctly from a user perspective.

The tests mainly focus on two important features:

Loading Trending GIFs

Searching GIFs using the search box

Tools Used

The following tools were used to create the tests:

Cypress (End-to-End testing)

TypeScript

Node.js / npm

How To Run The Tests

Install project dependencies:

npm install

Open Cypress test runner:

npx cypress open

Select the test file from the Cypress window:

gifExplorer.cy.ts

Cypress will automatically open the browser and execute the tests.

Feature 1 – Trending GIFs

This test checks the Trending GIF functionality of the application.

What the test verifies

The application loads successfully.

The trending GIF API is called.

The API response returns 15 GIFs.

Each GIF contains:

a title

a valid image URL.

GIF images are displayed on the screen.

When the user scrolls down:

the app loads more GIFs.

new GIFs are added to the existing list.

This ensures that the infinite scrolling feature works correctly.

Feature 2 – Search GIFs

This test checks the search functionality.

What the test verifies

The user can type a word in the search box.

Pressing Enter triggers the search.

The search API is called.

The API request contains the correct search keyword.

The API returns 15 GIFs.

Each GIF has a title and valid image URL.

The GIFs appear on the page.

Scroll Test

The test also verifies that:

When the user scrolls down after searching,

the application loads more search results.

This confirms that infinite scrolling also works for search results.

Assumptions

The following assumptions were made while writing the tests:

The application loads 15 GIFs per request.

The search action is triggered by pressing Enter in the search input.

The API endpoints used are:

/v1/gifs/trending

/v1/gifs/search

Test File Structure
cypress/
  e2e/
    gifExplorer.cy.ts

This file contains all test cases for the features described above.
Notes

These tests are written to simulate how a real user interacts with the application, such as:

opening the page

searching for GIFs

scrolling through results

The goal is to verify that both the API responses and the user interface behave correctly.