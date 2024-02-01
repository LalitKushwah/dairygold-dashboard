/// <reference types="cypress" />
describe('Delete order successfully', { testIsolation: false }, () => {
	const SCHEDULER_PAGE_URL = `${Cypress.env('BASE_URL')}/schedulers`;
	before(() => {
		cy.login();
		cy.visit(SCHEDULER_PAGE_URL);
	});
	it('Delete order successfully', () => {
		cy.get('button[id=delete-order]').click();
		// on blur show validation message
		cy.get('[name="orderId"]').focus();
		cy.get('[name="orderId"]').blur();
		cy.get('.ant-form-item-explain-error').should('be.visible');
		cy.get('button[id=confirm-order]').should('have.attr', 'disabled');
		cy.get('[name= "orderId"]').type('RRRRFFF');
		cy.get('button[id=confirm-order]').click();
		cy.contains('Yes').click();
		cy.contains('Cancel').click();
		cy.get('.ant-message-success').should('be.visible');
	});

	after( () => {
		cy.logout();
	})
});
