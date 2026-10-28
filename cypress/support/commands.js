Cypress.Commands.add('aceptarCookies', () => {
  cy.get('body').then(($body) => {
    const boton = $body.find('button:contains("Aceptar"), button:contains("ACEPTAR")');
    if (boton.length) {
      cy.wrap(boton.first()).click({ force: true });
    }
  });
});
