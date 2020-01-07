import { leftNavbar, sequelize } from '../support/cssCommonSelectors';

function userCreate() {
  cy.loginSuccess()
    .get(leftNavbar.sequelize.users).click()
    .get('.btn-text').contains('Add new').click()
    .url().should('contain', '/admin/resources/Users/actions/new')
    .get(sequelize.inputs.email).type('email@example.com')
    .get(sequelize.inputs.isMyFavourite).click()
    .get(sequelize.inputs.lastName).type('Lastname')
    .get(sequelize.inputs.firstName).type('Firstname')
    .get(sequelize.inputs.gender).next().click()
    .get(sequelize.inputs.male).click()
    .get('.btn-text').contains('Save').click();
}

Cypress.Commands.add('addNewUser', userCreate);
