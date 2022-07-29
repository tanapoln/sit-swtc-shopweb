// ***********************************************
// This example commands.js shows you how to
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
// eslint-disable-next-line no-unused-vars
/* global Cypress, expect, cy */

Cypress.Commands.add(
  "shouldHaveText",
  { prevSubject: true },
  (subject, equalTo) => {
    expect(subject.text().trim()).to.equal(equalTo);
  }
);

Cypress.Commands.add("addProductToCart", (productName) => {
  cy.contains(productName)
    .parents("[data-cy='product-item']")
    .find("button")
    .click();
});

Cypress.Commands.add("shouldHaveLineItem", ({ at, productName, quantity }) => {
  cy.get('[data-cy="cart-summary-item--name"]')
    .eq(at - 1)
    .shouldHaveText(productName);
  cy.get('[data-cy="cart-summary-item--quantity"]')
    .eq(at - 1)
    .should("have.value", quantity);
});

Cypress.Commands.add("shouldHaveLineItems", (lineItems) => {
  cy.get("tbody > tr").should("have.length", lineItems.length);
  lineItems.forEach((item, index) => {
    cy.shouldHaveLineItem({
      at: index + 1,
      productName: item.productName,
      quantity: item.quantity,
    });
  });
});

Cypress.Commands.add(
  "shouldHavePriceSummary",
  ({ subtotal, discount, total }) => {
    cy.get('[data-cy="subtotal"]').shouldHaveText(subtotal);
    cy.get('[data-cy="discount-amount"]').shouldHaveText(discount);
    cy.get('[data-cy="total"]').shouldHaveText(total);
  }
);

Cypress.Commands.add("waitForApi", ({ method, path }) => {
  const uniqueApiName = method + path;
  cy.intercept(method, path).as(uniqueApiName);
  cy.wait("@" + uniqueApiName);
});
