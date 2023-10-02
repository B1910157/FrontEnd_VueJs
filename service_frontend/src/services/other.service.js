import createApiClient from "./api.service";
class OtherService {
  constructor(baseUrl = "/api/manager/other") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }

  async create(data) {
    return (
      await this.api.post("/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, data) {
    const setHeader = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return (await this.api.put(`/${id}`, data, setHeader)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}
export default new OtherService();
