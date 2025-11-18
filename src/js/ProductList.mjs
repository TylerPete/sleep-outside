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
              <p class="product-card__price">${product.FinalPrice}</p>
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
        this.productList = [];
    }

    async init() {

        this.productList = await this.dataSource.getData(this.category);
        this.renderList(this.productList);
    }

    renderList(list, clear = false) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", clear);
    }

    sortList(sortBy) {
        switch (sortBy) {
        case "name-asc":
            this.productList.sort((a, b) => a.Name.localeCompare(b.Name));
            break;
        case "name-desc":
            this.productList.sort((a, b) => b.Name.localeCompare(a.Name));
            break;
        case "price-asc":
            this.productList.sort((a, b) => a.FinalPrice - b.FinalPrice);
            break;
        case "price-desc":
            this.productList.sort((a, b) => b.FinalPrice - a.FinalPrice);
            break;
        }

    this.renderList(this.productList, true);
  }
}