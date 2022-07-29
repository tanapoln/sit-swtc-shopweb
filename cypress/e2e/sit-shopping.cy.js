// https://docs.cypress.io/api/introduction/api.html

describe("SIT Shopping", () => {
  const ss14TestData = [
    {
      product: "Printed Cotton Square Neck Short Sleeve Mini Dress",
      totalPrice: "$28.28",
    },
    {
      product: "Printed Button Down Camisole Flare Dress",
      totalPrice: "$42.57",
    },
  ];
  ss14TestData.forEach((testdata) => {
    it(`SS-14: a user with a single item (${testdata.product}) checkout`, () => {
      cy.visit("/");

      cy.addProductToCart(testdata.product);

      cy.visit("/cart/summary");

      cy.get('[data-cy="subtotal"]').shouldHaveText(testdata.totalPrice);
      cy.get('[data-cy="discount-amount"]').shouldHaveText("-$0.00");
      cy.get('[data-cy="total"]').shouldHaveText(testdata.totalPrice);
    });
  });
});
