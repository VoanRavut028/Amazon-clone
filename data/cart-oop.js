import { paymentSummary } from "../scripts/checkout/paymentSummary.js";

function Cart(param) {
  const cart = {
    cartItems: undefined,
    loadFromLocalstorage() {
      this.cartItems = JSON.parse(localStorage.getItem(param)) || [];
    },
    saveToStorage() {
      localStorage.setItem(param, JSON.stringify(this.cartItems));
    },
    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((Carditem) => {
        if (Carditem.productId === productId) {
          matchingItem = Carditem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity++;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionsId: 1,
        });
      }
      this.saveToStorage();
    },
    deleteProduct(productId) {
      this.cartItems = this.cartItems.filter(
        (item) => item.productId !== productId
      );
      this.saveToStorage();
      paymentSummary();
    },
    updateDeliveryOption(productId, deliveryOption) {
      let matchingItem;
      this.cartItems.forEach((e) => {
        if (productId === e.productId) {
          matchingItem = e;
        }
      });
      matchingItem.deliveryOptionsId = deliveryOption;
      this.saveToStorage();
    },
  };
  return cart;
}

const cart = Cart("cart-oop");
const buisiness = Cart("buisiness-oop");

buisiness.loadFromLocalstorage();
buisiness.addToCart("36c64692-677f-4f58-b5ec-0dc2cf109e27");
console.log(buisiness.cartItems);

cart.loadFromLocalstorage();

cart.addToCart("bc2847e9-5323-403f-b7cf-57fde044a955");

console.log(cart.cartItems);
