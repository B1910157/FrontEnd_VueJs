import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server
class UserService {
  constructor(baseUrl = "/api/home") {
    this.api = createApiClient(baseUrl);
  }
  //Gọi đến endpoint trong routes
  // async register(data) {
  //     return (await this.api.post("/register", data)).data;
  // }
  async findAll() {
    return (await this.api.get("/")).data;
  }
}

export default new UserService();
