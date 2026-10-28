class HomePage {
  visitar() {
    cy.visit('/');
    cy.aceptarCookies();
  }

  get header() {
    return cy.get('header');
  }

  get logo() {
    return cy.get('header img, header svg').first();
  }
}

export default new HomePage();
