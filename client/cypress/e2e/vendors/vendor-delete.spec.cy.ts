describe('vendor delete test', () => {
    it('visits the vendor page and deletes an vendor', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Vendors').click();
    cy.contains('Widget Shack').click();
    cy.get('button').contains('Delete').click();
    cy.contains('deleted!');
    });
   });