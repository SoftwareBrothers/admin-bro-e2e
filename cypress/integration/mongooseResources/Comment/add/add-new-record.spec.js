import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common, navbarTexts } from '../../../../support/texts';
import components from '../../../../support/components';
import { routeRecordCreated } from '../../../../support/route-requests';

const { inputs, buttons, boardView } = mongoose;
const { inputsTexts } = common;

describe('[Mongoose resources/ Comment]Adding new record to comment', function () {
  it('Should add a new comment from comments list' , function () {
    routeRecordCreated('Comment');

    cy.loginSuccess() 
      .get(leftNavbar.mongoose.comment).contains(navbarTexts.mongoose.comment).click()
      .get(components.common.actionButton).contains(common.buttons.addNew).click()
      .get('[for="category"]').next().click()
      .get(buttons.dropDownOption).then($element=>{
        const category = $element.text();
        cy.wrap(category).as('category');
      })
      .get(buttons.dropDownOption).first().click() 
      .get(inputs.content).type(inputsTexts.randomNumbers) 
      .get(inputs.checkBoxFlagged).find('#flagged').next().click() 
      .get(components.common.sidebarDrawer).contains(common.save).click()
      .wait('@recordCreated')
      .get(boardView.table).then($tableWithRecords=>{ 
        const categoryOnBoard = $tableWithRecords.find(boardView.tableFirstDataRow).eq(4).text();
        const flaggedOnBoard = $tableWithRecords.find(boardView.tableFirstDataRow).eq(3).text();
        const contentOnBoard = $tableWithRecords.find(boardView.tableFirstDataRow).eq(1).text();
  
        expect(this.category).to.equal(categoryOnBoard);
        expect(flaggedOnBoard).to.equal('Yes');
        expect(contentOnBoard).to.equal(inputsTexts.randomNumbers);
      });
  });
});
