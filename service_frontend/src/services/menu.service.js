import createApiClient from "./api.service";
class MenuService {
  constructor(baseUrl = "/api/manager") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/getMenu")).data;
  }

  async create(data) {
    return (await this.api.post("/menu", data)).data;
  }

  async get(id) {
    return (await this.api.get(`/menu/${id}`)).data;
  }
  async getFoodNotInMenu(id) {
    return (await this.api.get(`/menu/findFoodNotInMenu/${id}`)).data;
  }

  async addFoodToMenu(menuId, foodId) {
    return (await this.api.post(`/addFood/${menuId}/${foodId}`)).data;
  }

  async updateMenuName(id, data) {
    return (await this.api.post(`/menu/${id}`, data)).data;
  }
  async removeFoodInMenu(menuId, foodId) {
    return (await this.api.delete(`/menu/${menuId}/food/${foodId}`)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/menu/${id}`)).data;
  }
}
export default new MenuService();
