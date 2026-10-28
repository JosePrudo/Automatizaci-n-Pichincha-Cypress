describe('Smoke - Aplicación', () => {
  it('redirige a la página de inicio de sesión', () => {
    cy.visit('/');
    cy.location('pathname').should('equal', '/signin');
    cy.get('[data-test=signin-username]').should('be.visible');
  });
});
