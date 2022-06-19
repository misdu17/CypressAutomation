/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('My Iframe Test Suite', function () {
  it('My iFrame Test case', function () {
    cy.visit(Cypress.env('url') + '/AutomationPractice/')
    cy.frameLoaded('#courses-iframe')
    cy.iframe().find("a[href*='mentorship']").eq(0).click()
    cy.wait(2000)
    cy.iframe().find('h1.pricing-title').should('have.length', 2)
  })
})
