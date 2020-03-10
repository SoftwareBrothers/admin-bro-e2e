import faker from 'faker';
import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common } from '../../../../support/texts';
import components from '../../../../support/components';
import { routeRecordCreated } from '../../../../support/route-requests';

const { inputs } = mongoose;

describe('[Mongoose resources/ Complicated] Add record to the complicated', function () {
  it('Should create record with basic info only', function () {
    const newComplicated = {
      name: faker.name.firstName(),
      personAge: faker.random.number({ min: 1, max: 110 }),
      height: faker.random.number({ min: 80, max: 230 }),
      birthPlace: faker.address.city(),
      extremlyNested: faker.random.number(),
    };
    
    routeRecordCreated('Complicated');
    
    cy.loginSuccess()
      .get(leftNavbar.mongoose.complicated).click()
      .get(components.common.actionButton).contains(common.buttons.addNew).click()
      .get(inputs.name).type(newComplicated.name) 
      .get(inputs.personAge).type(newComplicated.personAge)
      .get(inputs.height).type(newComplicated.height)
      .get(inputs.birthPlace).type(newComplicated.birthPlace)
      .get(inputs.extremlyNested).type(newComplicated.extremlyNested)
      .get(components.common.sidebarDrawer).contains(common.buttons.save).click()
      .wait('@recordCreated')
      .compareFirstField(components.common.nameList, newComplicated.name)
      .compareFirstField(components.complicated.birthPlace, newComplicated.birthPlace)
      .compareFirstField(components.complicated.extremelyNested, newComplicated.extremlyNested);
  });
});
