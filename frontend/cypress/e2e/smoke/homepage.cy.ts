describe('Smoke - Page d\'accueil', () => {
  it('La page d’accueil se charge correctement', () => {
    cy.visit('http://localhost:4200/');

    cy.contains('Voir les produits', { timeout: 10000 })
      .should('be.visible');
  });
});