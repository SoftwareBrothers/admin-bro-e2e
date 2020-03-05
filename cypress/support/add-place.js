import faker from 'faker';
import { leftNavbar, sequelize } from './cssCommonSelectors';
import comp from './components';

function addPlace(name, description){
  cy.loginSuccess()
    .get(leftNavbar.sequelize.favouritePlaces).click()
    .get(comp.common.actionButton).contains('Create new').click()
    .get(sequelize.inputs.name).type(name)
    .get(sequelize.inputs.description).type(description)
    .get('[for="userId"]').next().click()
    .get(comp.common.dropdownFirstOption).click()
    .get(comp.common.publishedAt).find('button').click()
    .get(comp.common.calendarToday).click()
    .get(comp.common.sidebarDrawer).contains('Save').click({ force: true });
}

Cypress.Commands.add('addPlace', addPlace);
