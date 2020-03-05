import { leftNavbar, sequelize } from '../support/cssCommonSelectors';
import comp from './components';

function userCreate(email, lastName, firstName) {
  cy.loginSuccess()
    .get(leftNavbar.sequelize.users).click()
    .get(comp.common.actionButton).contains('Create new').click()
    .url().should('contain', '/admin/resources/Users/actions/new')
    .get(sequelize.inputs.email).type(email)
    .get('#isMyFavourite').next().click()
    .get(sequelize.inputs.lastName).type(lastName)
    .get(sequelize.inputs.firstName).type(firstName)
    .get(sequelize.inputs.gender).next().click()
    .get(sequelize.inputs.male).click()
    .get(comp.common.sidebarDrawer).contains('Save').click();
}

Cypress.Commands.add('addNewUser', userCreate);
