import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';

import { getFormValues } from '../../../../support/helpersMethods';

const { inputs, calendar, buttons, boardView } = mongoose;
const { inputsTexts } = common;

describe('Editing first record on the list',function(){
  it('Check does changed fields in records are applied on main page', function(){
    let formValues;
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{
        formValues = getFormValues($tr, [0,2,3,4,5]);
      })
      .get(boardView.tableTds).first().find('a').click()
      .get(buttons.edit).click()
      .get(inputs.title).clear().type(inputsTexts.title)
      .get(inputs.nestedValue).clear().type(inputsTexts.nestedValue)
      .get(inputs.nestedFiled).clear().type(inputsTexts.nestedField)
      .get(inputs.owner).clear().type(inputsTexts.ownerRandom)
      .get(inputs.createdAt).click() 
      .get(calendar.month).should('not.have.class', 'today').click() 
      .get(buttons.save).contains(common.save).click()
      .wait(3000)
      .get(buttons.back).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{
        const formValuesChanged = getFormValues($tr, [0,2,3,4,5]);
        expect(formValues).to.deep.not.eq(formValuesChanged);  
      });
  });  
}); 
