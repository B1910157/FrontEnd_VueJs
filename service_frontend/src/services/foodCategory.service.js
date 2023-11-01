import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server
class FoodCategoryService {
  constructor(baseUrl = "/api/food_category") {
    this.api = createApiClient(baseUrl);
  }
  //Gọi đến endpoint trong routes

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async findOne(id) {
    return (await this.api.get(`/${id}`)).data;
  }
}

export default new FoodCategoryService();
