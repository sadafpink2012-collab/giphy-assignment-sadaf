/// <reference types="cypress" />

describe('Feature 2 - Search gifs', () => {

  it('user can search gifs and see results', () => {

    // listen to the search API call
    cy.intercept('GET', '**/v1/gifs/search*').as('searchApi')

    // open the gif application
    cy.visit('https://giphy-app-nu.vercel.app/')

    // find the search input box
    // type a word and press Enter to start search
    cy.get('input')
      .first()
      .should('be.visible')
      .clear()
      .type('lizard{enter}')

    // wait until API response comes back
    cy.wait('@searchApi').then((apiData) => {

      // check API response is successful
      expect(apiData.response?.statusCode).to.eq(200)

      // confirm the search word was sent in the request
      expect(apiData.request.url).to.include('q=lizard')

      // store returned gifs in a variable
      const gifs = apiData.response?.body.data

      // API should return 15 gifs
      expect(gifs).to.have.length(15)

      // check each gif has basic data
      gifs.forEach((gif: any) => {
        expect(gif).to.have.property('title')
        expect(gif.images.original.url).to.be.a('string').and.not.be.empty
      })
    })

    // verify gifs are displayed on the page
    cy.get('img').should('have.length.greaterThan', 0)
  })


  it('loads more search results when user scrolls down', () => {

    // listen again for search API calls
    cy.intercept('GET', '**/v1/gifs/search*').as('searchApi')

    // open the application
    cy.visit('https://giphy-app-nu.vercel.app/')

    // perform a search
    cy.get('input').first().clear().type('funny{enter}')

    // wait for first results
    cy.wait('@searchApi')

    // count how many gifs are on screen before scrolling
    cy.get('img').its('length').then((oldCount) => {

      // scroll to bottom of page
      cy.scrollTo('bottom')

      // wait for next API request
      cy.wait('@searchApi')

      // after scrolling, more gifs should appear
      cy.get('img').its('length').then((newCount) => {
        expect(newCount).to.be.greaterThan(oldCount)
      })
    })
  })

})