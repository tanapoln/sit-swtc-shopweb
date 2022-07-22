const customer = cy;

describe("Cart Summary", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  const addProductByQuantity = (productQuantity) => {
    customer.visit("/");

    for (let index = 0; index < productQuantity; index++) {
      customer.get(':nth-child(1) > .space-x-2 > [data-cy="product-item--add-to-cart"]')
        .click();
    }
  }

  it("Display cart summary with two products", () => {
    addProductByQuantity(2);

    customer.visit("/cart/summary");

    customer.get('[data-cy="cart--number-of-items"]')
    .should("have.text", "2");
    customer.get('a > .mb-2')
      .should("have.text", "Loose Cropped Jeans (Damaged)");
    customer.get('.relative > .w-full')
      .should("have.value", "2");
    customer.get('.hidden > .text-sm')
      .should("have.text", "$42.57");
    customer.get(':nth-child(4) > .text-sm')
      .should("have.text", "$85.14");

    customer.get(':nth-child(1) > .text-gray-900')
      .should("have.text", " $85.14");
    customer.get(':nth-child(2) > .text-gray-900')
      .should("have.text", " -$0.00");
    customer.get(':nth-child(3) > .text-gray-900')
      .should("have.text", " $85.14");
  });

  describe("Apply Coupon", () => {
    it("Success with $20 discount", () => {
      addProductByQuantity(2);

      customer.visit("/cart/summary");

      customer.get('[data-cy="cart--number-of-items"]')
        .should("have.text", "2");
      customer.get(':nth-child(1) > .text-gray-900')
        .should("have.text", " $85.14");
      customer.get(':nth-child(2) > .text-gray-900')
        .should("have.text", " -$0.00");
      customer.get(':nth-child(3) > .text-gray-900')
        .should("have.text", " $85.14");

      customer.get('#coupon')
        .type("TGIF20");
      customer.get('.h-12 > .text-sm')
        .click();
      
      customer.get(':nth-child(2) > .lg\\:px-2')
        .should("have.text", " Discount: Discount $20");
      customer.get(':nth-child(2) > .text-gray-900')
        .should("have.text", " -$20.00");
      customer.get('.p-4')
        .should("have.class", "bg-cyan-50")
      customer.get('.p-4 > :nth-child(1)')
        .should("have.text", "Description");
      customer.get('.p-4 > :nth-child(2)')
        .should("have.text", "Get $20 discount when you order $60 minimum");
    });
    
    it("Failed with WRONG coupon", () => {
      addProductByQuantity(2);

      customer.visit("/cart/summary");

      customer.get('[data-cy="cart--number-of-items"]')
        .should("have.text", "2");
      customer.get(':nth-child(1) > .text-gray-900')
        .should("have.text", " $85.14");
      customer.get(':nth-child(2) > .text-gray-900')
        .should("have.text", " -$0.00");
      customer.get(':nth-child(3) > .text-gray-900')
        .should("have.text", " $85.14");

      customer.get('#coupon')
        .type("WRONG");
      customer.get('.h-12 > .text-sm')
        .click();
      
      customer.get(':nth-child(2) > .lg\\:px-2')
        .should("have.text", " Discount: ");
      customer.get(':nth-child(2) > .text-gray-900')
        .should("have.text", " -$0.00");
      customer.get('.p-4')
        .should("have.class", "bg-red-50")
      customer.get('.p-4 > :nth-child(1)')
        .should("have.text", "Description");
      customer.get('.p-4 > :nth-child(2)')
        .should("have.text", "Coupon cannot be applied due to expired or invalid");
    });

    it("Failed with un-quanlify product", () => {
      addProductByQuantity(1);

      customer.visit("/cart/summary");

      customer.get('[data-cy="cart--number-of-items"]')
        .should("have.text", "1");
      customer.get(':nth-child(1) > .text-gray-900')
        .should("have.text", " $42.57");
      customer.get(':nth-child(2) > .text-gray-900')
        .should("have.text", " -$0.00");
      customer.get(':nth-child(3) > .text-gray-900')
        .should("have.text", " $42.57");

      customer.get('#coupon')
        .type("TGIF20");
      customer.get('.h-12 > .text-sm')
        .click();
      
      customer.get(':nth-child(2) > .lg\\:px-2')
        .should("have.text", " Discount: ");
      customer.get(':nth-child(2) > .text-gray-900')
        .should("have.text", " -$0.00");
      customer.get('.p-4')
        .should("have.class", "bg-red-50")
      customer.get('.p-4 > :nth-child(1)')
        .should("have.text", "Description");
      customer.get('.p-4 > :nth-child(2)')
        .should("have.text", "Coupon cannot be applied due to expired or invalid");
    });
    
  });
});
