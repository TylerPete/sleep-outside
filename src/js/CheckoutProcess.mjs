import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

export default class CheckoutProcess {
    constructor() {
        this.cartItems = getLocalStorage("so-cart") || [];
        this.subtotal = this.calculateDisplaySubtotal();
        this.tax = this.calculateDisplayTax();
        this.shipping = this.calculateDisplayShipping();
    }

    calculateDisplaySubtotal() {
        // const subtotalElement = querySelector("#subtotal");
        return this.cartItems.reduce((sum, item) => sum + ((item.FinalPrice * 100) * item.Quantity), 0);
        // subtotalElement.textContent = `Subtotal: $${(subtotal / 100).toFixed(2)}`;
    }

    calculateDisplayTax() {
        return ((this.subtotal / 100) * 6).toFixed(2);
    }

    calculateDisplayShipping() {
        const numItems = this.cartItems.reduce((totalQty, item) => totalQty + item.Quantity, 0);

        if (numItems === 0) {
            return 0;
        }

        return 1000 + 200 * (numItems - 1);
    }

    calculateOrderTotal() {
        return parseInt(this.subtotal) + parseInt(this.tax) + parseInt(this.shipping);
    }
}

//takes the items currently stored in the cart (localStorage) and returns them in a simplified form
export function packageItems(items) {
    const checkoutItems = items.map(item => {
        const itemObj = {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.Quantity
        }

        return itemObj;
    });

    return checkoutItems;
}

export async function checkout(form) {
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());

    const cartItems = getLocalStorage("so-cart") || [];
    const items = packageItems(cartItems);

    dataObj.orderDate = new Date().toISOString();
    dataObj.items = items;

    const shippingElement = form.querySelector("#shipping");
    const taxElement = form.querySelector("#tax");
    const totalElement = form.querySelector("#total");
    
    // "Globally (everywhere in the string) find all characters that are NOT
    //  a digit (0-9) OR a period (.) and replace it with ''."
    // .trim() cleans up whitespace from the ends
    // .replace(/[^0-9.]/g, '') removes everything except numbers and the dot
    dataObj.shipping = parseFloat(shippingElement.textContent.trim().replace(/[^0-9.]/g, ""));
    dataObj.tax = taxElement.textContent.trim().replace(/[^0-9.]/g, ""); 
    dataObj.orderTotal = totalElement.textContent.trim().replace(/[^0-9.]/g, ""); 

    try {
      const response = await services.checkout(dataObj);
      console.log(response);
    } catch (err) {
      console.log(err);
    }

}