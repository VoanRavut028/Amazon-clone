export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
  },
];
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
    });
  }
  localStorage.setItem("StorageCart", JSON.stringify(cart));
}

export function UpdateQuantity() {
  let cartQuanity = 0;
  cart.forEach((item) => {
    cartQuanity += item.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuanity;
}
export function deleteProduct(productId) {
  const newArr = [];
  cart.forEach((item) => {
    if (item.productId !== productId) {
      newArr.push(productId);
    }
  });
  cart = newArr;
}
