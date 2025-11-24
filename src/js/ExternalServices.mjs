const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {

  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {

    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);

    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }

  // NEW: Fetch all categories and filter client-side
  async searchProducts(query) {
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

    // Fetch all 4 categories in parallel
    const promises = categories.map(category => this.getData(category));

    try {
      const results = await Promise.all(promises);
      // results is an array of 4 arrays. Flatten them into one list.
      const allProducts = results.flat();

      const lowercaseQuery = query.toLowerCase();

      // This filter: Can check Name, Brand, and maybe Description
      const filtered = allProducts.filter(item => {
        const nameMatch = item.Name && item.Name.toLowerCase().includes(lowercaseQuery);
        const brandMatch = item.Brand && item.Brand.Name && item.Brand.Name.toLowerCase().includes(lowercaseQuery);
        // const descMatch = item.DescriptionHtmlSimple && item.DescriptionHtmlSimple.toLowerCase().includes(lowercaseQuery);

        return nameMatch || brandMatch;
      });

      return filtered;

    } catch (error) {
      console.error("Error searching products:", error);
      // Return empty array on error to prevent breaking the page
      return [];
    }
  }

}

