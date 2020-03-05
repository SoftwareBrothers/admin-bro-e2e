import { common } from '../../../support/texts';
import comp from '../../../support/components';

describe('Enters favourite places', function () {
  it('Should add new record', function () {
    cy.addPlace()
      .get(comp.common.messageBox).should('be.visible')
      .get(comp.common.messageBox).should('contain', common.recordCreated);      
  });
});
