import faker from 'faker';
import { customized, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common } from '../../../../support/texts';
import { getFormValues } from '../../../../support/helpersMethods';
import comp from '../../../../support/components';
  
const { inputs, boardView } = customized;
let email = 'aaaaaa' + faker.internet.email().toLowerCase();

describe('Add record to the user (custom actions example)', function() {
  it('Go to user and add record', function() {
    cy.server()
      .route('POST', '/admin/api/resources/User/actions/new').as('userCreated')
      .route('GET', '/admin/api/resources/User/actions/list').as('listLoaded');

    cy.loginSuccess()
      .get(leftNavbar.customized.user).click()
      .get(comp.common.actionButton).contains(common.buttons.addNew).click()
      .get(inputs.email).type(email)
      .get(inputs.authPassword).type(faker.lorem.word())
      .get('button').contains(common.save).click()
      .wait('@userCreated')
      .get(comp.common.hideSidebar).click()
      .wait('@listLoaded')
      .get(boardView.tableTr).should('contain', email)
      .get(boardView.table).find(boardView.tableTr).eq(1).then($tr=>{ 
        const inputValues = getFormValues($tr, [1]);
        expect(inputValues[0]).to.eql(email);
      });
  }); 
});
  
