describe('generate expense report test', () => {
  it('visits the generator page and selects a vendor and products', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Generator').click();
    cy.wait(500); // http call
    cy.get('mat-select[formcontrolname="vendor"]').click();
    cy.contains('Duncan Deals').click();
    cy.get('mat-select[formcontrolname="product"]').click();
    cy.contains('Cherry MX Blue Keyboard').click();
    cy.get('mat-select[formcontrolname="quantity"]').click();
    cy.get('mat-option').contains('1').click();
    cy.get('mat-select[formcontrolname="product"]').click();
    cy.contains('Nvidia RTX 3090 Ti').click();
    cy.get('mat-select[formcontrolname="quantity"]').click();
    cy.get('mat-option').contains('1').click();
    cy.get('mat-select[formcontrolname="product"]').click();
    cy.contains('AMD RX 7600').click();
    cy.get('mat-select[formcontrolname="quantity"]').click();
    cy.get('mat-option').contains('1').click();
    cy.contains('Save Order').click();
    cy.contains('added!');
  });
});
