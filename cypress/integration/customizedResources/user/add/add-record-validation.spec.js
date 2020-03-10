
import { leftNavbar } from '../../../../support/cssCommonSelectors';
import { common, navbarTexts } from '../../../../support/texts';
import components from '../../../../support/components';
  
describe('[Customized resources/ User] Add incorrect filled record to the user', function() {
  it('Should return error for empty email or password', function () {
    cy.loginSuccess()
      .get(leftNavbar.customized.user).contains(navbarTexts.customized.user).click()
      .get(components.common.actionButton).contains(common.buttons.addNew).click()
      .get(components.common.sidebarDrawer).contains(common.buttons.save).click()
      .get(components.common.email).next().should('contain', common.errorMsg.emailField)
      .get(components.common.sidebarPasswordInput).parent().next()
      .should('contain', common.errorMsg.authPasswordField)
      .get(components.common.messageBox).should('contain', common.errorMsg.validationDiv);
  });
});
