import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';

const { inputs, calendar, buttons, validationFields } = mongoose;
const { inputsTexts,errorMsg } = common;

describe('Add incorrect filled record to the category', function(){
  it('return error when title field is empty', function() {
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(buttons.addIcon).click()
      .get(inputs.nestedValue).type(inputsTexts.randomNumbers)
      .get(inputs.nestedFiled).type(common.randomText)
      .get(inputs.owner).type(inputsTexts.ownerRandom)
      .get(inputs.createdAt).click()
      .get(calendar.openCalendar).find(calendar.today).click() 
      .get(buttons.save).contains(common.save).click() 
      .get(validationFields.validationInput).contains(errorMsg.titleField)
      .get(validationFields.validationDiv).should('be.visible').contains(errorMsg.validationDiv);
  });
});
