import faker from 'faker';
import {
  customized,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';
  
const { inputs, buttons, boardView } = customized;
const editedPassword = faker.lorem.words(2);
  
describe('Editing email in first record on the list', function () {
  it('Check does changed fields in records are applied on main page', function () {
    cy.loginSuccess() 
      .get(leftNavbar.customized.user).contains(navbarTexts.customized.user).click()
      .get(boardView.tableTds).eq(1).find('a').click()
      .get(buttons.edit).click()
      .get(inputs.authPassword).invoke('val').then($text=>{
        cy.wrap($text).as('authPassword');
      })
      .get(inputs.authPassword).clear().type(editedPassword)
      .get(buttons.save).contains(common.save).click()
      .wait(500)
      .get(buttons.edit).click()
      .get(inputs.authPassword).invoke('val').then(text=>{
        expect(this.authPassword).to.not.equal(text);
      });
  });
});
