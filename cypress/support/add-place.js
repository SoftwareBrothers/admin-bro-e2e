import faker from 'faker';
import { sequelize } from './cssCommonSelectors';

function addPlace(){
  cy.loginSuccess()
    .get('li').contains('FavouritePlaces').click()
    .get(sequelize.buttons.addIcon).click()
    .get(sequelize.inputs.name).type(faker.address.city())
    .get(sequelize.inputs.description).type(faker.lorem.paragraph())
    .get(sequelize.buttons.dropDownButton).click()
    .get(sequelize.buttons.dropDownOptionsClass).first().click()
    .get(sequelize.inputs.publishedAt).click()
    .get('.today').eq(6).click()
    .get(sequelize.buttons.save).click();
}

Cypress.Commands.add('addPlace', addPlace);
