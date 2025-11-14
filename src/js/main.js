import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

// Load dynamic header and footer templates
loadHeaderFooter();

// Run the function on page load

// Initialize alerts
const alert = new Alert();
alert.init();


