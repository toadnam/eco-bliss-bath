describe('Smoke - Accès login', () => {
  it('Affiche les champs et boutons de commande', () => {
    cy.visit('http://localhost:4200/#/login');

    cy.get('input').first().should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains(/connexion|se connecter|login/i).should('be.visible');
  });
});

describe('Smoke - Page d\'accueil', () => {
  it('parcours utilisateur principal, Login => Produit => Ajout Panier', () => {
    cy.login();

    cy.contains('Voir les produits', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.contains('button, a', /^Consulter$/i, { timeout: 10000 })
      .first()
      .should('be.visible')
      .click();

    cy.contains('button, a', /ajouter au panier/i, { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.contains('a, button', /mon panier/i, { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.get('[data-cy="cart-line"]', { timeout: 10000 })
      .should('have.length.at.least', 1);
  });
});

describe('Sécurité - XSS sur le panier', () => {
  it("Ne doit pas exécuter de JavaScript injecté", () => {
    cy.login();

    cy.contains('Voir les produits').click();
    cy.contains(/^Consulter$/).first().click();
    cy.contains(/ajouter au panier/i).click();
    cy.contains(/mon panier/i).click();

    cy.on('window:alert', () => {
      throw new Error('Faille XSS détectée');
    });

    const payload = `"><img src=x onerror=alert(1)>`;

    cy.get('[data-cy="cart-input-lastname"]')
      .clear()
      .type(payload, { parseSpecialCharSequences: false });

    cy.get('[data-cy="cart-submit"]').click({ force: true });

    cy.get('[data-cy="cart-form"]').should('exist');
  });
});