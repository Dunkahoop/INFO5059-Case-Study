describe('product page test', () => {
  it('Visits the product project page', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Products').click();
    cy.contains('control_point').click();
    cy.get('input[formcontrolname=id]').click({ force: true }).type('D369');
    cy.get('mat-select[formcontrolname="vendorid"]').click({ force: true });
    cy.get('mat-option').contains('Duncan Deals').click();
    cy.get('input[formcontrolname=name]')
      .click({ force: true })
      .type('Playstation 5 Pro');
    cy.get('input[formcontrolname=costprice]')
      .click({ force: true })
      .type('500');
      cy.get('input[formcontrolname=msrp]').click({ force: true }).type('700');
      cy.get('.mat-expansion-indicator').eq(0).click();//this may be unnecessary since the first expansion closes upon opening the second
 cy.get('.mat-expansion-indicator').eq(1).click();
      //this works too
      //cy.contains('Inventory Information').click();
  cy.get('input[formcontrolname=rop]').click({ force: true }).type('2');
  cy.get('input[formcontrolname=eoq]').click({ force: true }).type('10');
  cy.get('input[formcontrolname=qoh]').click({ force: true }).type('12');
  cy.get('input[formcontrolname=qoo]').click({ force: true }).type('20');
  cy.get('button').contains('Save').click();
    cy.contains('created!');
  });
});
