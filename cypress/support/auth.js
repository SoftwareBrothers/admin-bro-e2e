function login(username, password) {
    cy.visit('/admin')
        .get('#email').type(username)
        .get('#password').type(password)
        .get('.is-primary').contains('Login').click();
};

Cypress.Commands.add('loginSuccess', () => {
    login('test@example.com', 'password');
});

Cypress.Commands.add('loginFail', () => {
    login('wrongmail@example.com', 'wrongpass');
});