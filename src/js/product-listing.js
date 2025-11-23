import { loadHeaderFooter, getParam, prettifySlug, qs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const titleElement = document.querySelector("h2");
const categoryName = prettifySlug(category);

titleElement.textContent = `Top Products for ${categoryName}`;
const myList = new ProductList(category, dataSource, listElement);

myList.init();

// Add the event listener for sorting
const sortElement = qs("#sort-options");
sortElement.addEventListener("change", (e) => {
  myList.sortList(e.target.value);
});
