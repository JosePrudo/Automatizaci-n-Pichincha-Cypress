// Pausa antes de cada captura para que la página termine de renderizar.
const STEP_DELAY_MS = 2000;

Cypress.Commands.overwrite('screenshot', (originalFn, subject, ...args) => {
  return cy
    .wait(STEP_DELAY_MS, { log: false })
    .then(() => originalFn(subject, ...args));
});

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

Cypress.Commands.add('completarPaso3', () => {
  cy.completarPaso2();
  cy.get('input[placeholder="Monto total del préstamo"]').clear().type('50000000');
  cy.get('select:has(option[value="30"])').select('20');
  cy.get('input[id=fija]').check();
  cy.contains('button', 'Siguiente').should('be.enabled').click();
});

Cypress.Commands.add('completarPaso4', () => {
  cy.completarPaso3();
  cy.contains('h2', 'Tus resultados').should('be.visible');
  cy.contains('button', 'Siguiente').should('be.enabled').click();
});

Cypress.Commands.add('completarPaso5', () => {
  cy.completarPaso4();
  cy.get('input[placeholder="Nombre completo"]').type('Usuario Prueba');
  cy.get('input[placeholder="Documento de identidad"]').type('1234567890');
  cy.get('input[type="email"]').type('usuario.prueba@ejemplo.com');
  cy.get('input[type="tel"]').type('0991234567');
  cy.get('input[id=authorizeCreditCheck]').check();
  cy.get('input[placeholder="Cargas familiares"]').clear().type('2');
  cy.get('input[placeholder="Compañía de tecnología S.A.S"]').type('Empresa de Prueba S.A.');
  cy.contains('button', 'Siguiente').should('be.enabled').click();
});

Cypress.Commands.add('completarPaso6', () => {
  cy.completarPaso5();
  cy.get('input[name=preferredTime][value="mañana"]').check();
  cy.get('input[name=contactMethod][value="whatsapp"]').check();
  cy.get('input[id=acceptsPrivacyPolicy]').check();
  cy.get('input[id=wantsProductInfo]').check();
  cy.contains('button', 'Siguiente').should('be.enabled').click();
});


