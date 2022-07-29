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
