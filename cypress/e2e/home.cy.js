// https://docs.cypress.io/api/introduction/api.html

const user = cy;

describe("HomePage", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  it("visits the app root url", () => {
    user.visit("/");
    user.contains("KMUTT Shop");
  });

  it("cart should be empty", () => {
    user.visit("/");
    user.contains(".cart-item-quantity", "0");
  });

  it("add a item to cart should be 1", () => {
    user.visit("/");
    user.get(".product-item:nth-child(1) .add-to-cart-button").click();
    user.contains(".cart-item-quantity", "1");
  });
});
