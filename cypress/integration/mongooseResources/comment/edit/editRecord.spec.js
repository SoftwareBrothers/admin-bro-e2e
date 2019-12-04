import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';

import { getFormValues } from '../../../../support/helpersMethods';

const { inputs, buttons, boardView } = mongoose;
const { inputsTexts } = common;

describe('Editing first comment record on the list',function(){
  it('Check does changed fields in records are applied on main page', function(){
    let formValues;
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.comment).contains(navbarTexts.mongoose.comment).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{
        // numbers here represents indexes of tdsfrom first tr, with title etc
        formValues = getFormValues($tr, [1,2,3]);
        cy.wrap($tr.find(boardView.tableTdClass).eq(0)).as('idNumber');
      });
    cy.get(boardView.tableTds).eq(3).find('a').click()
      .get(buttons.edit).click() 
      .get(buttons.dropDownButton).click()
      .get(buttons.dropDownOptionsClass).then($elements=>{
        $elements.not(formValues[0]).first().click();
      });
    cy.get(inputs.checkBoxFlagged).click() 
      .get(inputs.content).clear().type(inputsTexts.randomNumbers) 
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click() 
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{
        // numbers here represents indexes of tdsfrom first tr, with title etc
        const idNumberChanged = $tr.find(boardView.tableTdClass).eq(0);
        const changedFormValues = getFormValues($tr, [1,2,3]);
        expect(formValues).to.not.eql(changedFormValues);  
        expect(idNumberChanged.text()).to.be.equal(this.idNumber.text()); 
      });    
  });  
}); 
