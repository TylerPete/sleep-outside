import { setLocalStorage, getLocalStorage, updateCartCount, qs, loadHeaderFooter } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Load dynamic header and footer templates
    loadHeaderFooter();


    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
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
    productDetailsTemplate(this.product);
  }
}

/**
 * FUNCTION Using template literals to create the product details HTML:
 * This function now just returns an HTML string.
 */
function productDetailsTemplate(product) {
  
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  
  let priceHtml = document.querySelector("#p-price");
  priceHtml.textContent = "";
  if (product.SuggestedRetailPrice > product.FinalPrice) {
    const suggestedSpan = document.createElement("span");
    suggestedSpan.textContent = `$${product.SuggestedRetailPrice}`;
    suggestedSpan.classList.add("old-price");
    
    const finalSpan = document.createElement("span");
    finalSpan.classList.add("final-price");
    finalSpan.textContent = `$${product.FinalPrice}`;

    priceHtml.appendChild(suggestedSpan);
    priceHtml.appendChild(finalSpan);

  } else {
    priceHtml.textContent = `$${product.FinalPrice}`;
  }

  //document.querySelector("#p-price").textContent = `$${product.FinalPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#addToCart").dataset.id = product.Id;
}
 /* let priceHtml = "";

  if (product.SuggestedRetailPrice > product.FinalPrice) {
    priceHtml = `
   <span class="product-card__price--original">
    $${product.SuggestedRetailPrice}
   </span>
   <span class="product-card__price--final">
    $${product.FinalPrice}
   </span>
 `;
  } else {
    priceHtml = `
   <span class="product-card__price--final">
    $${product.FinalPrice}
   </span>
  `;
  }
  return `
    <section class="product-detail">
        <h2>${product.Category.charAt(0).toUpperCase() + product.Category.slice(1)}</h2>
        <h3 class="product-brand-name">${product.Brand.Name}</h3>
        <h2 class="product-card__name">${product.NameWithoutBrand}</h2>
        
        <img class="divider" id="productImage" src="${product.Images.PrimaryExtraLarge}" alt="${product.NameWithoutBrand}">
        
        <p class="product-card__price" id="productPrice"> ${priceHtml}</p>
        <p class="product__color" id="productColor">${product.Colors[0].ColorName}</p>
        <p class="product__description" id="productDesc">
            ${product.DescriptionHtmlSimple}
        </p>
        
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>
  `;*/
  


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
