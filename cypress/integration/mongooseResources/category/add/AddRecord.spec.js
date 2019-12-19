
import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';
import { getFormValues,
} from '../../../../support/helpersMethods';
import faker from 'faker';

const { inputs, calendar, buttons, boardView } = mongoose;
const title = 'AA'+faker.name.firstName(); 
const nestedVal = faker.random.number()+'';
const owner = faker.random.word();
const nestedField = faker.random.word(); 

describe('Add record to the category',function(){
  it('Go to category and add record', function(){
    cy.loginSuccess()
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(buttons.addIcon).click()
      .get(inputs.title).type(title)
      .get(inputs.nestedValue).type(nestedVal)
      .get(inputs.nestedFiled).type(nestedField)
      .get(inputs.owner).type(owner) 
      .get(inputs.createdAt).click()
      .get(calendar.openCalendar).find(calendar.today).click()
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const finputValues = getFormValues($tr, [0,2,3,4]);
        expect(finputValues) 
          .to.have.members([
            title,
            nestedVal,
            owner,
            nestedField,
          ]);
      });
  }); 
});
