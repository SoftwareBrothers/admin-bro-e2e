
import { customized, leftNavbar } from '../../../../support/cssCommonSelectors';
import * as texts from '../../../../support/texts';
import comp from '../../../../support/components';

  
const { boardView } = customized;
  
describe('Delete user record', function () {
  it('From record details page and clicking remove button', function () {
    cy.server()
      .route('GET', '/admin/api/resources/User/records/*/show').as('recordLoaded')
      .route('GET', '/admin/api/resources/User/records/*/delete').as('recordDeleted')
      .loginSuccess() 
      .get(leftNavbar.customized.user).contains(texts.navbarTexts.customized.user).click()
      .get(comp.common.emailsList).first().then($email => {
        const email = $email.text();

        cy.get(boardView.tableTr).eq(1).click()
          .wait('@recordLoaded')
          .get(comp.common.actionButton).contains(texts.common.buttons.remove).click()
          .wait('@recordDeleted').its('status').should('eql', 200)
          .get(comp.common.messageBox).should('contain', texts.common.recordDeleted)
          .get(boardView.table).should('not.contain', email);
      }); 
  });
});

