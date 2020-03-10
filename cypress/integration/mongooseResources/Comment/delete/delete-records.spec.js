import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import * as texts from '../../../../support/texts';
import components from '../../../../support/components';
import { routeRecordDeleted, routeRecordEditLoaded } from '../../../../support/route-requests';

const { boardView } = mongoose;

describe('[Mongoose resources/ Comment] Delete comment record', function () {
  it('Shold delete comment from details page', function () {
    routeRecordDeleted('Comment');
    routeRecordEditLoaded('Comment');

    cy.loginSuccess() 
      .get(leftNavbar.mongoose.comment).contains(texts.navbarTexts.mongoose.comment).click()
      .get(components.common.idsList).first().then($id => {
        const id = $id.text();
      
        cy.get(boardView.tableTr).eq(1).click()
          .wait('@recordEditLoaded')
          .get(components.common.actionButton).should('be.visible')
          .get(components.common.actionButton).contains(texts.common.buttons.remove).click()
          .wait('@recordDeleted').its('status').should('eql', 200)
          .get(components.common.messageBox).should('contain', texts.common.recordDeleted)
          .get(boardView.table).should('not.contain', id);
      });
  });
}); 
