import { updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

// Run the function on page load
updateCartCount();

// Initialize alerts
const alert = new Alert();
alert.init();

const productData = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", productData, listElement);
productList.init();
