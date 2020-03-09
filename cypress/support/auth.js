import components from './components';

function login(username, password) {
  cy.visit('/admin')
    .get(components.common.email).type(username)
    .get(components.common.password).type(password)
    .get('button').contains('Login').click();
};

Cypress.Commands.add('loginSuccess', () => {
  login('test@example.com', 'password');
});

Cypress.Commands.add('loginFail', () => {
  login('wrongmail@example.com', 'wrongpass');
});
