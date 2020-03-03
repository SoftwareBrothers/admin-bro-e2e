
import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common, navbarTexts } from '../../../../support/texts';
import { getFormValues } from '../../../../support/helpersMethods';
import comp from '../../../../support/components';

const { inputs, calendar, buttons, boardView } = mongoose;
const { inputsTexts  } = common;

describe('Add record to the category', function () {
  it('Go to category and add record', function () {
    cy.server()
      .route('POST', '/admin/api/resources/Category/actions/new').as('recordAdded')
      .route('GET', '/admin/api/resources/Category/actions/list').as('listLoaded');

    cy.loginSuccess()
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(comp.common.actionButton).contains(common.buttons.addNew).click()
      .get(inputs.title).type(inputsTexts.title)
      .get(inputs.nestedValue).type(inputsTexts.randomNumbers)
      .get(inputs.nestedField).type(common.randomText)
      .get(inputs.owner).type(inputsTexts.ownerRandom)
      .get(comp.common.sidebarDrawer).contains(common.save).click()
      .wait('@recordAdded')
      .get(comp.common.hideSidebar).click()
      .wait('@listLoaded')
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const finputValues = getFormValues($tr, [1,4,5,6]);
        expect(finputValues) 
          .to.have.members([
            inputsTexts.randomNumbers, 
            common.randomText,
            inputsTexts.ownerRandom,
            inputsTexts.title,
          ]);
      });
  }); 
});
