import homePage from '../../pages/HomePage';

describe('Smoke - Home Banco Pichincha', () => {
  beforeEach(() => {
    homePage.visitar();
  });

  it('carga la página principal', () => {
    cy.url().should('include', 'pichincha.com');
    cy.title().should('match', /pichincha/i);
  });

  it('muestra el encabezado con el logo', () => {
    homePage.header.should('be.visible');
    homePage.logo.should('be.visible');
  });
});
