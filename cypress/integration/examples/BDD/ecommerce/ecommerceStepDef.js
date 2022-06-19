import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
import HomePage from '../../../../support/pages/HomePage'
import ProductPage from '../../../../support/pages/ProductPage'

// cypress run --spec cypress\integration\examples\BDD\*.feature --headed --browser chrome
// npx cypress-tags run -e TAGS="@Smoke" --headed --browser chrome
// add cucumber report options in package.json -> output.json
// use html report plugin /create js file (pass the details of output.json)
// run js file

const homePage = new HomePage()
const productPage = new ProductPage()
let customer

Given('I open ecommerce page', () => {
  cy.visit(Cypress.env('url') + '/angularpractice/')
})

When('I add items to cart', function () {
  homePage.getShopTab().click()
  cy.wait(2000)
  this.data.productName.forEach((element) => {
    cy.selectProduct(element)
  })
  productPage.getCheckoutButton().click()
})

And('Validate the total price', () => {
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
})

Then('select the country submit and verify Thankyou', () => {
  cy.get('#country').type('India')
  cy.get('.suggestions > ul > li > a', { timeout: 10000 }).click()
  cy.get('#checkbox2').click({ force: true })
  cy.get('input[type="submit"]').click()
  cy.get('.alert').then(function (element) {
    const actualText = element.text()
    expect(actualText.includes('Success')).to.be.true
  })
})

When('I fill the form details', function (dataTable) {
  customer = dataTable.rawTable[1][0]
  homePage.getEditBox().type(customer)
  homePage.getGender().select(dataTable.rawTable[1][1])
})

Then('validate the forms behaviour', function () {
  homePage.getTwoWayDataBinding().should('have.value', customer)
  homePage.getEditBox().should('have.attr', 'minlength', '2')
  homePage.getEnterpreneaur().should('be.disabled')
})

And('select the Shop Page', function () {
  homePage.getShopTab().click()
})
