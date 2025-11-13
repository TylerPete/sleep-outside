import { getLocalStorage, setLocalStorage, updateCartCount, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  // 1. FIX: Get cart items or an empty array if cart is null
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElement = document.querySelector(".cart-total");

  if (cartItems.length === 0) {
    // 2. If cart is empty, show message and hide footer
    productList.innerHTML = "<li>Your cart is empty.</li>";
    cartFooter.classList.add("hide");
  } else {
    // 3. If cart has items, render them
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join("");

    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => addRemoveListener(button));

    // 4. Calculate total and show footer
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartFooter.classList.remove("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="remove-button" title="Remove from cart" data-id=${item.Id}>&times;</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

function addRemoveListener(buttonElement) {
  buttonElement.addEventListener("click", () => {
    const deletedProductId = buttonElement.getAttribute("data-id");

    const cartItems = getLocalStorage("so-cart") || [];
    const deleteIndex = cartItems.findIndex(
      (element) => element.Id === deletedProductId,
    );

    cartItems.splice(deleteIndex, 1);
    setLocalStorage("so-cart", cartItems);

    updateCartCount();
    renderCartContents();
  });
}

// Load dynamic header and footer templates
loadHeaderFooter();
renderCartContents();
