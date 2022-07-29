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

      cy.shouldHavePriceSummary({
        subtotal: testdata.totalPrice,
        discount: "-$0.00",
        total: testdata.totalPrice,
      });
    });
  });

  it("SS-15: a user with items in a cart and checkout with coupon", () => {
    cy.visit("/");

    cy.addProductToCart("Smart Tucked Shorts");
    cy.addProductToCart("Printed Cotton Square Neck Short Sleeve Mini Dress");
    cy.addProductToCart("Printed Cotton Square Neck Short Sleeve Mini Dress");

    cy.visit("/cart/summary");

    cy.get("tbody > tr").should("have.length", 2);

    cy.shouldHaveLineItem({
      at: 1,
      productName: "Smart Tucked Shorts",
      quantity: 1,
    });
    cy.shouldHaveLineItem({
      at: 2,
      productName: "Printed Cotton Square Neck Short Sleeve Mini Dress",
      quantity: 2,
    });

    cy.shouldHavePriceSummary({
      subtotal: "$79.13",
      discount: "-$0.00",
      total: "$79.13",
    });

    cy.get('[data-cy="coupon-code"]').type("TGIF20");
    cy.get('[data-cy="apply-coupon-button"]').click();

    cy.waitForApi({ method: "GET", path: "/cart/summary*" });

    cy.shouldHaveLineItem({
      at: 1,
      productName: "Smart Tucked Shorts",
      quantity: 1,
    });
    cy.shouldHaveLineItem({
      at: 2,
      productName: "Printed Cotton Square Neck Short Sleeve Mini Dress",
      quantity: 2,
    });

    cy.shouldHavePriceSummary({
      subtotal: "$79.13",
      discount: "-$20.00",
      total: "$59.13",
    });
  });
});
