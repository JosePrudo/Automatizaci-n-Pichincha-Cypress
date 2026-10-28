/// <reference types="cypress" />

describe('Inicio de sesion de usuario', () => {
  it('Redirigir al usuario no autenticado a la página de inicio de sesión', () => {
    cy.visit('/');
  });
  it('Redirigir a la página de inicio después de iniciar sesión ', () => {
    cy.fixture('Datos').then((Datos) => {
      cy.visit('/signin');
      cy.get('[data-test=signin-username]').type(Datos.usuario);
      cy.get('[data-test=signin-password]').type(Datos.contraseña);
      cy.get('[data-test=signin-submit]').click();
      cy.get('[data-test=sidenav-user-full-name]').should('have.text', Datos.nombre);
    });
  });

  it('Mostrar un error para un usuario no válido', () => {
    cy.fixture('Datos').then((Datos) => {
      cy.visit('/signin');
      cy.get('[data-test=signin-username]').type(Datos.usuarioincorrecto);
      cy.get('[data-test=signin-password]').type(Datos.contraseña);
      cy.get('[data-test=signin-submit]').click();
      cy.contains('Username or password is invalid');
    });
  });

  it('Activar check de "Recordarme"', () => {
    cy.fixture('Datos').then((Datos) => {
      cy.visit('/signin');
      cy.get('[data-test=signin-username]').type(Datos.usuario);
      cy.get('[data-test=signin-password]').type(Datos.contraseña);
      cy.get('input[name=remember]').check();
      cy.get('input[name=remember]').should('be.checked');
      cy.get('[data-test=signin-submit]').click();
    });
  });

  it('Mostrar un error para una contraseña incorrecta con un usuario existente', () => {
    cy.fixture('Datos').then((Datos) => {
      cy.visit('/signin');
      cy.get('[data-test=signin-username]').type(Datos.usuario);
      cy.get('[data-test=signin-password]').type(Datos.contraseñaincorrecta);
      cy.get('[data-test=signin-submit]').click();
      cy.contains('Username or password is invalid');
    });
  });
 // it('Permitir que un visitante se registre, inicie sesión y cierre sesión', () => {
 //   cy.visit('/signin');
 //   cy.get('[data-test=signup]').click();
 //   cy.get('input[id=firstName]').type('Jose');
 //   cy.get('input[id=lastName]').type('Padilla');
 //   cy.get('input[id=username]').type('jose.padilla');
 //   cy.get('input[id=password]').type('s3cret');
 //   cy.get('input[id=confirmPassword]').type('s3cret');
 //  cy.get('[data-test=signup-submit]').click();
 //  cy.get('[data-test=signin-username]').type('jose.padilla');
 //  cy.get('[data-test=signin-password]').type('s3cret');
 //   cy.get('[data-test=signin-submit]').click();
    //cy.get('[data-test=user-onboarding-next]').click();
    //cy.get('input[id=bankaccount-bankName-input]').type('Bancolombia');
    //cy.get('input[id=bankaccount-routingNumber-input]').type('12345678-');
    //cy.get('input[id=bankaccount-accountNumber-input]').type('27251567111');
    //cy.get('[data-test=bankaccount-submit]').click();
    //cy.get('[data-test=user-onboarding-next]').click();
 //   cy.get('[data-test=sidenav-user-full-name]').should('have.text', 'Jose P');
    //cy.get('[data-test=sidenav-user-full-name]').should('have.text', 'Jose Padilla');
    //cy.get('[data-test=signout]').click();
    //cy.location('pathname').should('equal', '/signin');
 //   cy.contains('Logout').click();
  //});
});