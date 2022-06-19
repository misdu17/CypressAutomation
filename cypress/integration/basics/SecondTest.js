/// <reference types="Cypress" />

describe('My Second Test Suite', function () {
  it('My SecondTest case', function () {
    cy.visit(Cypress.env('url') + '/seleniumPractise/#/')
    cy.get('.search-keyword').type('ca')
    cy.wait(2000)

    cy.get('.products').as('productLocator')
    cy.get('@productLocator')
      .find('.product')
      .eq(2)
      .contains('ADD TO CART')
      .click()

    cy.get('@productLocator')
      .find('.product')
      .each(($e1, index, $list) => {
        const vegiText = $e1.find('h4.product-name').text()
        if (vegiText.includes('Cashews')) {
          cy.wrap($e1).find('button').click()
        }
      })
    cy.get('.cart-icon > img').click()
    cy.contains('PROCEED TO CHECKOUT').click()
    cy.contains('Place Order').click()
  })
})
