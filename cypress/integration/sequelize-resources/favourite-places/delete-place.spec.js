import { sequelize } from '../../../support/cssCommonSelectors';
import { common } from '../../../support/texts';

describe('go to places', function() {
  before(function() {
    cy.addPlace();
    cy.wait(1000);
  });
  it('find created place and remove it', function () {
    cy.get('.label').contains(common.buttons.name).next().then(function($name) {
      cy.wrap($name.text()).as('placeName');
    });
    cy.get('li').contains('FavouritePlaces').click()
      .wait(700)
      .sortBy('Created At')
      .wait(700)
      .sortBy('Created At').then(()=>{
        cy.wait(700)
          .get('.main').contains(this.placeName).click()
          .get(sequelize.buttons.remove).click()
          .get('.success').should('be.visible').should('contain', common.recordDeleted);
      });
  });
});
