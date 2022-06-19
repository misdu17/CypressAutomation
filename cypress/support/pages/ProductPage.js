class ProductPage {
  getCheckoutButton() {
    return cy.get('.nav-link.btn.btn-primary')
  }
}

export default ProductPage
