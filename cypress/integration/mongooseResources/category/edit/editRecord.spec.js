import faker from 'faker';
import { leftNavbar, mongoose } from '../../../../support/cssCommonSelectors';
import { getFormValues } from '../../../../support/helpersMethods';
import { common, navbarTexts } from '../../../../support/texts';


const { inputs, calendar, buttons, boardView } = mongoose;

describe('Editing first record on the list',function(){
  it('Check does changed fields in records are applied on main page', function(){
    let formValues;
    let editedTitle = 'aaa' + faker.name.jobTitle(); // to be fixed later
    let editedNestedValue = faker.random.number();
    let editedNestedField = 'aaa' + faker.random.number(); // to be fixed later
    let editedOwner = 'aaa' + faker.name.lastName(); // to be fixed later

    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{
        // numbers here represents indexes of tdsfrom first tr, with title etc
        formValues = getFormValues($tr, [0,2,3,4,5]);
      })
      .get(boardView.tableTds).first().find('a').click()
      .get(buttons.edit).click()
      .get(inputs.title).clear().type(editedTitle)
      .get(inputs.nestedValue).clear().type(editedNestedValue)
      .get(inputs.nestedFiled).clear().type(editedNestedField)
      .get(inputs.owner).clear().type(editedOwner)
      .get(inputs.createdAt).click() 
      .get(calendar.month).should('not.have.class', 'today').click() 
      .get(buttons.save).contains(common.save).click()
      .wait(3000)
      .get(buttons.back).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{
        // numbers here represents indexes of tdsfrom first tr, with title etc
        const formValuesChanged = getFormValues($tr, [0,2,3,4,5]);
        expect(formValues).to.not.eql(formValuesChanged);  
      });
  });  
}); 
