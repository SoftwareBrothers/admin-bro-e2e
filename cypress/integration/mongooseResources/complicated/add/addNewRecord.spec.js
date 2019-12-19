
import { leftNavbar, mongoose } from '../../../../support/cssCommonSelectors';
import { getTextFromChildElements } from '../../../../support/helpersMethods';
import { common, navbarTexts } from '../../../../support/texts';
import faker from 'faker';

const { inputs, buttons, boardView } = mongoose;
const { inputsTexts  } = common;
const name = ' '+faker.name.firstName(); 
const age = faker.random.number()+'';
const city = faker.address.city();
const height = faker.random.number()+''; 
const extremNested = faker.random.word(); 


describe('Add record to the complicated', function(){
  it('Create record with basic info only', function(){
    cy.loginSuccess()
      .get(leftNavbar.mongoose.complicated).contains(navbarTexts.mongoose.complicated).click()
      .get(buttons.addIcon).click()
      .get(inputs.name).type(name) 
      .get(inputs.personAge).type(age)
      .get(inputs.height).type(height)
      .get(inputs.birthPlace).type(city)
      .get(inputs.extremlyNested).type(extremNested)
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const nameField = $tr.find(boardView.tableTdClass).eq(0);
        expect(nameField.text()).to.be.eql(name);
        // extracting texts from spans inside td which contains all info typed above 
        const info = getTextFromChildElements($tr.find(
          boardView.tableTdClass).eq(4),'span', [0,1,2,3]);
        expect(info).to.include.members([
          age,
          city,
          height,
          extremNested,
        ]); 
      });
  }); 
});
