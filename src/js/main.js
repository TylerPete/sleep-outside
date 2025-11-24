import { loadHeaderFooter, alertMessage } from "./utils.mjs";

import Alert from "./Alert.js";

// Load dynamic header and footer templates
loadHeaderFooter();

// Run the function on page load

// Initialize alerts
const alert = new Alert();
alert.init();

const newsletterForm = document.querySelector("#newsletterRegistrationForm");
newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alertMessage("Subscribed to newsletter!");

    document.querySelector("#emailInput").value = "";
});