import comp from '../../support/components';
import { common } from '../../support/texts';

describe('[Auth - admin] Visit admin and authenticate', () => {
  it('Should visit admin, fills the login form and login', () => {
    cy.loginSuccess();
  });
  it('Should visit admin and provide wrong credentials', () => {
    cy.loginFail();
    cy.get(comp.common.messageBox)
      .contains(common.authFailed)
      .should('be.visible');
  });
});
