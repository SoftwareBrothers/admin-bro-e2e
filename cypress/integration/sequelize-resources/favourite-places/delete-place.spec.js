import components from '../../../support/components';
import faker from 'faker';
import { routeRecordDeleted } from '../../../support/route-requests';

describe('[Sequelize Resources/ Favourite places] Removing records', function () {
  it('Should find created place and remove it', function () {
    const testName = faker.address.city();
    const testDescription = faker.lorem.paragraph();

    routeRecordDeleted('FavouritePlaces');

    cy.addPlace(testName, testDescription)
      .get(components.common.nameList).contains(testName).click()
      .get(components.common.actionButton).contains('Delete').click()
      .wait('@recordDeleted').its('status').should('eql', 200)
      .get(components.common.nameList).should('not.contain', testName);
  });
});
