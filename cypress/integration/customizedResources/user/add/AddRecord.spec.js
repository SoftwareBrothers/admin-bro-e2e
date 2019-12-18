import faker from 'faker';
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
let email = 'aaaaaa' + faker.internet.email().toLowerCase();

describe('Add record to the user (custom actions example)', function() {
  it('Go to user and add record', function() {
    cy.loginSuccess()
      .get(leftNavbar.customized.user).contains(navbarTexts.customized.user).click()
      .get(buttons.addIcon).click()
      .get(inputs.email).type(email)
      .get(inputs.authPassword).type(faker.lorem.word())
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const inputValues = getFormValues($tr, [0]);
        expect(inputValues[0]).to.eql(email);
      });
  }); 
});
  
