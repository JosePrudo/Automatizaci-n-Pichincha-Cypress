const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    reportPageTitle: 'Banco Pichincha - Reporte Cypress',
    // Un HTML por ejecución, sin borrar los anteriores.
    overwrite: false,
    reportFilename: 'reporte_[status]_[datetime]',
    timestamp: 'yyyy-mm-dd_HH-MM-ss',
  },
  e2e: {
    baseUrl: 'https://brave-mud-0605ba20f.3.azurestaticapps.net',
    specPattern: 'cypress/e2e/**/*.cy.js',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 1, openMode: 0 },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
