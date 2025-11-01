// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function updateCartCount() {
  // Get cart items from localStorage, or an empty array if the cart is null
  const cartItems = getLocalStorage("so-cart") || [];
  
  // Find the .cart-count element
  const cartCountElement = qs(".cart-count");

  // Set the text content.
  // If 0, it will be an empty string, and the CSS will hide it.
  cartCountElement.textContent = cartItems.length > 0 ? cartItems.length : "";
}