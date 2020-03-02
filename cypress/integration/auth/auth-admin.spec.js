import comp from '../../support/components';
import { common } from '../../support/texts';

describe('Visit admin and authenticate', () => {
  it('Visits admin, fills the login form and login', () => {
    cy.loginSuccess();
  });
  it('Visit admin and provide wrong credentials', () => {
    cy.loginFail();
    cy.get(comp.common.messageBox)
      .contains(common.authFailed)
      .should('be.visible');
  });
});
