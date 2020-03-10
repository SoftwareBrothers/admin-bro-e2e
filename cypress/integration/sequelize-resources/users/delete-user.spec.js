import { common } from '../../../support/texts';
import components from '../../../support/components';
import faker from 'faker';
import { routeRecordCreated, routeRecordDeleted } from '../../../support/route-requests';

describe('[Sequelize Resources/ Users] Remove user', function () {
  it('Should enter users and delete created one', function () {
    const userEmail = faker.internet.email();
    const userFirstName = faker.name.firstName();
    const userLastName = faker.name.lastName();

    routeRecordCreated('Users');
    routeRecordDeleted('Users');

    cy.addNewUser(userEmail, userLastName, userFirstName)
      .wait('@recordCreated')
      .get(components.common.emailsList).contains(userEmail).click()
      .get(components.common.actionButton).contains('Delete').click()
      .wait('@recordDeleted').its('status').should('eql', 200)
      .get(components.common.messageBox).should('be.visible')
      .get(components.common.messageBox).should('contain', common.recordDeleted);
  });
});
