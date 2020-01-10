import faker from 'faker';
import { sequelize } from './cssCommonSelectors';

function addPlace(){
  cy.loginSuccess()
    .get('li').contains('FavouritePlaces').click()
    .get(sequelize.buttons.addIcon).click()
    .get(sequelize.inputs.name).type(faker.address.city())
    .get(sequelize.inputs.description).type(faker.lorem.paragraph())
    .get('form .control > div > div').click()
    .get('form .control > div:last-child > div:last-child > div > div').first().click()
    .get(sequelize.inputs.publishedAt).click()
    .get('.flatpickr-day.today').last().click()
    .get(sequelize.buttons.save).click();
}

Cypress.Commands.add('addPlace', addPlace);
