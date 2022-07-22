const customer = cy;

describe("Cart Summary", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  const addOneProduct = () => {
    customer.visit("/");

    customer.get(':nth-child(1) > .space-x-2 > [data-cy="product-item--add-to-cart"]')
      .click();
  }

  it("Display Cart Summary", () => {
    addOneProduct();

    customer.visit("/cart/summary");

    customer.get('a > .mb-2')
      .should("have.text", "Loose Cropped Jeans (Damaged)");
    customer.get('.relative > .w-full')
      .should("have.value", "1");
    customer.get('.hidden > .text-sm')
      .should("have.text", "$42.57");
    customer.get(':nth-child(4) > .text-sm')
      .should("have.text", "$42.57");

    customer.get(':nth-child(1) > .text-gray-900')
      .should("have.text", " $42.57");
    customer.get(':nth-child(2) > .text-gray-900')
      .should("have.text", " -$0.00");
    customer.get(':nth-child(3) > .text-gray-900')
      .should("have.text", " $42.57");
  });
});
