/// <reference types="Cypress" />

const neatCSV = require('neat-csv')

describe('JWT Session Test Suite', function () {
  it('is logged in through local storage', async function () {
    cy.loginAPI().then(function () {
      cy.visit('https://rahulshettyacademy.com/client', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('token', Cypress.env('token'))
        },
      })
    })
    cy.get('.card-body button:last-of-type').eq(1).click()
    cy.get('[routerlink*="cart"]').click()
    cy.contains('Checkout').click()
    cy.get("[placeholder*='Country']").type('ind')
    cy.get('.ta-results button', { timeout: 3000 }).each(
      ($el, index, $list) => {
        cy.log($el.text())
        if ($el.text().trim() === 'India') {
          cy.wrap($el).click()
        }
      }
    )
    cy.get('.action__submit').click({ force: true })
    cy.wait(2000)
    cy.get('.order-summary button').click()

    cy.readFile(
      Cypress.config('fileServerFolder') +
        '/cypress/downloads/order-invoice_syfulzakia.csv'
    ).then(async (text) => {
      const csv = await neatCSV(text)
      console.log(csv)
    })
  })
})
