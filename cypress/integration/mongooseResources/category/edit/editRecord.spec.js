import faker from 'faker';
import { mongoose, leftNavbar } from '../../../../support/cssCommonSelectors';
import { navbarTexts } from '../../../../support/texts';
import comp from '../../../../support/components';

const { inputs, boardView } = mongoose;

describe('[Mongoose resources/ Category] Editing first record on the list', function () {
  it('Should edit fields and check if changes are applied', function () {
    let editedTitle = 'aaa' + faker.name.jobTitle();
    let editedNestedValue = faker.random.number();
    let editedNestedField = 'aaa' + faker.random.number();
    let editedOwner = 'aaa' + faker.name.lastName();

    cy.server()
      .route('GET', '/admin/api/resources/Category/actions/list').as('listLoaded')
      .route('GET', '/admin/api/resources/Category/records/*/show').as('recordLoaded')
      .route('GET', '/admin/api/resources/Category/actions/*/edit').as('recordEditLoaded');

    cy.loginSuccess()
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(boardView.tableTr).eq(1).click()
      .wait('@recordLoaded')
      .get(comp.common.actionButton).contains('Edit').click()
      .get(inputs.title).invoke('val').then($title => {
        cy.wrap($title).as('title');
      })
      .get(inputs.nestedValue).invoke('val').then($nestedValue => {
        cy.wrap($nestedValue).as('nestedValue');
      })
      .get(inputs.nestedField).invoke('val').then($nestedField => {
        cy.wrap($nestedField).as('nestedField');
      })
      .get(inputs.owner).invoke('val').then($owner => {
        cy.wrap($owner).as('owner');
      })
      .get(inputs.title).clear().type(editedTitle)
      .get(inputs.nestedValue).clear().type(editedNestedValue)
      .get(inputs.nestedField).clear().type(editedNestedField)
      .get(inputs.owner).clear().type(editedOwner)
      .get(comp.common.sidebarDrawer).contains('Save').click()
      .wait('@listLoaded')
      .get(comp.common.sidebarPanel).should('not.be.visible')
      .get(boardView.tableTr).eq(1).click()
      .wait('@recordLoaded')
      .get(comp.common.sidebarPanel).should('be.visible')
      .get(comp.common.actionButton).contains('Edit').click()
      .get(inputs.title).invoke('val').then(editedTitle=>{
        expect(this.title).to.not.eql(editedTitle);
      })
      .get(inputs.nestedValue).invoke('val').then(editedNestedValue=>{
        expect(this.nestedValue).to.not.eql(editedNestedValue);
      })
      .get(inputs.nestedField).invoke('val').then(editedNestedField=>{
        expect(this.nestedFIeld).to.not.eql(editedNestedField);
      })
      .get(inputs.owner).invoke('val').then(editedOwner=>{
        expect(this.owner).to.not.eql(editedOwner);
      });
  });  
});
