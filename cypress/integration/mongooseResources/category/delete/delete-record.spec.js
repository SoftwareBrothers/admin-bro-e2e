import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import * as texts from '../../../../support/texts';
import components from '../../../../support/components';
import { routeRecordDeleted, routeRecordLoaded } from '../../../../support/route-requests';

const { boardView } = mongoose;

describe('[Mongoose resources/ Category] Delete category record', function () {
  it('Should remove a record from its details page', function () {
    routeRecordDeleted('Category');
    routeRecordLoaded('Category');

    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(texts.navbarTexts.mongoose.category).click()
      .get(components.common.idsList).first().then($id => {
        const id = $id.text();
        
        cy.get(boardView.tableTr).eq(1).click()
          .wait('@recordLoaded')
          .get(components.common.actionButton).contains(texts.common.buttons.remove).click()
          .wait('@recordDeleted').its('status').should('eql', 200)
          .get(components.common.messageBox).should('contain', texts.common.recordDeleted)
          .get(boardView.table).should('not.contain', id);
      });
  });
});
