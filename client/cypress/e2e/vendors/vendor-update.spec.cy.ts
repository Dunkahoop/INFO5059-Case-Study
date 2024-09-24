describe('vendor update test', () => {
    it('visits the vendor page and updates an employee', () => {
        cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'vendors').click();
    cy.contains('Duncan').click();
    cy.get("[type='email']").clear();
    cy.get("[type='email']").type('ws@shacl.com');
    cy.get('form').submit();
    cy.contains('updated!');
    })
})