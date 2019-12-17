import { common } from '../../../support/texts';

describe('Enters favourite places', () => {
  it('Should add new record', () => {
    cy.addPlace()
      .get('.success').should('be.visible')
      .get('.success').should('contain', common.recordCreated);      
  });
});
