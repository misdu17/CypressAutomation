/// <reference types="Cypress" />

describe('My First Test Suite', function () {
  it('My FirstTest case', function () {
    cy.visit(Cypress.env('url') + '/seleniumPractise/#/')
    cy.get('.search-keyword').type('ca')
    cy.wait(2000)
    cy.get('.product').should('have.length', 5)
    cy.get('.product:visible').should('have.length', 4)

    cy.get('.products').as('productLocator')
    cy.get('@productLocator').find('.product').should('have.length', 4)
    cy.get('@productLocator')
      .find('.product')
      .eq(2)
      .contains('ADD TO CART')
      .click()
      .then(function () {
        console.log('Md Jamaddar')
      })
    cy.get('@productLocator')
      .find('.product')
      .each(($e1, index, $list) => {
        const vegiText = $e1.find('h4.product-name').text()
        if (vegiText.includes('Cashews')) {
          cy.wrap($e1).find('button').click()
        }
      })

    cy.get('.brand').should('have.text', 'GREENKART')

    // this is to print in logs
    cy.get('.brand').then(function (logoElement) {
      cy.log(logoElement.text())
    })
  })
})
