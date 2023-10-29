import createApiClient from "./api.service";
class CommentService {
  constructor(baseUrl = "/api/commentAndEvaluate") {
    this.api = createApiClient(baseUrl);
  }
  async getAllCommentOfService(service_id) {
    return (await this.api.get(`/comment/${service_id}`)).data;
  }

  async createComment(data) {
    return (await this.api.post("/comment", data)).data;
  }
  async getAllComment() {
    return (await this.api.get(`/comment`)).data;
  }

  //EVALUATE
  // async getAllEvaluateOfService(service_id) {
  //   return (await this.api.get(`/evaluate/${service_id}`)).data;
  // }
  // async getAllEvaluate() {
  //   return (await this.api.get(`/evaluate`)).data;
  // }

  // async createEvaluate(data) {
  //   return (await this.api.post("/evaluate", data)).data;
  // }
}
export default new CommentService();
