import { renderListWithTemplate } from "./utils.mjs";


    function productCardTemplate(product) {
    return `
        <li class="product-card">
        <a href="product_pages/?products=${product.Id}">
            <img src="${product.Image}" alt="${product.Name}">
            <h2>${product.Brand.Name}</h2>
            <h3>${product.Name}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
        </li>
        `;
    }

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    
    
    async init() {
        const list = await this.dataSource.getData();
        // IDs/tents to hide because we don't have the details pages for them
        const hiddenIds = ["989CG", "880RT"];

        // Filtering them out
        const filteredList = list.filter(product => !hiddenIds.includes(product.Id));
        this.renderList(filteredList);

        
    }


    renderList(list){
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}

