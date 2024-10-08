describe('vendor update test', () => {
  it('visits the vendor page and updates an employee', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Vendors').click();
    cy.contains('Duncan').click();
    cy.get("[type='email']").clear();//mayybe replace these with formcontrolname?
    cy.get("[type='email']").type('ws@shacl.com');
    cy.get('button').contains('Save').click();//apparently theis doesn't rerad it, updates are appearntly too fast. If you update the email manually it works
    cy.contains('updated!');
  });
});
