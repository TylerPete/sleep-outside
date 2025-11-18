import { updateCartCount, getParam, prettifySlug, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Load dynamic header and footer templates
loadHeaderFooter();

const category = getParam("category");

const titleElement = document.querySelector("h2");
const categoryName = prettifySlug(category);

titleElement.textContent = `Top Products for ${categoryName}`;
// first create an instance of the ProductData class.
const dataSource = new ProductData();

// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list");


// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);

// finally call the init method to show the products
myList.init();

