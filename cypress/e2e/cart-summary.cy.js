describe("Cart Summary", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  it("Display cart summary with multiple product items", () => {
    cy.addProductToCart({ quantities: 2 });

    cy.visit("/cart/summary");

    cy.get("a > .mb-2").should("have.text", "Loose Cropped Jeans (Damaged)");
    cy.get(".relative > .w-full").should("have.value", "2");
    cy.get(".hidden > .text-sm").should("have.text", "$42.57");
    cy.get(":nth-child(4) > .text-sm").should("have.text", "$85.14");

    cy.get(":nth-child(1) > .text-gray-900").should("have.text", " $85.14");
    cy.get(":nth-child(2) > .text-gray-900").should("have.text", " -$0.00");
    cy.get(":nth-child(3) > .text-gray-900").should("have.text", " $85.14");
  });

  describe("Apply Coupon", () => {
    it("Success with $20 discount", () => {
      cy.addProductToCart({ quantities: 2 });

      cy.visit("/cart/summary");

      cy.get('[data-cy="cart--number-of-items"]').should("have.text", "2");
      cy.get(":nth-child(1) > .text-gray-900").should("have.text", " $85.14");
      cy.get(":nth-child(2) > .text-gray-900").should("have.text", " -$0.00");
      cy.get(":nth-child(3) > .text-gray-900").should("have.text", " $85.14");

      cy.get("#coupon").type("TGIF20");
      cy.get(".h-12 > .text-sm").click();

      cy.get(":nth-child(2) > .lg\\:px-2").should(
        "have.text",
        " Discount: Discount $20"
      );
      cy.get(":nth-child(2) > .text-gray-900").should("have.text", " -$20.00");
      cy.get(".p-4").should("have.class", "bg-cyan-50");
      cy.get(".p-4 > :nth-child(1)").should("have.text", "Description");
      cy.get(".p-4 > :nth-child(2)").should(
        "have.text",
        "Get $20 discount when you order $60 minimum"
      );
    });

    it("Failed with WRONG coupon", () => {
      cy.addProductToCart({ quantities: 2 });

      cy.visit("/cart/summary");

      cy.get(":nth-child(1) > .text-gray-900").should("have.text", " $85.14");
      cy.get(":nth-child(2) > .text-gray-900").should("have.text", " -$0.00");
      cy.get(":nth-child(3) > .text-gray-900").should("have.text", " $85.14");

      cy.get("#coupon").type("WRONG");
      cy.get(".h-12 > .text-sm").click();

      cy.get(":nth-child(2) > .lg\\:px-2").should("have.text", " Discount: ");
      cy.get(":nth-child(2) > .text-gray-900").should("have.text", " -$0.00");
      cy.get(".p-4").should("have.class", "bg-red-50");
      cy.get(".p-4 > :nth-child(1)").should("have.text", "Description");
      cy.get(".p-4 > :nth-child(2)").should(
        "have.text",
        "Coupon cannot be applied due to expired or invalid"
      );
    });

    it("Failed with does not meet coupon criteria", () => {
      cy.addProductToCart({ quantities: 1 });

      cy.visit("/cart/summary");

      cy.get(":nth-child(1) > .text-gray-900").should("have.text", " $42.57");
      cy.get(":nth-child(2) > .text-gray-900").should("have.text", " -$0.00");
      cy.get(":nth-child(3) > .text-gray-900").should("have.text", " $42.57");

      cy.get("#coupon").type("TGIF20");
      cy.get(".h-12 > .text-sm").click();

      cy.get(":nth-child(2) > .lg\\:px-2").should("have.text", " Discount: ");
      cy.get(":nth-child(2) > .text-gray-900").should("have.text", " -$0.00");
      cy.get(".p-4").should("have.class", "bg-red-50");
      cy.get(".p-4 > :nth-child(1)").should("have.text", "Description");
      cy.get(".p-4 > :nth-child(2)").should(
        "have.text",
        "Coupon cannot be applied due to expired or invalid"
      );
    });
  });
});
