import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { UpdateQuantity } from "../amazon.js";
export function paymentSummary() {
  let productPriceCents = 0;
  let shippingPricents = 0;
  // debugger;
  cart.forEach((element) => {
    const product = getProduct(element.productId);

    productPriceCents += product.priceCents * element.quantity;
    const deliveryOption = getDeliveryOption(element.deliveryOptionsId);
    // shippingPricents += deliveryOption.priceCents;
  });
  console.log(shippingPricents);

  const totalBeforeTaxCents = productPriceCents + shippingPricents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  let card = ` 
 <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${UpdateQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPricents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCents
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;

  document.querySelector(".js-payment-summary").innerHTML = card;
}
