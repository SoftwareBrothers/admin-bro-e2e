
import faker from 'faker';
import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common } from '../../../../support/texts';
import comp from '../../../../support/components';

const { inputs } = mongoose;

describe('Add record to the complicated', () => {
  it('Create record with basic info only', () => {
    const newComplicated = {
      name: faker.name.firstName('male'),
      personAge: 18,
      height: 82,
      birthPlace: faker.address.city(),
      extremlyNested: 11,
    };
    
    cy.server()
      .route('POST', '/admin/api/resources/Complicated/actions/new').as('recordSaved');

    cy.loginSuccess()
      .get(leftNavbar.mongoose.complicated).click()
      .get(comp.common.actionButton).contains(common.buttons.addNew).click()
      .get(inputs.name).type(newComplicated.name) 
      .get(inputs.personAge).type(newComplicated.personAge)
      .get(inputs.height).type(newComplicated.height)
      .get(inputs.birthPlace).type(newComplicated.birthPlace)
      .get(inputs.extremlyNested).type(newComplicated.extremlyNested)
      .get(comp.common.sidebarDrawer).contains(common.buttons.save).click()
      .wait('@recordSaved')
      .compareFirstField(comp.complicated.name, newComplicated.name)
      .compareFirstField(comp.complicated.birthPlace, newComplicated.birthPlace)
      .compareFirstField(comp.complicated.extremelyNested, newComplicated.extremlyNested);
  });
});
