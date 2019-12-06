
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

describe('Add record to the complicated', () => {
  it('Create record with basic info only', () => {
    cy.loginSuccess()
      .get(leftNavbar.mongoose.complicated).contains(navbarTexts.mongoose.category).click()
      .get(buttons.addIcon).click()
      .get(inputs.name).type(inputsTexts.title)
      .get(inputs.personAge).type(inputsTexts.randomNumbers)
      .get(inputs.height).type(common.randomText)
      .get(inputs.birthPlace).type(inputsTexts.ownerRandom)
      .get(inputs.extremlyNested).click()
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const finputValues = getFormValues($tr, [0,2,3,4]);
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
