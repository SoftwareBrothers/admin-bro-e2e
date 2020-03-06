import { common } from '../../../support/texts';
import comp from '../../../support/components';
import faker from 'faker';

describe('[Sequelize Resources/ Users] Add new user to Sequelize Resources', function () {
  it('Should create a new user', function () {
    const userEmail = 'aaaa'+faker.internet.email();
    const userFirstName = faker.name.firstName();
    const userLastName = faker.name.lastName();

    cy.addNewUser(userEmail, userLastName, userFirstName)
      .get(comp.common.messageBox).should('be.visible')
      .get(comp.common.messageBox).should('contain', common.recordCreated)
      .get(comp.common.emailsList).should('contain', userEmail);
  });
});
