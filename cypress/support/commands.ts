/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => {
  const username = Cypress.env('USERNAME');
  const password = Cypress.env('PASSWORD');
  cy.visit(Cypress.env('BASE_URL'));
  // Enter username and password
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  // Click the login button
  cy.get('button[id="login-btn"]').click();
  cy.log('Logged in successfully.')
  cy.url().should('include', '/home');
});


Cypress.Commands.add('logout', () => {
  cy.visit(`${Cypress.env('BASE_URL')}/home`);
  // Enter username and password
  // Click the login button
  cy.get('button[id="logout"]').click();
  cy.url().should('include', '/');
  cy.log('Logged out successfully.')
});