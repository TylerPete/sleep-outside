import {setLocalStorage, getLocalStorage, updateCartCount,qs} from "./utils.mjs";


export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
}


async init() {

// use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  this.product =  await this.dataSource.findProductById(this.productId);
// the product details are needed before rendering the HTML
  this.renderProductDetails();
// once the HTML is rendered, add a listener to the Add to Cart button
// Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
  document.getElementById("addToCart")
    .addEventListener("click", this.addProductToCart.bind(this));
}

addProductToCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(this.product);
  setLocalStorage("so-cart", cartItems);
  updateCartCount(); // Update cart count display
}

/**
   * RENDER METHOD:
   * Finds the parent element and inserts the HTML template.
   */
  renderProductDetails() {
    // 1. Get the HTML string from our template function
    const productHtml = productDetailsTemplate(this.product);
    
    // 2. Find the parent container to put the details in
    const parentElement = qs("main");

    // 3. Inject the HTML into the parent
    parentElement.innerHTML = productHtml;
  }
}

/**
 * FUNCTION Using template literals to create the product details HTML:
 * This function now just returns an HTML string.
 */
function productDetailsTemplate(product) {
  return `
    <section class="product-detail">
        <h3 class="product-brand-name">${product.Brand.Name}</h3>
        <h2 class="product-card__name">${product.NameWithoutBrand}</h2>
        
        <img class="divider" id="productImage" src="${product.Image}" alt="${product.NameWithoutBrand}">
        
        <p class="product-card__price" id="productPrice">$${product.FinalPrice}</p>
        <p class="product__color" id="productColor">${product.Colors[0].ColorName}</p>
        <p class="product__description" id="productDesc">
            ${product.DescriptionHtmlSimple}
        </p>
        
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>
  `;
}

// Previous version of the code from the professor solution:

//   renderProductDetails() {
//     productDetailsTemplate(this.product);
//   }
// }

// function productDetailsTemplate(product) {
//   document.querySelector('h2').textContent = product.Brand.Name;
//   document.querySelector('h3').textContent = product.NameWithoutBrand;

//   const productImage = document.getElementById('productImage');
//   productImage.src = product.Image;
//   productImage.alt = product.NameWithoutBrand;

//   document.getElementById('productPrice').textContent = product.FinalPrice;
//   document.getElementById('productColor').textContent = product.Colors[0].ColorName;
//   document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

//   document.getElementById('addToCart').dataset.id = product.Id;
// }
