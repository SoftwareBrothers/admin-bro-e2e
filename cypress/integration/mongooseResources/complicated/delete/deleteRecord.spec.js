
import { leftNavbar, mongoose } from '../../../../support/cssCommonSelectors';
import { navbarTexts } from '../../../../support/texts';

const { buttons, boardView } = mongoose;

describe('Delete record from complicated page', function() {
  it('Delete record from details page', function() {
    cy.loginSuccess()
      .get(leftNavbar.mongoose.complicated).contains(navbarTexts.mongoose.complicated).click()
      .get(boardView.table).then($tableWithRecords=>{
        const idofFirstRecord = $tableWithRecords.find(boardView.tableTds).eq(1);
        cy.wrap(idofFirstRecord).as('firstRecordId');
      })
      .get(boardView.tableTds).first().find('a').click()
      .get(buttons.remove).click()
      .get(boardView.table).then($tableWithRecords=>{ 
        const firstRecordIdAfeterDelete = $tableWithRecords.find(boardView.tableTds).eq(1).text();
        expect(this.firstRecordId.text()).not.to.eql(firstRecordIdAfeterDelete); 
      });  
  }); 
});
 
