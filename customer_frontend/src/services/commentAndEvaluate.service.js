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
}
export default new CommentService();
