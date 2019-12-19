import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';
import faker from 'faker';

const { inputs, buttons, boardView, boardView:{ sorting } } = mongoose;
const contentNumbers = faker.random.number()+''; 

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
      .get(inputs.content).type(contentNumbers)  
      .get(inputs.checkBoxFlagged).click() 
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click() 
      .get(sorting.sortByIdButton).click() 
      .wait(3000)
      .get(boardView.table).then($tableWithRecords=>{ 
        const categoryObBoard = $tableWithRecords.find(boardView.tableTdClass).eq(1).text();
        const flaggedOnBoard = $tableWithRecords.find(boardView.tableTdClass).eq(2).text();
        const contentOnBoard = $tableWithRecords.find(boardView.tableTdClass).eq(3).text();
        expect(this.category).to.be.eql(categoryObBoard);
        expect(flaggedOnBoard).to.be.eql('Yes');
        expect(contentOnBoard).to.be.eql(contentNumbers);
      });
  });
});
