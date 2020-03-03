import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import * as texts from '../../../../support/texts';
import comp from '../../../../support/components';

const { boardView } = mongoose;

describe('[Mongoose resources - Comment] Delete comment record', function () {
  it('From record details page and clicking remove button', function () {
    cy.server()
      .route('GET', '/admin/api/resources/Category/search').as('recordLoaded')
      .route('GET', '/admin/api/resources/Comment/records/*/delete').as('recordDeleted');

    cy.loginSuccess() 
      .get(leftNavbar.mongoose.comment).contains(texts.navbarTexts.mongoose.comment).click()
      .get(comp.common.idsList).first().then($id => {
        const id = $id.text();
      
        cy.get(boardView.tableTr).eq(1).click()
          .wait('@recordLoaded')
          .get(comp.common.actionButton).should('be.visible')
          .get(comp.common.actionButton).contains(texts.common.buttons.remove).click()
          .wait('@recordDeleted').its('status').should('eql', 200)
          .get(comp.common.messageBox).should('contain', texts.common.recordDeleted)
          .get(boardView.table).should('not.contain', id);
      });
  });
}); 
