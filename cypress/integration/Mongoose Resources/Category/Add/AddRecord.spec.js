describe('Add record to the category', () => {
      it('Go to category and add record', () => {
          cy.loginSuccess()
            .get('li').contains('category').click()
            .get('.button').contains('Add new').click()
            .get('#title').type('something')
            .get('[name="nested.value"]').type('123')
            .get('[name="nested.field"]').type('something')
            .get('#owner').type('owner1')
            .get('#createdAt').click()
            .get('.pickadate').click()
            .get('.today').eq(2).click()
            .get('.button').contains('save

              ').click();
            });
      });