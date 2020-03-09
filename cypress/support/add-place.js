import { leftNavbar, sequelize } from './cssCommonSelectors';
import components from './components';

function addPlace(name, description){
  cy.loginSuccess()
    .get(leftNavbar.sequelize.favouritePlaces).click()
    .get(components.common.actionButton).contains('Create new').click()
    .get(sequelize.inputs.name).type(name)
    .get(sequelize.inputs.description).type(description)
    .get('[for="userId"]').next().click()
    .get(components.common.dropdownFirstOption).click()
    .get(components.common.publishedAt).find('button').click()
    .get(components.common.calendarToday).click()
    .get(components.common.sidebarDrawer).contains('Save').click({ force: true });
}

Cypress.Commands.add('addPlace', addPlace);
