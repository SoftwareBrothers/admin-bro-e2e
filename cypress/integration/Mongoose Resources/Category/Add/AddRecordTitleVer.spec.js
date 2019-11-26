import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';

const { inputs, calendar, buttons, validationFields } = mongoose;
const { inputsTexts, validationTexts, buttons: textButtons } = common;

describe('Add record to the category', () => {
  it('Check title validation', () => {
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(buttons.addNew).contains(textButtons.addNew).click()
      .get(inputs.nestedValue).type(inputsTexts.randomNumbers)
      .get(inputs.nestedFiled).type(common.randomText)
      .get(inputs.owner).type(inputsTexts.ownerRandom)
      .get(inputs.createdAt).click()
      .get(calendar.todayClass).eq(2).click()
      .get(buttons.save).contains(common.save).click()
      .get(validationFields.inputValidationField).contains(validationTexts.titleField)
      .get(validationFields.disappearingDivValidation).should('be.visible').contains(validationTexts.disappearingDivValidation);
  });
});
