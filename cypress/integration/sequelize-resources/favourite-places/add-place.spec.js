import faker from 'faker';

describe('Enters favourite places', () => {
  it('Should add new record', () => {
    cy.loginSuccess()
      .get('li').contains('FavouritePlaces').click()
      .get('.btn-text').contains('Add new').click()
      .get('#name').type(faker.address.city())
      .get('#description').type(faker.lorem.paragraph())
      .get('div').contains('Select...').click()
      .get('.css-kjz24b-option').first().click()
      .get('#publishedAt').click()
      .get('.today').eq(6).click()
      .get('.button').contains('Save').click()
      .get('.success').should('be.visible')
      .get('.success').should('contain', 'Record has been successfully created!');
  });
});
