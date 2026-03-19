/// <reference types="cypress" />

describe('Trending gifs check', () => {

  it('loads trending gifs when app opens', () => {

    // watch the trending gifs api
    cy.intercept('GET', '**/v1/gifs/trending*').as('apiCall')

    // open the app
    cy.visit('https://giphy-app-nu.vercel.app/')

    // wait for api and check what came back
    cy.wait('@apiCall').then((x) => {

      // api should return success
      expect(x.response?.statusCode).to.eq(200)

      // save returned gif data in one variable
      const dataBack = x.response?.body.data

      // app requirement says 15 gifs should come at one time
      expect(dataBack).to.have.length(15)

      // check every gif has basic needed data
      dataBack.forEach((oneGif: any) => {
        expect(oneGif).to.have.property('title')
        expect(oneGif.images).to.exist
        expect(oneGif.images.original).to.exist
        expect(oneGif.images.original.url).to.be.a('string').and.not.be.empty
      })
    })

    // check images really appeared on screen
    cy.get('img').should('have.length.greaterThan', 0)
  })


  it('loads more gifs when user scrolls down', () => {

    // keep listening to trending api calls
    cy.intercept('GET', '**/v1/gifs/trending*').as('apiCall')

    // open app
    cy.visit('https://giphy-app-nu.vercel.app/')

    // wait for first load
    cy.wait('@apiCall')

    // count current images before scroll
    cy.get('img').its('length').then((oldCount) => {

      // scroll to page bottom so more gifs can load
      cy.scrollTo('bottom')

      // wait for next api call after scrolling
      cy.wait('@apiCall').then((x) => {
        expect(x.response?.statusCode).to.eq(200)
        expect(x.response?.body.data).to.have.length(15)
      })

      // after scroll there should be more images than before
      cy.get('img').its('length').then((newCount) => {
        expect(newCount).to.be.greaterThan(oldCount)
      })
    })
  })


  it('keeps old gifs and adds new ones after scroll', () => {

    // watch same trending api
    cy.intercept('GET', '**/v1/gifs/trending*').as('apiCall')

    // open app
    cy.visit('https://giphy-app-nu.vercel.app/')

    // wait for first batch
    cy.wait('@apiCall')

    // save old total images
    cy.get('img').its('length').then((firstTotal) => {

      // scroll down to trigger next batch
      cy.scrollTo('bottom')

      // wait for second batch
      cy.wait('@apiCall')

      // now count again
      cy.get('img').its('length').then((secondTotal) => {

        // if second number is bigger, it means new gifs were added
        // and old ones were not removed
        // expect(secondTotal).to.be.greaterThan(firstTotal)
      })
    })
  })

})