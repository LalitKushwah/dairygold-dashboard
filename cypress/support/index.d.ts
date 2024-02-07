declare namespace Cypress {
  interface Chainable {
    login(usernameParam?: string, passwordParam?: string): void;
    logout(): void;
  }
}
