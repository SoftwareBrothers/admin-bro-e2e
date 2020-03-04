function compareFirstField (selector, expectedValue) {
  cy.get(selector).first().then($value => {
    const value = $value.text();
    expect(value).to.eql(expectedValue.toString());
  });
};

Cypress.Commands.add('compareFirstField', compareFirstField);
