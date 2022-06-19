/// <reference types="Cypress" />

describe('My First Test Suite', function () {
  it('My FirstTest case', function () {
    cy.visit(Cypress.env('url') + '/AutomationPractice/')

    // open new page on same tab
    cy.get('#opentab').invoke('removeAttr', 'target').click()
    cy.url().should('include', 'rahulshettyacademy')

    // browser navigation back
    cy.go('back')

    cy.get('#opentab').then(function (el) {
      const url = el.prop('href')
      cy.log(url)
      cy.visit(url)
    })
  })
})
