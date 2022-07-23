// https://docs.cypress.io/api/introduction/api.html

describe("Cart", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  it("Display initial cart", () => {
    cy.visit("/");

    cy.get("[data-cy='cart--number-of-items']").should("have.text", "0");
  });

  it("Update cart with multiple items", () => {
    cy.visit("/");

    cy.addProductToCart({ quantities: 2 });

    cy.get("[data-cy='cart--number-of-items']").should("have.text", "2");
  });
});
