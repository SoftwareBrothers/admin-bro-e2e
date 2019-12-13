
import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';
import { getTextFromChildElements,
} from '../../../../support/helpersMethods';

const { inputs, calendar, buttons, boardView } = mongoose;
const { inputsTexts  } = common;

describe('Add record to the complicated', () => {
  it('Create record with basic info only', () => {
    cy.loginSuccess()
      .get(leftNavbar.mongoose.complicated).contains(navbarTexts.mongoose.complicated).click()
      .get(buttons.addIcon).click()
      .get(inputs.name).type(inputsTexts.name) 
      .get(inputs.personAge).type(inputsTexts.personAge)
      .get(inputs.height).type(inputsTexts.height)
      .get(inputs.birthPlace).type(inputsTexts.birthPlace)
      .get(inputs.extremlyNested).type(inputsTexts.extremlyNested)
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const name = $tr.find(boardView.tableTdClass).eq(0);
        expect(name.text()).to.be.eql(inputsTexts.name);
        // extracting texts from spans inside td which contains all info typed above 
        const info = getTextFromChildElements($tr.find(
          boardView.tableTdClass).eq(4),'span', [0,1,2,3,4]);
        expect(info)   
          .to.include.members([
            inputsTexts.personAge, 
            inputsTexts.height,
            inputsTexts.birthPlace, 
            inputsTexts.extremlyNested,             
          ]); 
      });
  }); 
});
