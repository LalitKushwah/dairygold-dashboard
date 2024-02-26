/// <reference types="cypress" />
describe('Executive View', () => {
  const EXECUTIVE_PAGE_URL = `${Cypress.env('BASE_URL')}/sales_executive`;
  const API_BASE_URL = 'https://order.tradekings.app:4001/dg/testing';
  before(() => {
    cy.login();
    cy.visit(EXECUTIVE_PAGE_URL);
  });

  it('APIs Calling', () => {
    cy.log('Api calling testing started');
    // Fetch provinces api
    cy.intercept(`${API_BASE_URL}/api/user/provinces/fetch`).as('getProvince');
    // Fetch Executives api
    cy.intercept(
      `${API_BASE_URL}/api/user/list/salesman?skip=0&limit=10&requestType=dashboard`
    ).as('getExecutives');
    cy.wait('@getProvince').then((interception: any) => {
      expect(interception.response.body.status).to.equal(200);
    });
    cy.wait('@getExecutives').then((interception: any) => {
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
    cy.get('.ant-select-item').contains('LUSAKA').click();
    cy.wait(1000);
    cy.log('Filter testing started');
  });

  it('Add Executive', () => {
    cy.wait(2000)
    cy.log('Add Executive testing started');
    cy.get(`button[id=addExecutive]`).click();
    cy.get('[data-testid="form-executive-type-list"]').click();
    cy.get('.ant-select-item').contains('SALESMAN').click();
    cy.get('[name="userLoginId"]').type('test123456');
    cy.get('[name="name"]').type('test 1');
    cy.get('[data-testid="form-province-list"]').click();
    cy.wait(2000);
    cy.get('.ant-select-item').contains('CENTRAL').click();
    cy.get('[name="password"]').type('test123');
    cy.get('[name="externalId"]').type('test123456');
    cy.get('[name="channel"]').type('test123');
    cy.get('[data-testid="form-country-list"]').click();
    cy.get('.ant-select-item').contains('Zambia').click();
    cy.get('button[id="submit"]').click();
    cy.contains('OK').click();
    cy.get('.ant-message-success').should('be.visible');
    cy.log('Add Executive testing completed successfully');
  });

  it('Edit executive', () => {
    cy.wait(4000);
    cy.log('Edit Executive testing started');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.contains('Edit').click();
    cy.get('[data-testid="form-executive-type-list"]').click();
    cy.get('.ant-select-item').contains('MCM').click();
    cy.get('[name="name"]').type(' Test');
    cy.get('[data-testid="form-province-list"]').click();
    cy.wait(2000);
    cy.get('.ant-select-item').contains('CENTRAL').click()
    cy.get('button[id="submit"]').click();
    cy.contains('OK').click();
    cy.get('.ant-message-success').should('be.visible');
    cy.log('Edit Executive testing completed successfully');
  });

  it('Delete Executive', () => {
    cy.wait(4000);
    cy.log('Delete Executive testing started');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.contains('Delete').click();
    cy.contains('Yes').click();
    cy.get('.ant-message-success').should('be.visible');
    cy.log('Delete Executive testing completed successfully');
  });

  it('Reset Executive password', () => {
    cy.wait(4000);
    cy.log('Reset Executive password testing started');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.contains('Reset Password').click();
    cy.contains('Yes').click();
    cy.get('.ant-message-success').should('be.visible');
    cy.log('Reset Executive passwordr testing completed successfully');
  });

  it('View Executive dashbaord', () => {
    cy.wait(4000);
    cy.log('View Executive dashbaord testing started');
    cy.get(`button[id=viewDashboard]`).eq(1).click();
    cy.get('.ant-modal').should('be.visible');
    cy.wait(2000);
    cy.get('[data-testid="dashboard-modal-category-list"]').click();
    cy.get('.ant-select-item').eq(2).click()
    cy.get('.ant-modal-close-x').click()
    cy.log('View Executive dashbaord testing completed successfully');
  });

  after(() => {
    cy.wait(4000);
    cy.logout();
  });
});