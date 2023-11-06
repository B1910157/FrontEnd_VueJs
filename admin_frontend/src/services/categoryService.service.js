import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server
class FoodCategoryService {
  constructor(baseUrl = "/api/food_category") {
    this.api = createApiClient(baseUrl);
  }

  async findAll() {
    return (await this.api.get("/")).data;
  }
  async findOne(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
}

export default new FoodCategoryService();
