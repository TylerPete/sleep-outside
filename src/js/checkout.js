import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { checkout } from "./CheckoutProcess.mjs";

// Load dynamic header and footer templates
loadHeaderFooter();

const checkoutProcess = new CheckoutProcess();

const subtotalElement = document.querySelector("#subtotal");
subtotalElement.textContent = `Subtotal: $${(checkoutProcess.calculateDisplaySubtotal() / 100).toFixed(2)}`;

const taxElement = document.querySelector("#tax");
taxElement.textContent = `Tax: $${(checkoutProcess.calculateDisplayTax() / 100).toFixed(2)}`;

const shippingElement = document.querySelector("#shipping");
shippingElement.textContent = `Shipping: $${checkoutProcess.calculateDisplayShipping() / 100}`;

const totalElement = document.querySelector("#total");
totalElement.textContent = `Total: $${(checkoutProcess.calculateOrderTotal() / 100).toFixed(2)}`;

const checkoutForm = document.querySelector("#checkoutForm");
checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();
  checkout(checkoutForm);
});
