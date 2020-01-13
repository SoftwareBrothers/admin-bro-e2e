/**
 * Clicks resource icon in the sidebar
 * 
 * @param {string} resourceId         unique id of a resource which is in the action URL
 */
const clickResourceOnSidebar = resourceId => {
  return cy.get(`#app aside a[href="/admin/resources/${resourceId}/actions/list"]`).click();
};

Cypress.Commands.add('clickResourceOnSidebar', clickResourceOnSidebar);
