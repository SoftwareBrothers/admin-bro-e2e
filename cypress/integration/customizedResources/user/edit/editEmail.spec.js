import faker from 'faker';
import { customized, leftNavbar } from '../../../../support/cssCommonSelectors';
import { navbarTexts } from '../../../../support/texts';
  
import comp from '../../../../support/components';
  
const { inputs, boardView } = customized;
const editedEmail = 'aaaa' + faker.internet.email().toLowerCase();
  
describe('[Customized resources/ User] Editing email in first record on the list', function () {
  it('should check if the email is changed', function () {
    cy.server()
      .route('GET', '/admin/api/resources/User/records/*/show').as('recordLoaded')
      .route('GET', '/admin/api/resources/User/records/*/edit').as('recordEditLoaded')
      .route('GET', '/admin/api/resources/User/actions/list').as('listLoaded');
    cy.loginSuccess()  
      .get(leftNavbar.customized.user).contains(navbarTexts.customized.user).click()
      .get(boardView.tableTr).eq(1).click()
      .wait('@recordLoaded')
      .get(comp.common.actionButton).contains('Edit').click()
      .get(inputs.email).invoke('val').then($text=>{
        cy.wrap($text).as('email');
      })
      .get(inputs.email).clear().type(editedEmail)
      .get(comp.common.sidebarDrawer).contains('Save').click()
      .wait('@listLoaded')
      .get(comp.common.sidebarPanel).should('not.be.visible')
      .get(boardView.tableTr).eq(1).click()
      .wait('@recordEditLoaded')
      // .get(comp.common.sidebarPanel).should('be.visible')
      .get(comp.common.actionButton).contains('Edit').click()
      .get(inputs.email).invoke('val').then(text=>{
        expect(this.email).to.not.eql(text);
      });
  });
});
