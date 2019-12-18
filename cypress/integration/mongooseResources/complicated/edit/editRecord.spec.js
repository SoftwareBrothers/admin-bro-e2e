
import faker from 'faker';
import { leftNavbar, mongoose } from '../../../../support/cssCommonSelectors';
import { getTextFromChildElements } from '../../../../support/helpersMethods';
import { common, navbarTexts } from '../../../../support/texts';

const { inputs, buttons, boardView } = mongoose;

describe('Edit record on complicated section', function(){
  it('Check does changed fields in records are applied on main page', function(){
    const editedTitle = faker.name.firstName(); 
    const age = faker.random.number();
    const editedExtremlyNestedValue = faker.random.word();
    const editedBirthPlace = faker.address.city();
    const editedHeight = faker.random.number(); 

    cy.loginSuccess()
      .get(leftNavbar.mongoose.complicated).contains(navbarTexts.mongoose.complicated).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const name = getTextFromChildElements($tr,'td', [0]);
        cy.wrap(name).as('recordName');
        const id = getTextFromChildElements($tr,'td', [1]);
        cy.wrap(id).as('recordId');
        const info = getTextFromChildElements($tr.find(
          boardView.tableTdClass).eq(4),'span', [0,1,2,3]);
        cy.wrap(info).as('info');
      })
      .get(boardView.tableTds).first().find('a').click()
      .get(buttons.edit).click() 
      // adding double 'a' to be sure it will be first on the list
      .get(inputs.name).clear().type('Aa'+editedTitle) 
      .get(inputs.personAge).clear().type(age)
      .get(inputs.height).clear().type(editedHeight)
      .get(inputs.birthPlace).clear().type(editedBirthPlace)
      .get(inputs.extremlyNested).clear().type(editedExtremlyNestedValue)
      .get(buttons.save).contains(common.save).click()
      .wait(1000)
      .get(buttons.back).click()
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const nameId = getTextFromChildElements($tr,'td', [0]);
        const infoEdited = getTextFromChildElements($tr.find(
          boardView.tableTdClass).eq(4),'span', [0,1,2,3]);
        const id = getTextFromChildElements($tr,'td', [1]);
        expect(id).to.eql(this.recordId);
        expect(nameId).to.not.eql(this.recordName);
        expect(infoEdited).to.not.include.members(this.info);
      });
  }); 
});
