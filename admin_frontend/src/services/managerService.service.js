import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server
class ManagerService {
  constructor(baseUrl = "/api/managerService") {
    this.api = createApiClient(baseUrl);
  }
  //Gọi đến endpoint trong routes
  // async register(data) {
  //     return (await this.api.post("/register", data)).data;
  // }
  async findAll() {
    return (await this.api.get("/")).data;
  }
  async updateStatus(data) {
    return (await this.api.put(`/updateStatus`, data)).data;
  }
  async findOrdersByMonthOfService(service_id) {
    return (await this.api.get(`findOrderByMonth/${service_id}`)).data;
  }
  async findOrdersSuccessOfService(service_id) {
    return (await this.api.get(`/findOrdersSuccess/${service_id}`)).data;
  }
  async findOrdersByMonthOfAllService() {
    return (await this.api.get(`/findOrdersByMonthOfAllService`)).data;
  }
  async findOrdersSuccessOfAllService(service_id) {
    return (await this.api.get(`/findOrdersSuccessOfAllService`)).data;
  }
  async countUser() {
    return (await this.api.get(`/countUser`)).data;
  }
  async countService() {
    return (await this.api.get(`/countService`)).data;
  }
  async totalDeposit() {
    return (await this.api.get(`/totalDeposit`)).data;
  }
}

export default new ManagerService();
