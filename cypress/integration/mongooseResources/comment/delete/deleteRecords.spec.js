import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  navbarTexts,
} from '../../../../support/texts';

const { boardView, buttons } = mongoose;

describe('Delete comment record',function(){
  it('From record details page and clicking remove button',function(){
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.comment).contains(navbarTexts.mongoose.comment).click()
      .get(boardView.table).then($tableWithRecords=>{
        const idOfFirstRecord = $tableWithRecords.find(boardView.tableTds).eq(0);
        cy.wrap(idOfFirstRecord).as('firstRecordId');
      });
    cy.get(boardView.tableTds).eq(3).find('a').click()
      .get(buttons.remove).click()
      .get(boardView.table).then($tableWithRecords=>{ 
        const firstRecordIdAfeterDelete = $tableWithRecords.find(boardView.tableTds).eq(0).text();
        expect(this.firstRecordId.text()).not.to.eql(firstRecordIdAfeterDelete);
      });
  });
}); 
