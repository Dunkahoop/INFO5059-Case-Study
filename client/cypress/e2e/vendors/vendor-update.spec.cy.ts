describe('vendor update test', () => {
    it('visits the vendor page and updates an employee', () => {
        cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'vendors').click();
    cy.contains('Duncan').click();
    cy.get("[type='phone']").clear();
    cy.get("[type='phone']").type('(555)555-8888');
    cy.get('form').submit();
    cy.contains('updated!');
    })
})