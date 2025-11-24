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
  const numItems = cartItems.reduce((sum, item) => sum + item.Quantity, 0);

  // Find the .cart-count element
  const cartCountElement = qs(".cart-count");

  // Set the text content.
  // If 0, it will be an empty string, and the CSS will hide it.
  cartCountElement.textContent = cartItems.length > 0 ? numItems : "";
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

/**
 * Capitalize the first letter of each word in a string
 * @param {string} string - The string to capitalize
 * @returns {string} The capitalized string
 */
export function capitalizeFirstLetter(string) {
  if (!string) return "";

  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Capitalize the first letter of each word in a string and join them with a space
 * @param {string} string - The string to prettify
 * @returns {string} The prettified string
 * @example
 * prettifySlug('tents') // 'Tents'
 * prettifySlug('sleeping-bags') // 'Sleeping Bags'
 * prettifySlug('hammocks') // 'Hammocks'
 */
export function prettifySlug(string) {
  if (!string) return "";

  return string.split("-").map(capitalizeFirstLetter).join(" ");
}

export function renderWithTemplate(template, parentElement, clear = false) {
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.innerHTML = template;
  updateCartCount();

}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  const searchForm = headerElement.querySelector(".search form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchForm.querySelector("input").value;

      const productListElement = document.querySelector(".product-list");

      if (productListElement) {
        // 1. Update the URL without reloading
        const url = new URL(window.location);
        url.searchParams.set("q", query);
        url.searchParams.delete("category")

        window.history.pushState({}, "", url.toString());

        const searchEvent = new CustomEvent("search-update", { detail: { query } });
        window.dispatchEvent(searchEvent);
      } else {
        window.location.href = `/product_listing/index.html?q=${query}`;
      }
    });
  }
}

export function alertMessage(message, scroll = true) {
  const main = qs("main");
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>&times;</span>`;
  alert.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
      main.removeChild(this);
    }
  });
  main.prepend(alert);
  if (scroll)
    window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => qs("main").removeChild(alert));
}