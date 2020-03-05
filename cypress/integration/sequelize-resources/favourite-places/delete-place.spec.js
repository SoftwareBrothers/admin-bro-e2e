import { sequelize, leftNavbar } from '../../../support/cssCommonSelectors';
import { common } from '../../../support/texts';
import comp from '../../../support/components';
import faker from 'faker';

describe('go to places', function () {
  it('find created place and remove it', function () {
    const testName = faker.address.city();
    const testDescription = faker.lorem.paragraph();

    cy.server()
      .route('GET', '//admin/api/resources/FavouritePlaces/records/*/delete').as('recordDeleted');

    cy.addPlace(testName, testDescription)
      .get(comp.common.nameList).contains(testName).click()
      .get(comp.common.actionButton).contains('Delete').click()
      .wait('@recordDeleted').its('status').should('eql', 200)
      .get(comp.common.nameList).should('not.contain', testName);
  });
});
// });
