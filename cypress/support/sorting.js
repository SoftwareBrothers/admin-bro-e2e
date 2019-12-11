function sortBy(sortMethod) {
  cy.get('.is-sortable').contains(sortMethod).click();
}

Cypress.Commands.add('sortBy', sortBy);
