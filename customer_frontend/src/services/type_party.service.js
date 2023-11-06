import createApiClient from "./api.service";
class TypePartyService {
  constructor(baseUrl = "/api/type_party") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
}
export default new TypePartyService();
