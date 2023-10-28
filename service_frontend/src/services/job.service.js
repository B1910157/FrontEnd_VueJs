import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server
class JobService {
  constructor(baseUrl = "/api/manager/job") {
    this.api = createApiClient(baseUrl);
  }
  async findAll() {
    return (await this.api.get("/")).data;
  }
  async findOne(jobId) {
    return (await this.api.get(`/${jobId}`)).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async updateOnePostJob(jobId, data) {
    return (await this.api.post(`/updateJob/${jobId}`, data)).data;
  }
}

export default new JobService();
