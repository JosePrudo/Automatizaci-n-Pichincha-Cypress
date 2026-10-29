Cypress.Commands.add('aceptarCookies', () => {
  cy.get('body').then(($body) => {
    const boton = $body.find('button:contains("Aceptar"), button:contains("ACEPTAR")');
    if (boton.length) {
      cy.wrap(boton.first()).click({ force: true });
    }
  });
});

Cypress.Commands.add('completarPaso1', () => {
  cy.visit('/');
  cy.get('input[id=pareja]').check();
  cy.get('input[id=apartamento]').check();
  cy.get('select:has(option[value="Quito"])').select('Quito');
  cy.contains('button', 'Siguiente').should('be.enabled').click();
});
