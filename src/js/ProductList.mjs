import { renderListWithTemplate,  } from "./utils.mjs";

function productCardTemplate(product) {
    const discountText = calculateDiscountPercentage(product.SuggestedRetailPrice, product.FinalPrice);
    let discountBadgeHtml = "";
    if (discountText) {
        discountBadgeHtml = `<div class="discount-badge">${discountText}</div>`;
    }

    return `<li class="product-card">
            <a href="/product_pages/?product=${product.Id}">
            ${discountBadgeHtml}
              <img src="${product.Images.PrimaryMedium}" alt="${product.Name}"/>
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
          </li>`;
}

function calculateDiscountPercentage(suggestedPrice, finalPrice) {
    if (finalPrice < suggestedPrice) {
        const discountAmount = suggestedPrice - finalPrice;
        const discountPercentage = (discountAmount / suggestedPrice) * 100;
        return `${Math.round(discountPercentage)}% OFF`;
    }
    return null;
}


export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const productList = await this.dataSource.getData(this.category);

        const badIds = ["989CG", "880RT"];

        const filteredList = productList.filter(product => !badIds.includes(product.Id));
        this.renderList(filteredList);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}