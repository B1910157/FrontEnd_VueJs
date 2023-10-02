import createApiClient from "./api.service";
class FoodCategoryService {
    constructor(baseUrl = "/api/food_category") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
  
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
   
}
export default new FoodCategoryService();

