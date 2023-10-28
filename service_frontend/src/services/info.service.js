import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server
class InfoService {
  constructor(baseUrl = "/api/infoService") {
    this.api = createApiClient(baseUrl);
  }
  //Gọi đến endpoint trong routes

  async info() {
    return (await this.api.get("/")).data;
  }

  async update(data) {
    return (await this.api.post("/", data)).data;
  }
  async getInfoUser(service_id) {
    return (await this.api.get(`/${service_id}`)).data;
  }
  async changePass(data) {
    return (await this.api.post("/changePass", data)).data;
  }
}

export default new InfoService();
