// https://docs.cypress.io/api/introduction/api.html

describe("SIT Shopping", () => {
  it("SS-14: a user with a single item checkout", () => {
    cy.visit("/");

    cy.addProductToCart("Printed Cotton Square Neck Short Sleeve Mini Dress");

    cy.visit("/cart/summary");

    cy.get('[data-cy="subtotal"]').shouldHaveText("$28.28");
    cy.get('[data-cy="discount-amount"]').shouldHaveText("-$0.00");
    cy.get('[data-cy="total"]').shouldHaveText("$28.28");
  });
});
