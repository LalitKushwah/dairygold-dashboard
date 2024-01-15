/// <reference types="cypress" />

describe('Login Form', () => {
  it('should log in with valid credentials', () => {
    cy.visit('http://localhost:3000/'); // Assuming your login page is at the root path

    // Fill in the form fields
    cy.get('[name="username"]').type('adminho');
    cy.get('[name="password"]').type('dairygold@123');

    // Click the login button
    cy.get('button[id="login-btn"]').click();

    // Check if the page redirects to the home page after successful login
    cy.url().should('include', '/home');
  });

  it('should show an error message with invalid credentials', () => {
    cy.visit('http://localhost:3000/');

    // Fill in the form fields with invalid credentials
    cy.get('[name="username"]').type('invalid-username');
    cy.get('[name="password"]').type('invalid-password');

    // Click the login button
    cy.get('button[id="login-btn"]').click();

    // Check if an error message is displayed
    cy.get('.ant-message-error').should('be.visible');
  });
});
