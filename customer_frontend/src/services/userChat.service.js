import createApiClient from "./api.service";
class ChatService {
  constructor(baseUrl = "/api/userChat") {
    this.api = createApiClient(baseUrl);
  }
  async userChat(data) {
    return (await this.api.post("/", data)).data;
  }

  async findContentInChat(data) {
    return (await this.api.put("/", data)).data;
  }
  async getAllChatsForUser() {
    return (await this.api.get("/")).data;
  }
  async getQuantityNewChatForUser() {
    return (await this.api.get("/getQuantityNewChatForUser")).data;
  }

  // socket
  async getAllChatsForUserSocket() {
    return (await this.api.get("/chat_with_socket")).data;
  }
  async userChatSocket(data) {
    return (await this.api.post("/chat_with_socket", data)).data;
  }

  async findContentInChatSocket(data) {
    return (await this.api.put("/chat_with_socket", data)).data;
  }
}
export default new ChatService();
