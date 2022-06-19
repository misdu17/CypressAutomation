/// <reference types="Cypress" />

describe('My First Test Suite', function () {
  it('My FirstTest case', function () {
    cy.visit(Cypress.env('url') + '/AutomationPractice/')
    // cy.get('div.mouse-hover-content').invoke('show')
    // cy.contains('Top').click()

    // click on the hidden element by force
    cy.contains('Top').click({ force: true })
    cy.url().should('include', 'top')
  })
})
