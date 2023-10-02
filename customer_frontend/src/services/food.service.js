import createApiClient from "./api.service";
class FoodService {
    constructor(baseUrl = "/api/food") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
  
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
   
}
export default new FoodService();

