
import {
  customized,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';
  
const { buttons, validationFields } = customized;
const { errorMsg } = common;
  
describe('Add incorrect filled record to the user', function() {
  it('return error when email and auth password fields are empty', function() {
    cy.loginSuccess() 
      .get(leftNavbar.customized.user).contains(navbarTexts.customized.user).click()
      .get(buttons.addIcon).click()
      .get(buttons.save).contains(common.save).click() 
      .get(validationFields.validationInput).eq(0).contains(errorMsg.emailField)
      .get(validationFields.validationInput).eq(1).contains(errorMsg.authPasswordField)
      .get(validationFields.validationDiv).should('be.visible').contains(errorMsg.validationDiv);
  });
});
  
