import createApiClient from "./api.service";
class ChangeImage {
  constructor(baseUrl = "/api/manager/changeImage") {
    this.api = createApiClient(baseUrl);
  }

  async changeImage(data) {
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
}
export default new ChangeImage();
