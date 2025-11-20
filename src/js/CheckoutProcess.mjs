import { getLocalStorage } from "./utils.mjs";

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