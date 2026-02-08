/// <reference types="cypress" />
Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:4200/#/login');

  cy.get('body').then(($body) => {
    if ($body.find('input').length) {
      cy.get('input', { timeout: 10000 }).first().should('be.visible').clear().type('test2@test.fr');
      cy.get('input[type="password"]', { timeout: 10000 }).should('be.visible').clear().type('testtest');
      cy.get('button, input[type="submit"]').contains(/connexion|se connecter|login/i).click({ force: true });
    }
  });

  cy.url({ timeout: 10000 }).should('include', '/');
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
    }
  }
}

export {};