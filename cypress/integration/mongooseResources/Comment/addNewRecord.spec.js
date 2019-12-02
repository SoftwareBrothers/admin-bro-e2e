import {
  mongoose,
  leftNavbar,
} from '../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../support/texts';

const { inputs, calendar, buttons, validationFields } = mongoose;
const { inputsTexts,buttons: textButtons, errorMsg } = common;

describe('Adding new record to comment', function(){
  it('New comment by click on add new button', function() {
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.comment).contains(navbarTexts.mongoose.comment).click()
      .get('.icomoon-add').click()
      .get('.css-1wy0on6').first().click()
      .wait(3000)
      .get('div').contains('Baby').first().click()
      .get('#content').type(inputsTexts.randomNumbers)
      .get('#flagged').click()
      .get(buttons.save).contains(common.save).click(); 

  });
});
