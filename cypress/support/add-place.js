import faker from 'faker';

function addPlace(){
  cy.loginSuccess()
    .get('li').contains('FavouritePlaces').click()
    .get('.btn-text').contains('Add new').click()
    .get('#name').type(faker.address.city())
    .get('#description').type(faker.lorem.paragraph())
    .get('div').contains('Select...').click()
    .get('.css-kjz24b-option').first().click()
    .get('#publishedAt').click()
    .get('.today').eq(6).click()
    .get('.button').contains('Save').click();
}

Cypress.Commands.add('addPlace', addPlace);
