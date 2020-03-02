import comp from './components';

function login(username, password) {
  cy.visit('/admin')
    .get(comp.common.email).type(username)
    .get(comp.common.password).type(password)
    .get('button').contains('Login').click();
};

Cypress.Commands.add('loginSuccess', () => {
  login('test@example.com', 'password');
});

Cypress.Commands.add('loginFail', () => {
  login('wrongmail@example.com', 'wrongpass');
});
