import faker from 'faker'

import { mongoose } from '../../../../support/cssCommonSelectors';

const { buttons } = mongoose;

const CATEGORY_DROPDOWN_SELLECTOR = 'form .control > div > div'
const CATEGORY_DROPDOWN_LIST_SELECTOR = 'form .control > div:last-child > div:last-child > div > div'

describe('Editing first comment record on the list',function(){
  it('Check does changed fields in records are applied on main page', function(){
    let formValues;
    let newCategory

    const newContent = faker.lorem.words(10)

    cy.loginSuccess()
      .clickResourceOnSidebar('Comment')
      .getTableRow(1, (tableRowObject => {
        formValues = tableRowObject
        formValues.actions.Edit.click()
      }))
      .get('form #content').clear().type(newContent)
      .get(CATEGORY_DROPDOWN_SELLECTOR).click()
      .get(CATEGORY_DROPDOWN_LIST_SELECTOR).then($elements => {
        newCategory = $elements.first().text()
        $elements.first().click()
      })
      .get('form #flagged').click()
      .get(buttons.save).click()
      .wait(1000)
      .get(buttons.back).click() 
      .getTableRow(1, (newFormValues => {
        expect(newFormValues.Content).to.equal(newContent)
        expect(newFormValues.Id).to.equal(formValues.Id)
        expect(newFormValues.Flagged).not.to.equal(formValues.Flagged)
        expect(newFormValues.Category).to.equal(newCategory)
      }))
  });
});
