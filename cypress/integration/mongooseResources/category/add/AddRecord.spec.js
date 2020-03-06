import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common, navbarTexts } from '../../../../support/texts';
import { getFormValues } from '../../../../support/helpersMethods';
import comp from '../../../../support/components';
import faker from 'faker';

const { inputs, boardView } = mongoose;
const randomNumbers = faker.random.number();
const randomText =  faker.lorem.words(5);
const ownerRandom =  faker.name.firstName();
const title = faker.commerce.department();


describe('[Mongoose resources/ Category] Add record to the category', function () {
  it('Should go to category and add record', function () {
    cy.server()
      .route('POST', '/admin/api/resources/Category/actions/new').as('recordAdded')
      .route('GET', '/admin/api/resources/Category/actions/list').as('listLoaded');

    cy.loginSuccess()
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(comp.common.actionButton).contains(common.buttons.addNew).click()
      .get(inputs.title).type(title)
      .get(inputs.nestedValue).type(randomNumbers)
      .get(inputs.nestedField).type(randomText)
      .get(inputs.owner).type(ownerRandom)
      .get(comp.common.sidebarDrawer).contains(common.save).click()
      .wait('@recordAdded')
      .wait(1000)
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const finputValues = getFormValues($tr, [1,4,5,6]);
        expect(finputValues) 
          .to.have.members([
            randomNumbers.toString(), 
            randomText,
            ownerRandom,
            title,
          ]);
      });
      
  });
});
