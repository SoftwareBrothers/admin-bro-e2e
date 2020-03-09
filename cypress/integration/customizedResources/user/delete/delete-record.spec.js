import { customized, leftNavbar } from '../../../../support/cssCommonSelectors';
import * as texts from '../../../../support/texts';
import components from '../../../../support/components';
import { routeRecordLoaded, routeRecordDeleted } from '../../../../support/route-requests';

const { boardView } = customized;
  
describe('[Customized resources/ User] Delete user record', function () {
  it('Should delete a record from details page', function () {
    routeRecordLoaded('User');
    routeRecordDeleted('User');

    cy.loginSuccess() 
      .get(leftNavbar.customized.user).contains(texts.navbarTexts.customized.user).click()
      .get(components.common.emailsList).first().then($email => {
        const email = $email.text();

        cy.get(boardView.tableTr).eq(1).click()
          .wait('@recordLoaded')
          .get(components.common.actionButton).contains(texts.common.buttons.remove).click()
          .wait('@recordDeleted').its('status').should('eql', 200)
          .get(components.common.messageBox).should('contain', texts.common.recordDeleted)
          .get(boardView.table).should('not.contain', email);
      }); 
  });
});

