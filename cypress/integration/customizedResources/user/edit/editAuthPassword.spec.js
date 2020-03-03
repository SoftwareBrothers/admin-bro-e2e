import faker from 'faker';
import { customized, leftNavbar } from '../../../../support/cssCommonSelectors';
import { common, navbarTexts } from '../../../../support/texts';
import comp from '../../../../support/components';
  
const { inputs, buttons, boardView } = customized;
const editedPassword = faker.lorem.words(2);
  
describe('Editing password in first record on the list', function () {
  it('should check if the password is changed', function () {
    cy.server()
      .route('GET', '/admin/api/resources/User/records/*/show').as('recordLoaded')
      .route('GET', '/admin/api/resources/User/records/*/edit').as('recordEditLoaded')
      .route('GET', '/admin/api/resources/User/actions/list').as('listLoaded');
    cy.loginSuccess()  
      .get(leftNavbar.customized.user).contains(navbarTexts.customized.user).click()
      .get(boardView.tableTr).eq(1).click()
      .wait('@recordLoaded')
      .get(comp.common.actionButton).contains('Edit').click()
      .get(inputs.authPassword).invoke('val').then($text=>{
        cy.wrap($text).as('authPassword');
      })
      .get(inputs.authPassword).clear().type(editedPassword)
      .get(comp.common.sidebarDrawer).contains('Save').click()
      .wait('@listLoaded')
      .get(comp.common.sidebarPanel).should('not.be.visible')
      .get(boardView.tableTr).eq(1).click()
      .wait('@recordEditLoaded')
      .get(comp.common.sidebarPanel).should('be.visible')
      .get(comp.common.actionButton).contains('Edit').click()
      .get(inputs.authPassword).invoke('val').then(text=>{
        expect(this.authPassword).to.not.eql(text);
      });
  });
});
