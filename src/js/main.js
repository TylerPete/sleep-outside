import { updateCartCount, qs } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const listElement = qs(".product-list");
const productData = new ProductData("tents");
const productList = new ProductList("tents", productData, listElement);
// Run the function on page load
productList.init();
updateCartCount();
