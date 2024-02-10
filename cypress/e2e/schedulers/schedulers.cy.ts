/// <reference types="cypress" />
describe('Scheduler', () => {
	const schedulers = [
		{
			name: 'Update Products',
			btnId: 'update-product',
		},
		{
			name: 'Create Products',
			btnId: 'create-product',
		},
		{
			name: 'Create Customers',
			btnId: 'create-customer',
		},
		{
			name: 'Update Customers',
			btnId: 'update-customer',
		},
		{
			name: 'Update Sales tree',
			btnId: 'update-sales-tree',
		},
		{
			name: 'Update customer dashboard',
			btnId: 'update-customer-dashboard',
		},
		{
			name: 'Update parent id',
			btnId: 'update-parent-id',
		},
		{
			name: 'Update customer statement',
			btnId: 'update-customer-statement',
		},
		{
			name: 'Update customer invoice',
			btnId: 'update-customer-invoice',
		},
		{
			name: 'Update non-customers dashboard',
			btnId: 'update-non-customer-dashboard',
		},
		{
			name: 'Map categories to sales executive',
			btnId: 'map-cartegory-to-sm',
		},
		{
			name: 'Map salesman to salesmanager',
			btnId: 'map-salesman-to-sm',
		},
		{
			name: 'Store in-progress order',
			btnId: 'store-inprogress-order',
		},
		{
			name: 'Update order status to billed in mongo',
			btnId: 'update-order-status-billed',
		},
		{
			name: 'Update customer performance report',
			btnId: 'update-customer-performance',
		},
		{
			name: 'Update van performance report ',
			btnId: 'update-van-performance',
		},
		{
			name: 'Update sku performance report',
			btnId: 'update-sku-performance',
		},
		{
			name: 'Update focused pack report',
			btnId: 'update-focused-pack',
		},

		{
			name: 'Update target vs achivement report',
			btnId: 'update-target-vs-achive',
		},
		{
			name: 'Update invocie against order report',
			btnId: 'update-invoice-against-order',
		},
		{
			name: 'Update banks',
			btnId: 'update-bank',
		},
		{
			name: 'Export milk collections',
			btnId: 'export-milk-collection',
		},
	];
	const SCHEDULER_PAGE_URL = `${Cypress.env('BASE_URL')}/schedulers`;
	before(() => {
		cy.login();
		cy.visit(SCHEDULER_PAGE_URL);
	});

	schedulers.forEach((scheduler) => {
		it(`${scheduler.name} scheduler trigger successfully`, () => {
			cy.get(`button[id=${scheduler.btnId}]`).click();
			cy.contains('Yes').click();
			cy.get('.ant-message-success')
			.should('be.visible')
			.then(() => {
				cy.wait(10000);
				cy.log(`${scheduler.name} scheduler triggered successfully`);
			});
		});
	});
});
