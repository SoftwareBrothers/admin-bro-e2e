import faker from 'faker';
import { customized, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common } from '../../../../support/texts';
import { getValuesFromTableRow } from '../../../../support/helpersMethods';
import components from '../../../../support/components';
import { routeRecordCreated } from '../../../../support/route-requests';
  
const { inputs, boardView } = customized;
const email = faker.internet.email();

describe('[Customized resources/ User] Add record to the user', function() {
  it('Should go to user and add record', function() {
    routeRecordCreated('User', 'userCreated');
  
    cy.loginSuccess()
      .get(leftNavbar.customized.user).click()
      .get(components.common.actionButton).contains(common.buttons.addNew).click()
      .get(inputs.email).type(email)
      .get(inputs.authPassword).type(faker.internet.password())
      .get('button').contains(common.save).click()
      .wait('@userCreated')
      .wait(1000)
      .get(boardView.tableTr).should('contain', email.toLowerCase())
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const inputValues = getValuesFromTableRow($tr, [1]);
        expect(inputValues[0]).to.eql(email.toLowerCase());
      });
  }); 
});
  
