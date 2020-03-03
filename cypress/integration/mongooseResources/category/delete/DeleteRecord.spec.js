import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import * as texts from '../../../../support/texts';
import comp from '../../../../support/components';

const { boardView } = mongoose;

describe('Delete category record', function () {
  it('From record details page and clicking remove button',function(){
    cy.server()
      .route('GET', '/admin/api/resources/Category/records/*/delete').as('recordDeleted')
      .route('GET', '/admin/api/resources/Category/records/*/show').as('recordLoaded')
      .loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(texts.navbarTexts.mongoose.category).click()
      .get(comp.common.idsList).first().then($id => {
        const id = $id.text();
        
        cy.get(boardView.tableTr).eq(1).click()
          .wait('@recordLoaded')
          .get(comp.common.actionButton).contains(texts.common.buttons.remove).click()
          .wait('@recordDeleted').its('status').should('eql', 200)
          .get(comp.common.messageBox).should('contain', texts.common.recordDeleted)
          .get(boardView.table).should('not.contain', id);
      });
  });
});
