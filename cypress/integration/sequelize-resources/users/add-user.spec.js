import { common } from '../../../support/texts';
import components from '../../../support/components';
import faker from 'faker';
import { routeRecordCreated } from '../../../support/route-requests';

describe('[Sequelize Resources/ Users] Add new user to Sequelize Resources', function () {
  it('Should create a new user', function () {
    const userEmail = 'aaaa'+faker.internet.email();
    const userFirstName = faker.name.firstName();
    const userLastName = faker.name.lastName();

    routeRecordCreated('Users');

    cy.addNewUser(userEmail, userLastName, userFirstName)
      .wait('@recordCreated').its('status').should('eql', 200)
      .get(components.common.messageBox).should('be.visible')
      .get(components.common.messageBox).should('contain', common.recordCreated)
      .get(components.common.emailsList).should('contain', userEmail);
  });
});
