import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common, navbarTexts } from '../../../../support/texts';
import comp from '../../../../support/components';

const { inputs, buttons, boardView } = mongoose;
const { inputsTexts } = common;

describe('Adding new record to comment', function () {
  it('New comment by click on add new button', function () {
    cy.server()
      .route('POST', '/admin/api/resources/Comment/actions/new').as('commentAdded');

    cy.loginSuccess() 
      .get(leftNavbar.mongoose.comment).contains(navbarTexts.mongoose.comment).click()
      .get(comp.common.actionButton).contains(common.buttons.addNew).click()
      .get(buttons.dropDownButton).first().click()
      .get(buttons.dropDownOption).then($element=>{
        const category = $element.text();
        cy.wrap(category).as('category');
      })
      .get(buttons.dropDownOption).first().click() 
      .get(inputs.content).type(inputsTexts.randomNumbers) 
      .get(inputs.checkBoxFlagged).find('#flagged').next().click() 
      .get(comp.common.sidebarDrawer).contains(common.save).click()
      .wait('@commentAdded')
      .get(comp.common.hideSidebar).click() 
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
