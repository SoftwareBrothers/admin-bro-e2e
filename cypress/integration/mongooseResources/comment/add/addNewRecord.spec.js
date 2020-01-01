import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';

const { inputs, calendar, buttons, boardView, boardView:{ sorting } } = mongoose;
const { inputsTexts } = common;

describe('Adding new record to comment', function(){
  it('New comment by click on add new button', function() {
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.comment).contains(navbarTexts.mongoose.comment).click()
      .get(buttons.addIcon).click()
      .get(buttons.dropDownButton).first().click()
      .get(buttons.dropDownOption).then($element=>{
        const category = $element.text();
        cy.wrap(category).as('category');
      });
    cy.get(buttons.dropDownOption).first().click() 
      .get(inputs.content).type(inputsTexts.randomNumbers) 
      .get(inputs.checkBoxFlagged).click() 
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click() 
      .wait(1000)
      .get(boardView.table).then($tableWithRecords=>{ 
        const categoryOnBoard = $tableWithRecords.find(boardView.tableFirstDataRow).eq(4).text();
        const flaggedOnBoard = $tableWithRecords.find(boardView.tableFirstDataRow).eq(3).text();
        const contentOnBoard = $tableWithRecords.find(boardView.tableFirstDataRow).eq(2).text();
  
        expect(this.category).to.equal(categoryOnBoard);
        expect(flaggedOnBoard).to.equal('Yes');
        expect(contentOnBoard).to.equal(inputsTexts.randomNumbers);
      });
  });
});
