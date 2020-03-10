import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common, navbarTexts } from '../../../../support/texts';
import components from '../../../../support/components';

const { inputs } = mongoose;
const { inputsTexts,errorMsg } = common;

describe('[Mongoose resources/ Category] Add incorrect record to the category', function () {
  it('should return error when title field is empty', function () {
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(components.common.actionButton).contains(common.buttons.addNew).click()
      .get(inputs.nestedValue).type(inputsTexts.randomNumbers)
      .get(inputs.nestedField).type(common.randomText)
      .get(inputs.owner).type(inputsTexts.ownerRandom)
      .get(components.common.sidebarDrawer).contains(common.save).click() 
      .get(components.common.title).next().contains(errorMsg.titleField)
      .get(components.common.messageBox).should('be.visible').contains(errorMsg.validationDiv);
  });
});
