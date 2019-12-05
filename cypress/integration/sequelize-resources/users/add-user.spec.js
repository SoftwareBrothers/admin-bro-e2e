import { sequelize, leftNavbar } from '../../../support/cssCommonSelectors';
import { common } from '../../../support/texts';

describe('Add new user to Sequelize Resources', () => {
  it('Create a new user', () => {
    cy.loginSuccess()
      .get(leftNavbar.sequelize.users).click()
      .get('.btn-text').contains('Add new').click()
      .url().should('contain', '/admin/resources/Users/actions/new')
      .get(sequelize.inputs.email).type('email@example.com')
      .get(sequelize.inputs.isMyFavourite).type('true') //here typing not-boolean causes 500
      .get(sequelize.inputs.lastName).type('Lastname')
      .get(sequelize.inputs.firstName).type('Firstname')
      .get(sequelize.inputs.gender).next().click()
      .get('#react-select-3-option-0').click() // male - 'option-0' | female - 'option-1'
      .get('.btn-text').contains('Save').click()
      .get('.success').should('be.visible')
      .get('.success').should('contain', common.recordCreated);
  });
});
