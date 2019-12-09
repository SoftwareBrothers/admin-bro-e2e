import { leftNavbar, mongoose } from '../../../support/cssCommonSelectors';
import { common } from '../../../support/texts';

describe('Delete added user from Sequelize Resources', function () {
  before(function() {
    cy.addNewUser();
  });
  it('Enter users, delete created one', function () {
    cy.visit('/admin')
      .get(leftNavbar.sequelize.users).click()
      .get('.is-sortable').contains('Created At').click()
      .wait(300)
      .get('.is-sortable').contains('Created At').click()
      .wait(300)
      .get('.main').contains('email@example.com').click()
      .get(mongoose.buttons.remove).click()
      .get('.success').should('be.visible')
      .get('.success').should('contain', common.recordDeleted);
  });
});
