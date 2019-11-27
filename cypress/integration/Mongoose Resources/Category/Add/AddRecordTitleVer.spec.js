import {
  mongoose,
  leftNavbar
} from '../../../../support/cssCommonSelectors'
import {
  common,
  navbarTexts
} from '../../../../support/texts'

<<<<<<< HEAD
const { inputs, calendar, buttons, validationFields } = mongoose
const { inputsTexts, validationTexts, buttons: textButtons } = common
=======
const { inputs, calendar, buttons, validationFields } = mongoose;
const { inputsTexts,buttons: textButtons, errorMsg } = common;
>>>>>>> 0f91b9a... changes added with Marek plus lint fixes, also changed lint to 100 max-len

describe('Add record to the category', () => {
  it('return error wjh', () => {
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
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