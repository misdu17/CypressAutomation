/// <reference types="Cypress" />

describe('My Third Test Suite', function () {
  it('My ThirdTest case', function () {
    cy.visit(Cypress.env('url') + '/AutomationPractice/')
    // Check box example
    cy.get('#checkBoxOption1')
      .check()
      .should('be.checked')
      .and('have.value', 'option1')
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
    cy.get('input[type="checkbox"]').check(['option2', 'option3'])

    // Static Dropdown [Select] example
    cy.get('select').select('option2').should('have.value', 'option2')

    // Dynamic Dropdown example
    cy.get('#autocomplete').type('ind')
    cy.get('.ui-menu-item div').each(($el, index, $list) => {
      if ($el.text() === 'India') {
        $el.trigger('click')
      }
    })
    cy.get('#autocomplete').should('have.value', 'India')

    // Visible and invisible element
    cy.get('#displayed-text').should('be.visible')
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')

    // Radio Button example
    cy.get('[value="radio2"]').click().should('be.checked')
  })
})
