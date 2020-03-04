import faker from 'faker';
import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { navbarTexts } from '../../../../support/texts';
import comp from '../../../../support/components';

const { inputs, boardView } = mongoose;

describe('[Moongose resources - Comment] Editing first comment record on the list', function () {
  it('should check if changed fields are applied', function () {
    const newContent = faker.lorem.words(10);
    cy.server()
      .route('GET', '/admin/api/resources/Comment/actions/list').as('listLoaded')
      .route('POST', '/admin/api/resources/Comment/records/*/edit').as('recordSaved')
      .route('GET', '/admin/api/resources/Comment/records/*/edit').as('recordEditLoaded');

    cy.loginSuccess()
      .get(leftNavbar.mongoose.comment).contains(navbarTexts.mongoose.comment).click()
      .get(boardView.tableTr).eq(1).click()
      .get(inputs.content).invoke('val').then($content => {
        cy.wrap($content).as('originalContent');
      })
      .get(inputs.content).clear().type(newContent)
      .get(comp.common.sidebarDrawer).contains('Save').click()
      .wait('@recordSaved')
      .get(boardView.tableTr).eq(1).click()
      .get(comp.common.sidebarPanel).should('be.visible')
      .get(inputs.content).invoke('val').then(content => {
        expect(this.originalContent).to.not.eql(content);
      });
  });
});
