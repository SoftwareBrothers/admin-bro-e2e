
import {
  customized,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';
import { getFormValues,
} from '../../../../support/helpersMethods';
  
const { inputs, buttons, boardView } = customized;
const { inputsTexts  } = common;
  
describe('Add record to the user (custom actions example)', function() {
  it('Go to user and add record', function() {
    cy.loginSuccess()
      .get(leftNavbar.customized.user).contains(navbarTexts.customized.user).click()
      .get(buttons.addIcon).click()
      .get(inputs.email).type(inputsTexts.email)
      .get(inputs.authPassword).type(inputsTexts.password)
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const finputValues = getFormValues($tr, [1]);
        expect(finputValues[0]) 
          .to.eql(inputsTexts.email);
      });
  }); 
});
  
