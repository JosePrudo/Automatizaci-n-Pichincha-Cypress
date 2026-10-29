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

Cypress.Commands.add('completarPaso2', () => {
  cy.completarPaso1();
  cy.get('input[id=empleado]').check();
  cy.get('input[placeholder="Ingresos netos"]').type('500000');
  cy.get('input[placeholder="Total ahorrado"]').type('1000000');
  cy.get('input[type="date"]').type('1987-03-08');
  cy.get('select:has(option[value="casado"])').select('casado');
  cy.contains('button', 'Siguiente').should('be.enabled').click();
});


