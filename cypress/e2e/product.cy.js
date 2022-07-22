const customer = cy;

describe("Cart", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  it("Display products", () => {
    customer.visit("/");

    customer.get("[data-cy='product-item']").should("have.length", 9);

    customer
      .get("[data-cy='product-item']")
      .first()
      .within(() => {
        customer
          .get("[data-cy='product-item--name']")
          .should("have.text", "Loose Cropped Jeans (Damaged)");
        customer
          .get("[data-cy='product-item--image']")
          .invoke("attr", "src")
          .should(
            "equal",
            "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/448429/sub/goods_448429_sub13.jpg?width=1600&impolicy=quality_75"
          );
        customer
          .get("[data-cy='product-item--price']")
          .should("have.text", " $42.57");
      });
  });
  
  it("Update product from one to two quantity", () => {
    customer.visit("/");

    customer.get(':nth-child(1) > .space-x-2 > [data-cy="product-item--add-to-cart"]').click()

    customer.get(':nth-child(1) > .space-x-2 > [data-cy="product-item--add-to-cart"]').click()

    customer.get('[data-cy="cart--number-of-items"]')
      .should("have.text", "2");
  });
});
