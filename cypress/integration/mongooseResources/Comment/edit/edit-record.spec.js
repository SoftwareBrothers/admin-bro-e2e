import faker from 'faker';
import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { navbarTexts } from '../../../../support/texts';
import components from '../../../../support/components';
import { routeListLoaded, routeRecordEditLoaded, routeRecordSaved } 
  from '../../../../support/route-requests';

const { inputs, boardView } = mongoose;

describe('[Moongose resources/ Comment] Editing first comment record on the list', function () {
  it('should check if changed fields are applied', function () {
    const newContent = faker.lorem.words(10);
    routeListLoaded('Comment');
    routeRecordEditLoaded('Comment');
    routeRecordSaved('Comment');

    cy.loginSuccess()
      .get(leftNavbar.mongoose.comment).contains(navbarTexts.mongoose.comment).click()
      .get(boardView.tableTr).eq(1).click()
      .get(inputs.content).invoke('val').then($content => {
        cy.wrap($content).as('originalContent');
      })
      .get(inputs.content).clear().type(newContent)
      .get(components.common.sidebarDrawer).contains('Save').click()
      .wait('@recordSaved')
      .get(boardView.tableTr).eq(1).click()
      .wait('@recordEditLoaded')
      .get(components.common.sidebarPanel).should('be.visible')
      .wait('@listLoaded')
      .get(inputs.content).invoke('val').then(content => {
        expect(this.originalContent).to.not.eql(content);
      });
  });
});
