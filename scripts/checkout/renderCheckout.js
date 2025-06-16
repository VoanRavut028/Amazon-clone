import { cart, deleteProduct, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { UpdateQuantity } from "../amazon.js";
// import paymentSummary from "./utils/paymentSummary.js";
export function renderCheckout() {
  let ShowInnerHTML = ``;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId) matchingProduct = product;
    });

    const deliveryOptionId = cartItem.deliveryOptionsId;
    if (!isNaN(deliveryOptionId)) {
      // alert(true);
      console.log(deliveryOptionId);
    }

    let matchDeliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        matchDeliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(matchDeliveryOption.deliveryDays, "days");

    const dateString = deliveryDate.format("dddd, MMMM D");
    // alert(dateString);

    ShowInnerHTML += `
    <div class="cart-item-container js-cart-delete-${matchingProduct.id}">
  <div class="delivery-date">Delivery date: ${dateString}</div>

  <div class="cart-item-details-grid">
    <img
      class="product-image"
      src="${matchingProduct.image}"
    />

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>

      <div class="product-price">
        $${(matchingProduct.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span
        data-update-id="${matchingProduct.id}"
        class="update-quantity-link js-update-link link-primary">
          Update
        </span>
        <input
        class="save-input js-save-input" value="">
        <span
         class="save-quantity-link link-primary">
          Save
        </span>
        <span
          data-product-id="${matchingProduct.id}"
          class="delete-quantity-link link-primary"
        >
          Delete
        </span>
      </div>
    </div>
  </div>

  <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
    ${deliveryOptionHTML(matchingProduct, cartItem)}
  </div>
</div>

  
  `;
  });

  document.querySelector(".order-summary").innerHTML = ShowInnerHTML;
  deleteItemsFunc();
  function deleteItemsFunc() {
    document
      .querySelectorAll(".delete-quantity-link")
      .forEach((deleteItems) => {
        deleteItems.addEventListener("click", () => {
          const productId = deleteItems.dataset.productId; // Catch data by "data-concept"
          deleteProduct(productId); // call function delete from cart
          const container = document.querySelector(
            `.js-cart-delete-${productId}`
          ); //Catch the specific Item by class-ID
          container.remove(); //Remove from html
          loadUpdateQauntity(); // Load quanity on check out again
        });
      });
  }
  reUpdateQauntity();
  loadUpdateQauntity();
  function loadUpdateQauntity() {
    let cartQuantity = 0;
    const latestCart = JSON.parse(localStorage.getItem("cart")) || [];
    latestCart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(
      ".checkout-header-middle-section"
    ).innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a
          >)`;
  }

  function deliveryOptionHTML(matchingProduct, cartItem) {
    console.log(cartItem);

    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${deliveryOption.priceCents / 100}`;

      const isChecked = deliveryOption.id == cartItem.deliveryOptionsId;

      html += `
      <div class="delivery-option js-delivery-option"
      data-productId-id="${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}"
      >
        <input
          type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} - Shipping</div>
        </div>
      </div>
    `;
    });
    return html;
  }
}

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});

function reUpdateQauntity() {
  //When user click on update btn
  //we loop through all item in update btn
  const updateQTY = document.querySelectorAll(".js-update-link");
  updateQTY.forEach((updateLink) => {
    //Each Items store on this (updateLink)

    updateLink.addEventListener("click", () => {
      //updateLink catch main container and assign to container
      //Is I use DOM to catch the main container
      //It'll always catch the first Items even I click on anothers Items
      //So closet() is useFull to catch the correct Items
      const container = updateLink.closest(".cart-item-container");
      container.classList.add("is-editing-quantity");
    });
  });

  // When user clicks "Save"
  const saveUpdate = document.querySelectorAll(".save-quantity-link");

  saveUpdate.forEach((saveLink) => {
    saveLink.addEventListener("click", () => {
      //Catch the parent to get specific Items again
      const container = saveLink.closest(".cart-item-container");
      const valueFromSaveInput = container.querySelector(".js-save-input");
      const getInput = Number(valueFromSaveInput.value);

      if (!isNaN(getInput)) {
        //catch the current "productId" on specific item

        const productId = container.querySelector(".update-quantity-link")
          .dataset.updateId; //Data from update
        // I also update on locals
        const cartFromlocal = JSON.parse(localStorage.getItem("cart")) || [];
        const updateCart = cartFromlocal.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: getInput };
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(updateCart));
        renderCheckout();
      }
    });
  });
}
