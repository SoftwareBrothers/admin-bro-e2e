
import faker from 'faker'

import { mongoose } from '../../../../support/cssCommonSelectors';
import { common } from '../../../../support/texts';

const { inputs, buttons} = mongoose;

describe('Add record to the complicated', () => {
  it('Create record with basic info only', () => {
    const newComplicated = {
      name: faker.name.firstName('male'),
      personAge: 18,
      height: 82,
      birthPlace: faker.address.city(),
      extremlyNested: 11,
    }

    cy.loginSuccess()
      .clickResourceOnSidebar('Complicated')
      .get(buttons.addIcon).click()
      .get(inputs.name).type(newComplicated.name) 
      .get(inputs.personAge).type(newComplicated.personAge)
      .get(inputs.height).type(newComplicated.height)
      .get(inputs.birthPlace).type(newComplicated.birthPlace)
      .get(inputs.extremlyNested).type(newComplicated.extremlyNested)
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click()
      .getTableRow(1, (formValues => {
        expect(formValues.Name).to.equal(newComplicated.name)
        expect(formValues['Nested Details']['Person age: ']).to.equal(
          newComplicated.personAge.toString())
        expect(formValues['Nested Details']['Height: ']).to.equal(
          newComplicated.height.toString())
        expect(formValues['Nested Details']['Place Of Birth: ']).to.equal(
          newComplicated.birthPlace)
        expect(formValues['Nested Details']['Nested: This nesting is crazy: ']).to.equal(
          newComplicated.extremlyNested.toString())
      }))
  }); 
});
