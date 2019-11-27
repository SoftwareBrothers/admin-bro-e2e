import {
  mongoose,
  leftNavbar,
} from '../../../../support/cssCommonSelectors';
import {
  common,
  navbarTexts,
} from '../../../../support/texts';

import { isEqual } from 'lodash';

const { inputs, calendar, buttons, boardView } = mongoose;
const { inputsTexts } = common;

describe('',function(){
  it('', function(){
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(boardView.table).then($table=>{
        const title = $table.find(boardView.tableTds).eq(0).text();
        const id = $table.find(boardView.tableTds).eq(1).text();
        const nestedValue = $table.find(boardView.tableTds).eq(2).text();
        const nestedField = $table.find(boardView.tableTds).eq(3).text();
        const owner = $table.find(boardView.tableTds).eq(4).text();
        const createdAt = $table.find(boardView.tableTds).eq(5).text();
        cy.wrap(title).as('wrappedTitle');
        cy.wrap(id).as('wrappedId');
        cy.wrap(nestedValue).as('wrappedNestedValue');
        cy.wrap(nestedField).as('wrappedNestedField');
        cy.wrap(owner).as('wrappedOwner');
        cy.wrap(createdAt).as('wrappedCreatedAt');
      });
    cy.get(boardView.tableTds).first().find('a').click()
      .get(buttons.edit).click()
      .get(inputs.title).clear().type(inputsTexts.title)
      .get(inputs.nestedValue).clear().type(inputsTexts.nestedValue)
      .get(inputs.nestedFiled).clear().type(inputsTexts.nestedField)
      .get(inputs.owner).clear().type(inputsTexts.ownerRandom)
      .get(inputs.createdAt).click() 
      .get(calendar.month).should('not.have.class', 'today').click()
      .get(buttons.save).contains(common.save).click()
      .wait(3000)
      .get(buttons.back).click() 
      .get(boardView.table).then($table=>{
        const changedTitle = $table.find(boardView.tableTds).eq(0).text();
        const id = $table.find(boardView.tableTds).eq(1).text();
        const changedNestedValue = $table.find(boardView.tableTds).eq(2).text();
        const changedNestedField = $table.find(boardView.tableTds).eq(3).text();
        const changedOwner = $table.find(boardView.tableTds).eq(4).text();
        const changedCreatedAt = $table.find(boardView.tableTds).eq(5).text();
        const existingValues = [
          this.wrappedTitle,
          this.wrappedNestedValue, 
          this.wrappedNestedField,
          this.wrappedOwner,
          this.wrappedCreatedAt,
        ];
        const currentValues = [
          changedTitle,
          changedNestedValue,
          changedNestedField,
          changedOwner,
          changedCreatedAt,
        ]; 
        expect(id).equal(this.wrappedId);
        expect(isEqual(existingValues, currentValues)).not.to.equal(true)
        ;});
  });  
});
