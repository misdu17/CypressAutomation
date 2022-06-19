/// <reference types="Cypress" />

describe('API Test Suite', function () {
  it('API case', function () {
    cy.request('POST', 'https://request_url_with_end_point', {
      name: 'Learn Appium Automation with Java',
      isbn: 'ldjfdjf',
      aisle: '34s6',
      author: 'Syful',
    }).then(function (response) {
      expect(response.body).to.have.property('Msg', 'successfully added')
      expect(response.status).to.eq(200)
    })
  })
})
