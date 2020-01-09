import faker from 'faker';

import { mongoose } from '../../../../support/cssCommonSelectors';

const { buttons } = mongoose;

const DROPDOWN_SELECTOR = 'form .control > div > div';
const DROPDOWN_LIST_SELECTOR = 'form .control > div:last-child > div:last-child > div > div';

describe('Editing first comment record on the list',function(){
  it('Check does changed fields in records are applied on main page', function(){
    let tableValues;
    let newCategory;

    const newContent = faker.lorem.words(10);

    cy.loginSuccess()
      .clickResourceOnSidebar('Comment')
      .getTableRow(1, (tableRowObject => {
        tableValues = tableRowObject;
        tableValues.actions.Edit.click();
      }))
      .get('form #content').clear().type(newContent)
      .get(DROPDOWN_SELECTOR).click()
      .get(DROPDOWN_LIST_SELECTOR).then($elements => {
        const newCategoryEl = $elements.filter((index, el) => el.textContent !== tableValues.Category)[0]
        newCategory = newCategoryEl.textContent
        Cypress.$(newCategoryEl).click();
      })
      .get('form #flagged').click()
      .get(buttons.save).click()
      .wait(1000)
      .get(buttons.back).click() 
      .getTableRow(1, (newTableValues => {
        expect(newTableValues.Id).to.equal(tableValues.Id);
        expect(newTableValues.Content).to.equal(newContent);
        expect(newTableValues.Flagged).not.to.equal(tableValues.Flagged);
        expect(newTableValues.Category).to.equal(newCategory);
      }));
  });
});
