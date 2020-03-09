import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common, navbarTexts } from '../../../../support/texts';
import { getValuesFromTableRow } from '../../../../support/helpersMethods';
import components from '../../../../support/components';
import faker from 'faker';
import { routeRecordCreated, routeListLoaded } from '../../../../support/route-requests';

const { inputs, boardView } = mongoose;
const randomNumber = faker.random.number();
const randomText =  faker.lorem.words(5);
const randomOwner =  faker.name.firstName();
const title = faker.commerce.department();


describe('[Mongoose resources/ Category] Add record to the category', function () {
  it('Should go to category and add record', function () {
    routeRecordCreated('Category');

    cy.loginSuccess()
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(components.common.actionButton).contains(common.buttons.addNew).click()
      .get(inputs.title).type(title)
      .get(inputs.nestedValue).type(randomNumber)
      .get(inputs.nestedField).type(randomText)
      .get(inputs.owner).type(randomOwner)
      .get(components.common.sidebarDrawer).contains(common.save).click()
      .wait('@recordCreated')
      .wait(1000)
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const finputValues = getValuesFromTableRow($tr, [1,4,5,6]);
        expect(finputValues) 
          .to.have.members([
            randomNumber.toString(), 
            randomText,
            randomOwner,
            title,
          ]);
      });
      
  });
});
