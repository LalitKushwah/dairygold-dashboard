describe('Customers View', () => {
  const CUSTOMER_PAGE_URL = `${Cypress.env('BASE_URL')}/products`;
  const API_BASE_URL = 'https://order.tradekings.app:4001/dg/testing';
  before(() => {
    cy.login();
    cy.visit(CUSTOMER_PAGE_URL);
  });

  it('APIs Calling', () => {
    cy.log('Api calling testing started');
    // Fetch parent category api
    cy.intercept(`${API_BASE_URL}/api/category/list/parent?skip=0&limit=40`).as(
      'fetchParentCategories'
    );
    // Fetch child category api
    cy.intercept(
      `${API_BASE_URL}/api/category/list/child/6406b0599482b50f1a6306a8?skip=0&limit=40`
    ).as('fetchChildCategories');
    cy.wait('@fetchParentCategories').then((interception: any) => {
      expect(interception.response.body.status).to.equal(200);
    });
    cy.wait('@fetchChildCategories').then((interception: any) => {
      expect(interception.response.body.status).to.equal(200);
    });
    cy.log('Api calling completed successfully');
  });

  it('Filters', () => {
    cy.log('Filter testing started');
    cy.wait(4000);
    cy.get('[name="searchProduct"]').type('test');
    cy.wait(4000);
    cy.get('[name="searchProduct"]').clear();
    cy.wait(4000);
    cy.get('[data-testid="parentCategoryDropdown"]').click();
    cy.get('.ant-select-dropdown').find('.ant-select-item').first().click(); // Select the first option
    cy.wait(4000);
    cy.get('[data-testid="childCategoryDropdown"]')
      .should('be.visible')
      .click();
    cy.get('.ant-select-dropdown').find('.ant-select-item').last().click(); // Select the first option
    cy.wait(1000);
    cy.log('Filter testing started');
  });

  it('Add product', () => {
    cy.wait(2000);
    cy.log('Add  testing started');
    cy.get(`button[id=addProduct]`).click();
    cy.wait(4000);
    // Click on the parent category dropdown
    cy.get('[data-testid="formParentCategoryDropdown"]').click();
    cy.get('.ant-select-dropdown').find('.ant-select-item').last().click();

    cy.wait(4000);

    // Click on the child category dropdown
    cy.get('[data-testid="formChildCategoryDropdown"]').click();

    cy.get('.ant-select-dropdown').find('.ant-select-item').last().click();

    cy.wait(4000);
    cy.get('[name="name"]').type('test1');
    cy.get('[name="productCode"]').type('test 1');
    cy.get('[name="productSysCode"]').type('test123');
    cy.get('[name="price"]').type('123');
    cy.get('[name="packType"]').type('test123');
    cy.get('[name="netWeight"]').type('123');
    cy.get('[name="currentCaseSize"]').type('123');
    cy.get('[name="unit"]').type('test123');
    cy.get('[data-testid="formFocusedPackToggleSwitch"]').click();
    cy.get('button[id="submit"]').click();
    cy.contains('OK').click();
    cy.get('.ant-message-success').should('be.visible');
    cy.log('Add Product testing completed successfully');
  });

  it('Edit product', () => {
    cy.wait(4000);
    cy.log('Edit customer testing started');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.contains('Edit').click();
    cy.get('[data-testid="formParentCategoryDropdown"]').click();
    cy.get('.ant-select-dropdown').find('.ant-select-item').last().click();
    cy.get('[data-testid="formChildCategoryDropdown"]').click();
    cy.get('.ant-select-dropdown').find('.ant-select-item').last().click();
    cy.get('[name="name"]').type('test1');
    cy.get('[name="productCode"]').type('test 1');
    cy.get('[name="productSysCode"]').type('test123');
    cy.get('[name="price"]').type('123');
    cy.get('[name="packType"]').type('test123');
    cy.get('[name="netWeight"]').type('test123');
    cy.get('[name="currentCaseSize"]').type('123');
    cy.get('[name="unit"]').type('test123');
    cy.get('[data-testid="formFocusedPackToggleSwitch"]').click();
    cy.get('button[id="submit"]').click();
    cy.contains('OK').click();
    cy.get('.ant-message-success').should('be.visible');
    cy.log('Edit customer testing completed successfully');
  });

  it('Delete product', () => {
    cy.wait(4000);
    cy.get('[name="searchProduct"]').type('test');
    cy.wait(4000);
    cy.log('Delete product testing started');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.get(`button[id=actionBtn]`).eq(1).trigger('mouseover');
    cy.contains('Delete').click();
    cy.contains('Yes').click();
    cy.get('.ant-message-success').should('be.visible');
    cy.log('Delete product testing completed successfully');
  });

  after(() => {
    cy.wait(4000);
    cy.logout();
  });
});
