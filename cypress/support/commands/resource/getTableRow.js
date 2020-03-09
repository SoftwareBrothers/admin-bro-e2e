/**
 * @typedef {object} GetTableResult
 * @property {string | object} [key: string]
 * @property {object} actions
 * @property {object} [actions.Edit]        edit action link
 * @property {object} [actions.Show]        show action link
 * @property {object} [actions.Delete]      delete action link
 * @property {object} [actions[key: string]]  any other resource action link
 */

/**
 * @param {number}  [rowNumber=1]     which row has to be parsed
 * @param {(result: GetTableResult) => void} callback
 */
const getTableRow = (rowNumber = 1, callback) => {
  return cy.get('table').then($table => {
    const rows = $table.find(`tbody tr:nth-child(${rowNumber}) > td`)
      .map((index, el) => {
        if (Cypress.$(el).find('> div').length) {
          return Cypress.$(el).find('> div').toArray().reduce((memo, div) => ({
            ...memo,
            [Cypress.$(div).find('label').text()]: Cypress.$(div).find('span').text(),
          }), {});
        }
        return el.textContent;
      });
    const columns = $table.find('thead tr > th')
      .map((index, el) => el.textContent);

    // manually assign the value for first and last columns
    columns[0] = 'checkbox';
    columns[columns.length - 1] = 'actions';

    const tableRowObject = columns.toArray().reduce((memo, column, index) => ({
      ...memo, [column]: rows[index],
    }), {});

    // actions contain regular links instead of texts
    tableRowObject['actions'] = $table.find(
      `tbody tr:nth-child(${rowNumber}) > td:last-child .dropdown-content a`,
    ).toArray().reduce((memo, el) => ({
      ...memo, [el.textContent]: el,
    }), {});
    
    callback(tableRowObject);
  });
};

Cypress.Commands.add('getTableRow', getTableRow);
