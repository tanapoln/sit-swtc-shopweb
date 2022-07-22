// https://docs.cypress.io/api/introduction/api.html

const customer = cy;

describe("Cart", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  it("Display initial cart", () => {
    customer.visit("/");

    customer.get("[data-cy='cart--number-of-items']").should("have.text", "0");
  });
});
