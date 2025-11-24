import { loadHeaderFooter, getParam, prettifySlug, qs, renderBreadcrumb } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

// Load header and footer, then initialize products
loadHeaderFooter().then(() => {
  const category = getParam("category");
  const searchQuery = getParam("q");
  const dataSource = new ExternalServices();
  const listElement = document.querySelector(".product-list");
  const titleElement = document.querySelector("h2");

  let queryToUse = category;
  let isSearch = false; // Flag to track mode

  if (searchQuery) {
    queryToUse = searchQuery;
    isSearch = true;
    titleElement.textContent = `Search Results for: "${searchQuery}"`;
  } else {
    const categoryName = prettifySlug(category);
    titleElement.textContent = `Top Products for ${categoryName}`;
  }

  const myList = new ProductList(queryToUse, dataSource, listElement);

  // Initialize products and render breadcrumb after loading
  myList.init(isSearch).then(() => {
    if (isSearch) {
      renderBreadcrumb("Search Results", myList.productList.length);
    } else {
      renderBreadcrumb(category, myList.productList.length);
    }
  });

  // Add the event listener for sorting
  const sortElement = qs("#sort-options");
  if (sortElement) {
    sortElement.addEventListener("change", (e) => {
      myList.sortList(e.target.value);
    });
  }

  // Listen for search updates from the header
  window.addEventListener("search-update", (e) => {
    const query = e.detail.query;
    try {
      titleElement.textContent = `Search Results for: "${query}"`;
      myList.category = query;
      myList.init(true).then(() => {
        renderBreadcrumb("Search Results", myList.productList.length);
      });
    } catch (error) {
      console.error("Error handling search update:", error);
    }
  });

  // Set up category links
  const categoryLinks = document.querySelectorAll(".category");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const href = link.href;
      const url = new URL(href);
      const newCategory = url.searchParams.get("category");

      if (newCategory) {
        const currentUrl = new URL(window.location);
        currentUrl.searchParams.set("category", newCategory);
        currentUrl.searchParams.delete("q");
        window.history.pushState({}, "", currentUrl.toString());
        titleElement.textContent = `Top Products for ${prettifySlug(newCategory)}`;

        myList.category = newCategory;
        myList.init(false).then(() => {
          renderBreadcrumb(newCategory, myList.productList.length);
        });
      }
    });
  });
});
