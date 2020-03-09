import faker from 'faker';
import { customized, leftNavbar } from '../../../../support/cssCommonSelectors';
import { navbarTexts } from '../../../../support/texts';
import components from '../../../../support/components';
import { routeRecordLoaded, routeRecordEditLoaded, routeListLoaded } 
  from '../../../../support/route-requests';
  
const { inputs, boardView } = customized;
const editedPassword = faker.internet.password();
  
describe('[Customized resources/ User] Editing password in first record on the list', function () {
  it('should check if the password is changed', function () {
    routeListLoaded('User');
    routeRecordEditLoaded('User');
    routeRecordLoaded('User');

    cy.loginSuccess()  
      .get(leftNavbar.customized.user).contains(navbarTexts.customized.user).click()
      .get(boardView.tableTr).eq(1).click()
      .wait('@recordLoaded')
      .get(components.common.actionButton).contains('Edit').click()
      .get(inputs.authPassword).invoke('val').then($text=>{
        cy.wrap($text).as('authPassword');
      })
      .get(inputs.authPassword).clear().type(editedPassword)
      .get(components.common.sidebarDrawer).contains('Save').click()
      .wait('@listLoaded')
      .get(components.common.sidebarPanel).should('not.be.visible')
      .get(boardView.tableTr).eq(1).click()
      .wait('@recordEditLoaded')
      .get(components.common.actionButton).contains('Edit').click()
      .get(inputs.authPassword).invoke('val').then(text=>{
        expect(this.authPassword).to.not.eql(text);
      });
  });
});
