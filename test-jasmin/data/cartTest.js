import { addToCart, cart, loadFromLocalstorage } from "../../data/cart.js";
describe("Test suite Add to cart : ", () => {
  it("Sad", () => {
    expect(10 === 10);
  });
  it("Add an existing product to cart", () => {});

  it("add a new product to cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    console.log(localStorage.getItem("cart"));
    loadFromLocalstorage();

    addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    // expect(cart.length).toEqual(1);
    // expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    // expect(cart[0].quantity.toEqual(1));
  });
});
