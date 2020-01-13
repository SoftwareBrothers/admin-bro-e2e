
import {
  customized,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  navbarTexts,
} from '../../../../support/texts';
  
const { boardView, buttons } = customized;
  
describe('Delete user record', function () {
  it('From record details page and clicking remove button', function () {
    cy.loginSuccess() 
      .get(leftNavbar.customized.user).contains(navbarTexts.customized.user).click()
      .get(boardView.table).then($tableWithRecords=>{
        const idofFirstRecord = $tableWithRecords.find(boardView.tableTds).eq(1);
        cy.wrap(idofFirstRecord).as('firstRecordId');
      });
    cy.get(boardView.tableTds).eq(1).find('a').click()
      .get(buttons.remove).click()
      .get(boardView.table).then($tableWithRecords => { 
        const firstRecordIdAfeterDelete = $tableWithRecords.find(boardView.tableTds).eq(1).text();
        expect(this.firstRecordId.text()).not.to.equal(firstRecordIdAfeterDelete);
      });
  });
}); 
  
