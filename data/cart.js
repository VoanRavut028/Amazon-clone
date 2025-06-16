import { paymentSummary } from "../scripts/checkout/paymentSummary.js";
export let cart = [];

loadFromLocalstorage();
export function loadFromLocalstorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((Carditem) => {
    if (Carditem.productId === productId) {
      matchingItem = Carditem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionsId: 1,
    });
  }
  saveToStorage();
}

// export function deleteProduct(productId) {
//   const newArr = [];
//   cart.forEach((item) => {
//     if (item.productId !== productId) {
//       newArr.push(productId);
//     }
//   });
//   cart = newArr;
//   saveToStorage();
// }
export function deleteProduct(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  paymentSummary();
}

export function updateDeliveryOption(productId, deliveryOption) {
  let matchingItem;
  cart.forEach((e) => {
    if (productId === e.productId) {
      matchingItem = e;
    }
  });
  matchingItem.deliveryOptionsId = deliveryOption;
  saveToStorage();
}


