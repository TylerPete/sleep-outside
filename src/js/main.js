import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

// Load dynamic header and footer templates
loadHeaderFooter();

// Run the function on page load

// Initialize alerts
const alert = new Alert();
alert.init();




// Old product list generator code, now not needed in src/index.html
//    (only needed in product_listing/index.html)

// const productData = new ProductData("tents");
// const listElement = document.querySelector(".product-list");

// const productList = new ProductList("tents", productData, listElement);
// productList.init();
