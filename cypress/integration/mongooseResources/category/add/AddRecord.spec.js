
import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';
import { getFormValues,
} from '../../../../support/helpersMethods';

const { inputs, calendar, buttons, boardView } = mongoose;
const { inputsTexts  } = common;

describe('Add record to the category', () => {
  it('Go to category and add record', () => {
    cy.loginSuccess()
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(buttons.addIcon).click()
      .get(inputs.title).type(inputsTexts.title)
      .get(inputs.nestedValue).type(inputsTexts.randomNumbers)
      .get(inputs.nestedFiled).type(common.randomText)
      .get(inputs.owner).type(inputsTexts.ownerRandom)
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const finputValues = getFormValues($tr, [1,4,5,6]);
        expect(finputValues) 
          .to.have.members([
            inputsTexts.randomNumbers, 
            common.randomText,
            inputsTexts.ownerRandom,
            inputsTexts.title,
          ]);
      });
  }); 
});
