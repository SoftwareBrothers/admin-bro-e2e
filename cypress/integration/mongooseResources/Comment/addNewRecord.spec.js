import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';

const { inputs, calendar, buttons, validationFields } = mongoose;
const { inputsTexts,buttons: textButtons, errorMsg } = common;

describe('', function(){
  it('', function() {
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.comment).contains(navbarTexts.mongoose.comment).click()
      .get(buttons.addNew).contains(textButtons.addNew).click()
      .get(inputs.nestedValue).type(inputsTexts.randomNumbers)
      .get(inputs.nestedFiled).type(common.randomText)
      .get(inputs.owner).type(inputsTexts.ownerRandom)
      .get(inputs.createdAt).click()
      .get(calendar.todayClass).eq(2).click() 
      .get(buttons.save).contains(common.save).click() 
      .get(validationFields.validationInput).contains(errorMsg.titleField)
      .get(validationFields.validationDiv).should('be.visible').contains(errorMsg.validationDiv);
  });
});
