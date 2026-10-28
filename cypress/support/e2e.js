import 'cypress-mochawesome-reporter/register';
import './commands';

// Evita que errores JS de terceros del sitio (analytics, chat, etc.) rompan las pruebas.
Cypress.on('uncaught:exception', () => false);
