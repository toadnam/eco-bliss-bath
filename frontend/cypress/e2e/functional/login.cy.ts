describe('Fonctionnel - Connexion utilisateur', () => {
  it('Connexion avec identifiants valides', () => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit('http://localhost:4200/#/login');

    cy.intercept('POST', 'http://localhost:8081/login').as('loginRequest');

    cy.contains('Email').next('input').type('test2@test.fr');
    cy.contains('Mot de passe').next('input').type('testtest');

    cy.contains('button', 'Se connecter').should('be.visible').click();

    cy.wait('@loginRequest', { timeout: 10000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.contains('Mon panier', { timeout: 10000 }).should('be.visible');
    cy.contains('Déconnexion').should('be.visible');
  });
});