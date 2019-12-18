import faker from 'faker'
import {
  customized,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';
  
import { getFormValues } from '../../../../support/helpersMethods';
  
const { inputs, buttons, boardView } = customized;
const editEmail = 'aaaa' + faker.internet.email();
  
describe('Editing email in first record on the list',function(){
  it('Check does changed fields in records are applied on main page', function(){
    cy.loginSuccess() 
      .get(leftNavbar.customized.user).contains(navbarTexts.customized.user).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).find(boardView.tableTds).eq(0).then($td=>{
        cy.wrap($td).as('firstEmail');
      })
      .get(boardView.tableTds).first().find('a').click()
      .get(buttons.edit).click()
      .get(inputs.email).clear().type(editEmail)
      .get(buttons.save).contains(common.save).click()
      .wait(500)
      .get(buttons.back).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{
        const editedEmail = getFormValues($tr, [0]);
        expect(this.firstEmail.text()).to.deep.not.eq(editedEmail);  
      });
  });  
}); 
  