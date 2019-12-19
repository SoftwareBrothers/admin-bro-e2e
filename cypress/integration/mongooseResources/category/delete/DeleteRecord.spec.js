import { leftNavbar, mongoose } from '../../../../support/cssCommonSelectors';
import { navbarTexts } from '../../../../support/texts';

const { boardView, buttons } = mongoose;

describe('Delete category record',function(){
  it('From record details page and clicking remove button',function(){
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(boardView.table).then($tableWithRecords=>{
        const idofFirstRecord = $tableWithRecords.find(boardView.tableTds).eq(1);
        cy.wrap(idofFirstRecord).as('firstRecordId');
      });
    cy.get(boardView.tableTds).first().find('a').click()
      .get(buttons.remove).click()
      .get(boardView.table).then($tableWithRecords=>{ 
        const firstRecordIdAfeterDelete = $tableWithRecords.find(boardView.tableTds).eq(1).text();
        expect(this.firstRecordId.text()).not.to.eql(firstRecordIdAfeterDelete);
      });
  });
});  
