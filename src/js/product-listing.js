import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

// Load dynamic header and footer templates
loadHeaderFooter();

// Run the function on page load

// Initialize alerts
const alert = new Alert();
alert.init();

const category = getParam("category");
console.log("Category param: ", category);

const headingElement = document.querySelector(".top-products-heading");

let formattedCategory = "";
if (!category.includes("-")) {
    formattedCategory = `${category.charAt(0).toUpperCase()}${category.slice(1)}`;
} else {
    const words = category.replace("-", " ").split(" ");
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    formattedCategory = capitalizedWords.join(" ");
}

headingElement.textContent = `Top Products: ${formattedCategory}`;

const productData = new ProductData();
console.log("ProductData: ", productData);



const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, productData, listElement);
productList.init();