import { common } from '../../../support/texts';
import comp from '../../../support/components';
import faker from 'faker';

describe('[Sequelize Resources/ Favourite places] Enters favourite places', function () {
  it('Should add new record', function () {
    const placeName = faker.address.county();
    const placeDescription = faker.lorem.paragraph();

    cy.addPlace(placeName, placeDescription)
      .get(comp.common.messageBox).should('be.visible')
      .get(comp.common.messageBox).should('contain', common.recordCreated);      
  });
});
