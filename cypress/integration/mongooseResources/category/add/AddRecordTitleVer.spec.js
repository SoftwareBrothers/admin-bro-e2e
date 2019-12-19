import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';
import faker from 'faker';

const { errorMsg } = common;
const { inputs, calendar, buttons, validationFields } = mongoose;

const nestedVal = faker.random.number()+'';
const owner = faker.random.word();
const nestedField = faker.random.word(); 


describe('Add incorrect filled record to the category', function(){
  it('return error when title field is empty', function() {
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(buttons.addIcon).click()
      .get(inputs.nestedValue).type(nestedVal)
      .get(inputs.nestedFiled).type(nestedField)
      .get(inputs.owner).type(owner)
      .get(inputs.createdAt).click()
      .get(calendar.openCalendar).find(calendar.today).click() 
      .get(buttons.save).contains(common.save).click() 
      .get(validationFields.validationInput).contains(errorMsg.titleField)
      .get(validationFields.validationDiv).should('be.visible').contains(errorMsg.validationDiv);
  });
});
