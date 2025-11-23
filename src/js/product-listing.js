import { loadHeaderFooter, getParam, prettifySlug, qs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

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

myList.init(isSearch);

// Add the event listener for sorting
const sortElement = qs("#sort-options");
sortElement.addEventListener("change", (e) => {
  myList.sortList(e.target.value);
});
