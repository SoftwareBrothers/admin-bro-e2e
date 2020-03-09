import faker from 'faker';
import { customized, leftNavbar } from '../../../../support/cssCommonSelectors';
import { navbarTexts } from '../../../../support/texts';
import components from '../../../../support/components';
import { routeRecordLoaded, routeRecordEditLoaded, routeListLoaded } 
  from '../../../../support/route-requests';
  
const { inputs, boardView } = customized;
const editedEmail = faker.internet.email();
  
describe('[Customized resources/ User] Editing email in first record on the list', function () {
  it('should check if the email is changed', function () {
    routeRecordLoaded('User');
    routeRecordEditLoaded('User');
    routeListLoaded('User');

    cy.loginSuccess()  
      .get(leftNavbar.customized.user).contains(navbarTexts.customized.user).click()
      .get(boardView.tableTr).eq(1).click()
      .wait('@recordLoaded')
      .get(components.common.actionButton).contains('Edit').click()
      .get(inputs.email).invoke('val').then($text=>{
        cy.wrap($text).as('email');
      })
      .get(inputs.email).clear().type(editedEmail)
      .get(components.common.sidebarDrawer).contains('Save').click()
      .wait('@listLoaded')
      .get(components.common.sidebarPanel).should('not.be.visible')
      .get(boardView.tableTr).eq(1).click()
      .wait('@recordEditLoaded')
      .get(components.common.actionButton).contains('Edit').click()
      .get(inputs.email).invoke('val').then(text=>{
        expect(this.email).to.not.eql(text);
      });
  });
});
