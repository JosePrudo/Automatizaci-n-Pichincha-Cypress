/// <reference types="cypress" />

// Las pruebas comparten la página: el formulario se llena paso a paso.
describe('Simulación de crédito hipotecario', { testIsolation: false }, () => {
  describe('Sección 1 - Proyecto', () => {
    it('Abrir el simulador', () => {
      cy.visit('/');
      cy.screenshot();
    });

    it('Seleccionar check pareja', () => {
      cy.get('input[id=pareja]').check();
      cy.get('input[id=pareja]').should('be.checked');
      cy.screenshot();
    });

    it('Seleccionar check tipo de vivienda', () => {
      cy.get('input[id=apartamento]').check();
      cy.get('input[id=apartamento]').should('be.checked');
      cy.screenshot();
    });

    it('Seleccionar ciudad', () => {
      cy.get('select:has(option[value="Quito"])')
        .select('Quito')
        .should('have.value', 'Quito');
      cy.screenshot();
    });

    it('Escoger rango', () => {
      cy.get('input[type="range"][min="50000"][max="1000000"]').as('sliders');

      // mínimo (el slider máximo lo tapa, por eso force)
      cy.get('@sliders').eq(0)
        .invoke('val', 50000)
        .trigger('input', { force: true })
        .trigger('change', { force: true });

      // máximo
      cy.get('@sliders').eq(1)
        .invoke('val', 1000000)
        .trigger('input', { force: true })
        .trigger('change', { force: true });

      cy.get('@sliders').eq(0).should('have.value', '50000');
      cy.get('@sliders').eq(1).should('have.value', '1000000');
      cy.screenshot();
    });

    it('Click en Siguiente', () => {
      cy.contains('button', 'Siguiente').should('be.enabled').click();
      cy.screenshot();
    });
  });

  // El estado del formulario vive en memoria: cada sección rehace las anteriores.
  describe('Sección 2 - Finanzas', () => {
    before(() => {
      cy.completarPaso1();
    });

    it('Seleccionar situación laboral', () => {
      cy.get('input[id=empleado]').check();
      cy.get('input[id=empleado]').should('be.checked');
      cy.screenshot();
    });

    it('Ingresar ganancias despues de impuestos', () => {
      cy.get('input[placeholder="Ingresos netos"]').clear().type('500000');
      cy.get('input[placeholder="Ingresos netos"]').should('have.value', '500000');
      cy.screenshot();
    });

    it('Ahorro cuota inicial', () => {
      cy.get('input[placeholder="Total ahorrado"]').clear().type('1000000');
      cy.get('input[placeholder="Total ahorrado"]').should('have.value', '1000000');
      cy.screenshot();
    });

    it('Seleccionar fecha de nacimiento', () => {
      cy.get('input[type="date"]')
        .clear()
        .type('1987-03-08')
        .should('have.value', '1987-03-08');
      cy.screenshot();
    });

    it('Seleccionar estado civil', () => {
      cy.get('select:has(option[value="casado"])')
        .select('casado')
        .should('have.value', 'casado');
      cy.screenshot();
    });

    it('Click en Siguiente', () => {
      cy.contains('button', 'Siguiente').should('be.enabled').click();
      cy.screenshot();
    });
  });

  describe('Sección 3 - Personaliza tu crédito', () => {
    before(() => {
      cy.completarPaso2();
    });

    it('Ingresar monto del préstamo', () => {
      cy.get('input[placeholder="Monto total del préstamo"]').clear().type('50000000');
      cy.get('input[placeholder="Monto total del préstamo"]').should('have.value', '50000000');
      cy.screenshot();
    });

    it('Seleccionar plazo en años', () => {
      cy.get('select:has(option[value="30"])')
        .select('20')
        .should('have.value', '20');
      cy.screenshot();
    });

    it('Seleccionar tipo de cuota', () => {
      cy.get('input[id=fija]').check();
      cy.get('input[id=fija]').should('be.checked');
      cy.screenshot();
    });

    it('Click en Siguiente', () => {
      cy.contains('button', 'Siguiente').should('be.enabled').click();
      cy.screenshot();
    });
  });

  describe('Sección 4 - Tus resultados', () => {
    before(() => {
      cy.completarPaso3();
    });

    it('Mostrar la sección de resultados', () => {
      cy.contains('h2', 'Tus resultados').should('be.visible');
      cy.contains('Aquí ve su cuota y los seguros').should('be.visible');
      cy.screenshot();
    });

    it('Click en Siguiente', () => {
      cy.contains('button', 'Siguiente').should('be.enabled').click();
      cy.screenshot();
    });
  });

  describe('Sección 5 - Tu capacidad real', () => {
    before(() => {
      cy.completarPaso4();
    });

    it('Mostrar la sección de capacidad real', () => {
      cy.contains('h2', 'Tu capacidad real').should('be.visible');
      cy.screenshot();
    });

    it('Ingresar nombre completo', () => {
      cy.get('input[placeholder="Nombre completo"]').clear().type('Usuario Prueba');
      cy.get('input[placeholder="Nombre completo"]').should('have.value', 'Usuario Prueba');
      cy.screenshot();
    });

    it('Ingresar cédula', () => {
      cy.get('input[placeholder="Documento de identidad"]').clear().type('1234567890');
      cy.get('input[placeholder="Documento de identidad"]').should('have.value', '1234567890');
      cy.screenshot();
    });

    it('Ingresar correo electrónico', () => {
      cy.get('input[type="email"]').clear().type('usuario.prueba@ejemplo.com');
      cy.get('input[type="email"]').should('have.value', 'usuario.prueba@ejemplo.com');
      cy.screenshot();
    });

    it('Ingresar teléfono celular', () => {
      cy.get('input[type="tel"]').clear().type('0991234567');
      cy.get('input[type="tel"]').should('have.value', '0991234567');
      cy.screenshot();
    });

    it('Autorizar consulta de historial crediticio', () => {
      cy.get('input[id=authorizeCreditCheck]').check();
      cy.get('input[id=authorizeCreditCheck]').should('be.checked');
      cy.screenshot();
    });

    it('Ingresar cargas familiares', () => {
      cy.get('input[placeholder="Cargas familiares"]').clear().type('2');
      cy.get('input[placeholder="Cargas familiares"]').should('have.value', '2');
      cy.screenshot();
    });

    it('Ingresar lugar de trabajo', () => {
      cy.get('input[placeholder="Compañía de tecnología S.A.S"]').clear().type('Empresa de Prueba S.A.');
      cy.get('input[placeholder="Compañía de tecnología S.A.S"]').should('have.value', 'Empresa de Prueba S.A.');
      cy.screenshot();
    });

    it('Click en Siguiente', () => {
      cy.contains('button', 'Siguiente').should('be.enabled').click();
      cy.screenshot();
    });
  });

  describe('Sección 6 - Quiero que me Contacten', () => {
    before(() => {
      cy.completarPaso5();
    });

    it('Mostrar la sección de contacto', () => {
      cy.contains('h2', 'Quiero que me Contacten').should('be.visible');
      cy.screenshot();
    });

    it('Seleccionar horario de llamada', () => {
      cy.get('input[name=preferredTime][value="mañana"]').check();
      cy.get('input[name=preferredTime][value="mañana"]').should('be.checked');
      cy.screenshot();
    });

    it('Seleccionar medio de contacto', () => {
      cy.get('input[name=contactMethod][value="whatsapp"]').check();
      cy.get('input[name=contactMethod][value="whatsapp"]').should('be.checked');
      cy.screenshot();
    });

    it('Aceptar políticas de privacidad', () => {
      cy.get('input[id=acceptsPrivacyPolicy]').check();
      cy.get('input[id=acceptsPrivacyPolicy]').should('be.checked');
      cy.screenshot();
    });

    it('Aceptar recibir información de otros productos', () => {
      cy.get('input[id=wantsProductInfo]').check();
      cy.get('input[id=wantsProductInfo]').should('be.checked');
      cy.screenshot();
    });

    it('Click en Siguiente', () => {
      cy.contains('button', 'Siguiente').should('be.enabled').click();
      cy.screenshot();
    });
  });

  describe('Sección 7 - Confirmación', () => {
    before(() => {
      cy.completarPaso6();
    });

    it('Mostrar la sección de confirmación', () => {
      cy.contains('h2', 'Confirmación').should('be.visible');
      cy.contains('h3', '¡Listo! Te contactaremos pronto').should('be.visible');
      cy.contains('p', 'Código de tu simulación').next().invoke('text').should('match', /\d/);
      cy.screenshot();
    });

    it('Verificar resumen de la simulación', () => {
      ['pareja', 'apartamento', 'empleado', 'fija', 'mañana', 'whatsapp'].forEach((texto) => {
        cy.contains('app-step-confirmation span', texto).should('be.visible');
      });
      ['Quito', '1987-03-08', 'casado', '20 años', 'Usuario Prueba', '1234567890',
        'usuario.prueba@ejemplo.com', '0991234567', 'Empresa de Prueba S.A.'].forEach((valor) => {
        // Angular asigna la propiedad value, no el atributo: no sirve [value="..."].
        cy.get('app-step-confirmation input[readonly]')
          .filter((_, el) => el.value === valor)
          .should('have.length', 1);
      });
      cy.screenshot();
    });

    it('Confirmar que la información es correcta', () => {
      cy.contains('button', 'Aceptar y Enviar').should('be.disabled');
      cy.get('input[id=confirmInformation]').check();
      cy.get('input[id=confirmInformation]').should('be.checked');
      cy.screenshot();
    });

     it('Click en Aceptar y Enviar', () => {
      cy.intercept('POST', '**/api/Simulacion/procesar').as('procesar');
      cy.contains('button', 'Aceptar y Enviar').should('be.enabled').click();
    //  cy.wait('@procesar').its('response.statusCode').should('be.oneOf', [200, 201]);
      cy.screenshot();
    }); 

    it('Click en botón Aceptar Final', () => {
     cy.contains('button', ' Aceptar ').should('be.enabled').click();
      cy.screenshot();
    });
  });

  

 



 /* 
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
  */
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