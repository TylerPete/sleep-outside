//this global variable's value comes from the .env file
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);

    const product = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(product);

    return data.Result;
  }
}