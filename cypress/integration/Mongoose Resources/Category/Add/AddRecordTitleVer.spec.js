import {MOONGOOSE} from "./../../../../support/cssCommonSelectors"
import {LEFT_NAVBAR} from "./../../../../support/cssCommonSelectors"
import {NAVBAR_TEXTS} from "./../../../../support/texts"
import {COMMON} from "./../../../../support/texts"





const INPUTS = MOONGOOSE.INPUTS;
const CALENDAR = MOONGOOSE.CALENDAR; 
const BUTTONS = MOONGOOSE.BUTTONS;
const VALIDATION_FIELDS = MOONGOOSE.VALIDATION_FIELDS;
const MONGOOSE_TEXT = NAVBAR_TEXTS.MONGOOSE;
const TEXT_BUTTONS = COMMON.BUTTONS;
const TEXT_VALIDATION = COMMON.VALIDATION_TEXTS;
const INPUT_TEXTS = COMMON.INPUTS_TEXTS


describe('Add record to the category', () => {
  it('Check title validation', () => {
    cy.loginSuccess()
      .get(LEFT_NAVBAR.MONGOOSE.CATEGORY).contains(MONGOOSE_TEXT.CATEGORY).click()
      .get(BUTTONS.ADD_NEW).contains(TEXT_BUTTONS.ADD_NEW).click()
      .get(INPUTS.NESTED_VALUE).type(INPUT_TEXTS.RANDOME_NUMBERS)
      .get(INPUTS.NESTED_FILED).type(COMMON.RANDOME_TEXT)
      .get(INPUTS.OWNER).type(COMMON.RANDOME_TEXT)
      .get(INPUTS.CREATED_AT).click()
      .get(CALENDAR.TODAY_CLASS).eq(2).click()
      .get(BUTTONS.SAVE).contains(COMMON.SAVE).click()
      .get(VALIDATION_FIELDS.INPUT_VALIDATION_FIELD).contains(TEXT_VALIDATION.TITLE_FIELD)
      .get(VALIDATION_FIELDS.DISAPPEARING_DIV_VALIDATION).should('be.visible').contains(TEXT_VALIDATION.DISAPPEARING_DIV_VALIDATION);
  });  
});