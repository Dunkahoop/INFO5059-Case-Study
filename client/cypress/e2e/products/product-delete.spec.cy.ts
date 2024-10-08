describe('product delete test', () => {
    it('visits the product page and deletes an product', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Products').click();
    cy.contains('D369').click();
    cy.get('button').contains('Delete').click();
    cy.contains('deleted!');
    });
   });