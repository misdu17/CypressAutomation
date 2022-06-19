/// <reference types="Cypress" />
import HomePage from '../../support/pages/HomePage'
import ProductPage from '../../support/pages/ProductPage'

describe('My First Test Suite', function () {
  before(function () {
    cy.fixture('example').then(function (data) {
      this.data = data
    })
  })

  it('My FirstTest case', function () {
    const homePage = new HomePage()
    const productPage = new ProductPage()
    cy.visit(Cypress.env('url') + '/angularpractice/')
    homePage.getEditBox().type(this.data.name)
    homePage.getGender().select(this.data.gender)
    homePage.getTwoWayDataBinding().should('have.value', this.data.name)
    homePage.getEditBox().should('have.attr', 'minlength', '2')
    homePage.getEnterpreneaur().should('be.disabled')
    homePage.getShopTab().click()
    cy.wait(2000)
    this.data.productName.forEach((element) => {
      cy.selectProduct(element)
    })
    productPage.getCheckoutButton().click()
    let sum = 0
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
      const actualText = $el.text()
      let res = actualText.split(' ')[1].trim()
      sum = sum + parseInt(res)
    })
    cy.get('h3 strong').then(function (element) {
      let total = parseInt(element.text().split(' ')[1].trim())
      expect(sum).to.equal(total)
    })
    cy.contains('Checkout').click()
    cy.get('#country').type('India')
    cy.get('.suggestions > ul > li > a', { timeout: 10000 }).click()
    cy.get('#checkbox2').click({ force: true })
    cy.get('input[type="submit"]').click()
    // cy.get('.alert').should('have.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')
    cy.get('.alert').then(function (element) {
      const actualText = element.text()
      expect(actualText.includes('Success')).to.be.true
    })
  })
})
