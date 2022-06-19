/// <reference types="Cypress" />

describe('My First Test Suite', function () {
  it('My FirstTest case', function () {
    cy.visit('https://rahulshettyacademy.com/angularAppdemo')
    cy.intercept(
      {
        method: 'GET',
        url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
      },
      {
        statusCode: 200,
        body: [
          {
            book_name: 'My First Book',
            isbn: 'BDD',
            aisle: '2301',
          },
        ],
      }
    ).as('bookRetrievals')
    cy.get("button[class='btn btn-primary']").click()
    cy.wait('@bookRetrievals').should(({ request, response }) => {
      cy.get('tr').should('have.length', response.body.length + 1)
    })
    cy.get('p').should('have.text', 'Oops only 1 Book available')
  })
})
