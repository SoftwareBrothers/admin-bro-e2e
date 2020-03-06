import { common } from '../../../support/texts';
import comp from '../../../support/components';
import faker from 'faker';

describe('[Sequelize Resources/ Favourite places] Remove user', function () {
  it('Should enter users and delete created one', function () {
    const userEmail = 'aaaa'+faker.internet.email();
    const userFirstName = faker.name.firstName();
    const userLastName = faker.name.lastName();

    cy.server()
      .route('GET', '/admin/api/resources/Users/records/*/delete').as('recordDeleted');

    cy.addNewUser(userEmail, userLastName, userFirstName)
      .get(comp.common.emailsList).contains(userEmail).click()
      .get(comp.common.actionButton).contains('Delete').click()
      .wait('@recordDeleted').its('status').should('eql', 200)
      .get(comp.common.messageBox).should('be.visible')
      .get(comp.common.messageBox).should('contain', common.recordDeleted);
  });
});
