import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server
class HomeService {
  constructor(baseUrl = "/api/home") {
    this.api = createApiClient(baseUrl);
  }
  //Gọi đến endpoint trong routes
  async home() {
    return (await this.api.get("/")).data;
  }
  async getAllEmployment() {
    return (await this.api.get("/employments")).data;
  }
  async getService(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async getAllMenuOfService(service_id) {
    return (await this.api.get(`/${service_id}/getMenu`)).data;
  }
  async chooseService(service_id) {
    return (await this.api.get(`/chooseService/${service_id}`)).data;
  }
  async unChooseServiceReal() {
    return (await this.api.put(`/unChoose`)).data;
  }
  async getFoodServiceWithUser(service_id, foodId) {
    return (await this.api.get(`/findOneFood/${service_id}/${foodId}`)).data;
  }
  async getAllFoodOfService(service_id) {
    return (await this.api.get(`${service_id}/getFood`)).data;
  }
  async getAllDrinkOfService(service_id) {
    return (await this.api.get(`${service_id}/getDrink`)).data;
  }
  async getAllOtherOfService(service_id) {
    return (await this.api.get(`${service_id}/getOther`)).data;
  }
}

export default new HomeService();
