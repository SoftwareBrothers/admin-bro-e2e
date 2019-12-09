import { common } from '../../../support/texts';

describe('Add new user to Sequelize Resources', function () {
  it('Create a new user', function () {
    cy.addNewUser()
      .get('.success').should('be.visible')
      .get('.success').should('contain', common.recordCreated);
  });
});
