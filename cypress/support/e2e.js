import 'cypress-mochawesome-reporter/register';
import './commands';

// Evita que errores JS de terceros del sitio (analytics, chat, etc.) rompan las pruebas.
Cypress.on('uncaught:exception', () => false);

// En `cypress open`, capturar con 'runner' evita que Cypress oculte el Command Log en cada cy.screenshot().
if (Cypress.config('isInteractive')) {
  Cypress.Screenshot.defaults({ capture: 'runner' });
}
