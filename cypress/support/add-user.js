import { leftNavbar, sequelize } from '../support/cssCommonSelectors';
import components from './components';

function userCreate(email, lastName, firstName) {
  cy.loginSuccess()
    .get(leftNavbar.sequelize.users).click()
    .get(components.common.actionButton).contains('Create new').click()
    .url().should('contain', '/admin/resources/Users/actions/new')
    .get(sequelize.inputs.email).type(email)
    .get(sequelize.inputs.isMyFavourite).next().click()
    .get(sequelize.inputs.lastName).type(lastName)
    .get(sequelize.inputs.firstName).type(firstName)
    .get(sequelize.inputs.gender).next().click()
    .get(sequelize.inputs.male).click()
    .get(components.common.sidebarDrawer).contains('Save').click();
}

Cypress.Commands.add('addNewUser', userCreate);
