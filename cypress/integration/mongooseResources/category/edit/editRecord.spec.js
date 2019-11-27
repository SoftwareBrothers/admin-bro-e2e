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
const { inputsTexts,buttons: textButtons, errorMsg } = common;

describe('',function(){
  it('', function(){
    cy.loginSuccess() 
      .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
      .get(boardView.table).then($table=>{
        const title = $table.find(boardView.tableTds).eq(0);
        const id = $table.find(boardView.tableTds).eq(1);
        const nestedValue = $table.find(boardView.tableTds).eq(2);
        const nestedField = $table.find(boardView.tableTds).eq(3);
        const owner = $table.find(boardView.tableTds).eq(4);
        const createdAt = $table.find(boardView.tableTds).eq(5);
        cy.wrap(title).as('wrappedTitle');
        cy.wrap(id).as('wrappedId');
        cy.wrap(nestedValue).as('wrappedNestedValue');
        cy.wrap(nestedField).as('wrappedNestedField');
        cy.wrap(owner).as('wrappedOwner');
        cy.wrap(createdAt).as('wrappedCreatedAt');
      }) 
      .cy.get(boardView.tableTds).first().find('a').click()
      .get(buttons.edit).click()
      .get(inputs.title).clear().type(inputsTexts.title)
      .get(inputs.nestedValue).clear().type(inputsTexts.nestedValue)
      .get(inputs.nestedFiled).clear().type(inputsTexts.nestedField)
      .get(inputs.owner).clear().type(inputsTexts.ownerRandom)
      .get(inputs.owner).clear().type(inputsTexts.ownerRandom)
      .get(inputs.createdAt).click()
      .get(calendar.month).should('not.have.class', 'today').click()
      .get(buttons.save).contains(common.save).click()
      .get(buttons.back).click() 
      .get(boardView.table).then($table=>{
        const changedTitle = $table.find(boardView.tableTds).eq(0);
        const changedId = $table.find(boardView.tableTds).eq(1);
        const changedNestedValue = $table.find(boardView.tableTds).eq(2);
        const changedNestedField = $table.find(boardView.tableTds).eq(3);
        const changedOwner = $table.find(boardView.tableTds).eq(4);
        const changedCreatedAt = $table.find(boardView.tableTds).eq(5);
        const existingValues = [
          this.wrappedTitle.text(),
          this.wrappedId.text(),
          this.wrappedNestedValue.text(),
          this.wrappedNestedField.text(),
          this.wrappedOwner.text(),
          this.wrappedCreatedAt.text(),
        ];
        const currentValues = [
          changedTitle,
          changedId,
          changedNestedValue,
          changedNestedField,
          changedOwner,
          changedCreatedAt,
        ]; 
        cy.wrap(changedTitle).as('changedWrappedTitle');
        cy.wrap(changedId).as('wrappedId');
        cy.wrap(changedNestedValue).as('changedWrappedNestedVal');
        cy.wrap(changedNestedField).as('changedWrappedNestedField');
        cy.wrap(changedOwner).as('changedWrappedOwner');
        cy.wrap(changedCreatedAt).as('changedWrapedCreatedAt');
        console.log(changedWrappedTitle.text());
        ;});
  }); 
});
