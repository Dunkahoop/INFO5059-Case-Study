describe('product update test', () => {
    it('visits the product page and updates an employee', () => {
      cy.visit('/');
      cy.get('button').click();
      cy.contains('a', 'Products').click();
      cy.contains('Playstation 5 Pro').click();
      cy.get("input[formcontrolname=costprice]").clear();
      cy.get("input[formcontrolname=costprice]").type('650');
      cy.get('button').contains('Save').click();
      cy.contains('updated!');
    });
  });