import { updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Run the function on page load
updateCartCount();

const productData = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", productData, listElement);
productList.init();
