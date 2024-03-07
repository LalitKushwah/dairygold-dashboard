/// <reference types="cypress" />
describe('Customers View', () => {
  const CUSTOMER_PAGE_URL = `${Cypress.env('BASE_URL')}/customers`;
  const API_BASE_URL = 'https://order.tradekings.app:4001/dg/testing';
  before(() => {
    cy.login();
    cy.visit(CUSTOMER_PAGE_URL);
  });

  it('APIs Calling', () => {
    cy.log('Api calling testing started');
    // Fetch provinces api
    cy.intercept(`${API_BASE_URL}/api/user/provinces/fetch`).as('getProvince');
    // Fetch Customers api
    cy.intercept(
      `${API_BASE_URL}/api/user/list/customer?skip=0&limit=10&requestType=dashboard`
    ).as('getCustomers');
    cy.wait('@getProvince').then((interception: any) => {
      expect(interception.response.body.status).to.equal(200);
    });
    cy.wait('@getCustomers').then((interception: any) => {
      expect(interception.response.body.status).to.equal(200);
    });
    cy.log('Api calling completed successfully');
  });

  it('Filters', () => {
    cy.log('Filter testing started');
    cy.wait(4000);
    cy.get('[name="searchByName"]').type('786 SOWETO');
    cy.wait(4000);
    cy.get('[name="searchByName"]').clear();
    cy.wait(4000);
    cy.get('[data-testid="province-list"]').click();
    cy.get('.ant-select-item').contains('CENTRAL').click();
    cy.wait(1000);
    cy.log('Filter testing started');
  });

  it('Add customer', () => {
    cy.wait(2000)
    cy.log('Add Customer testing started');
    cy.get(`button[id=addCustomer]`).click();
    cy.get('[name="userLoginId"]').type('test1');
    cy.get('[name="name"]').type('test 1');
    cy.get('[data-testid="form-province-list"]').click();
    cy.get('.ant-select-item').eq(1).click();
    cy.get('[name="password"]').type('test123');
    cy.get('[name="externalId"]').type('test123');
    cy.get('[name="channel"]').type('test123');
    cy.get('[data-testid="form-country-list"]').click();
    cy.get('.ant-select-item').contains('Zambia').click();
    cy.get('button[id="submit"]').click();
    cy.contains('OK').click();
    cy.get('.ant-message-success').should('be.visible');
    cy.log('Add customer testing completed successfully');
  });

  it('Edit customer', () => {
    cy.wait(4000);
    cy.log('Edit customer testing started');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.contains('Edit').click();
    cy.get('[name="name"]').type(' Test');
    // cy.get('[data-testid="form-province-list"]').click();
    // cy.wait(2000);
    // cy.get('.ant-select-item').contains('CONGO').click();
    cy.get('button[id="submit"]').click();
    cy.contains('OK').click();
    cy.get('.ant-message-success').should('be.visible');
    cy.log('Edit customer testing completed successfully');
  });

  it('Delete customer', () => {
    cy.wait(4000);
    cy.log('Delete customer testing started');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.contains('Delete').click();
    cy.contains('Yes').click();
    cy.get('.ant-message-success').should('be.visible');
    cy.log('Delete customer testing completed successfully');
  });

  it('Reset customer password', () => {
    cy.wait(4000);
    cy.log('Reset customer password testing started');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.contains('Reset Password').click();
    cy.contains('Yes').click();
    cy.get('.ant-message-success').should('be.visible');
    cy.log('Reset customer passwordr testing completed successfully');
  });

  it('View customer dashbaord', () => {
    cy.wait(4000);
    cy.log('View Customer dashbaord testing started');
    cy.get(`button[id=viewDashboard]`).eq(1).click();
    cy.get('.ant-modal').should('be.visible');
    cy.get('.ant-modal-close-x').click()
    cy.log('View Customer dashbaord testing completed successfully');
  });

  after(() => {
    cy.wait(4000);
    cy.logout();
  });
});
