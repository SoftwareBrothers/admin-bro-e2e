describe('Visit admin and authenticate', () => {
    it('Visits admin, fills the login form and login', () => {
        cy.loginSuccess();
    });
    it('Visit admin and provide wrong credentials', () => {
        cy.loginFail();
        cy.get('.notification').
        contains('Wrong email and/or password').
        should('be.visible');
    });
});