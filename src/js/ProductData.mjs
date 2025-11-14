const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
      
  }
  async findProductById(id) {
    //const products = await this.getData();
    //return products.find((item) => item.Id === id);
    const response = await fetch(`${baseURL}product/${id}`)
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
}

