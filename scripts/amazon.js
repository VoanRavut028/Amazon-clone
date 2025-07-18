import { products } from "../data/products.js";
import { addToCart } from "../data/cart.js";
let card = ``;

products.forEach((value) => {
  card += `
  
 <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${value.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${value.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${value.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              value.rating.count
            }</div>
          </div>

          <div class="product-price">$${(value.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="js-add-to-card add-to-cart-button button-primary " data-product-id="${
            value.id
          }">Add to Cart</button>
        </div>
  `;
});

if (document.querySelector(".products-grid")) {
  document.querySelector(".products-grid").innerHTML = card;

  document.querySelectorAll(".js-add-to-card").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      UpdateQuantity();
    });
  });

  UpdateQuantity();
}

UpdateQuantity();
export function UpdateQuantity() {
  let cartQuantity = 0;
  const latestCart = JSON.parse(localStorage.getItem("cart")) || [];
  latestCart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  localStorage.setItem("cartQuantity", cartQuantity);
  const showQuantity = document.querySelector(".js-cart-quantity");
  if (showQuantity) {
    showQuantity.innerHTML = cartQuantity;
  }
  return cartQuantity;
}
