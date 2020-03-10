import { common } from '../../../support/texts';
import components from '../../../support/components';
import faker from 'faker';

describe('[Sequelize Resources/ Favourite places] Enters favourite places', function () {
  it('Should add new record', function () {
    const placeName = faker.address.county();
    const placeDescription = faker.lorem.paragraph();

    cy.addPlace(placeName, placeDescription)
      .get(components.common.messageBox).should('be.visible')
      .get(components.common.messageBox).should('contain', common.recordCreated);      
  });
});
