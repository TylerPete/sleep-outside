import {
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
  loadHeaderFooter,
} from "./utils.mjs";

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

    const quantityChangeButtons = document.querySelectorAll(".quantity_changer");
    quantityChangeButtons.forEach((button) => addQuantityChangeListener(button));

    // 4. Calculate total and show footer
    const total = cartItems.reduce((sum, item) => sum + (item.FinalPrice * item.Quantity), 0);
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartFooter.classList.remove("hide");
  }
}

function cartItemTemplate(item) {
  const productUrl = `/product_pages/?product=${item.Id}`;

  const newItem = `<li class="cart-card divider">
  <span class="remove-button" title="Remove from cart" data-id=${item.Id}>&times;</span>
  <a href="${productUrl}" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="${productUrl}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: <span class="quantity_changer" id="subtract_button" data-id=${item.Id}> - </span> ${item.Quantity} <span class="quantity_changer" id="add_button" data-id=${item.Id}> + </span></p>
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

function addQuantityChangeListener(quantity_changer_button_element) {

  quantity_changer_button_element.addEventListener("click", () => {
    const thisProductId = quantity_changer_button_element.getAttribute("data-id");

    console.log("Button data-id: ", thisProductId);

    const cartItems = getLocalStorage("so-cart");

    const itemAlreadyInCart = cartItems.find(item => item.Id === thisProductId);

    if (quantity_changer_button_element.id === "add_button") {
      itemAlreadyInCart.Quantity++;
    } else if (quantity_changer_button_element.id === "subtract_button") {
      itemAlreadyInCart.Quantity--;

      if (itemAlreadyInCart.Quantity <= 0) {
        const deleteIndex = cartItems.findIndex(
          (element) => element.Id === thisProductId,
        );

        cartItems.splice(deleteIndex, 1);
      }
    }

    setLocalStorage("so-cart", cartItems);

    updateCartCount();
    renderCartContents();

  });
}

// Load dynamic header and footer templates
loadHeaderFooter();
renderCartContents();
