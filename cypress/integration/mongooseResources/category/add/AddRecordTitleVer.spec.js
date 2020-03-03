import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common, navbarTexts } from '../../../../support/texts';
import comp from '../../../../support/components';

const { inputs } = mongoose;
const { inputsTexts,errorMsg } = common;

describe('Add incorrect filled record to the category', function () {
  it('should return error when title field is empty', function () {
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(comp.common.actionButton).contains(common.buttons.addNew).click()
      .get(inputs.nestedValue).type(inputsTexts.randomNumbers)
      .get(inputs.nestedField).type(common.randomText)
      .get(inputs.owner).type(inputsTexts.ownerRandom)
      .get(comp.common.sidebarDrawer).contains(common.save).click() 
      .get(comp.common.title).next().contains(errorMsg.titleField)
      .get(comp.common.messageBox).should('be.visible').contains(errorMsg.validationDiv);
  });
});
