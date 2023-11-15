import createApiClient from "./api.service";
class ChatService {
  constructor(baseUrl = "/api/manager/chat") {
    this.api = createApiClient(baseUrl);
  }
  async serviceChat(data) {
    return (await this.api.post("/", data)).data;
  }
  async findContentInChat(data) {
    return (await this.api.put("/", data)).data;
  }
  async getAllChatsForService() {
    return (await this.api.get("/")).data;
  }
  async getQuantityNewChat() {
    return (await this.api.get("/getQuantityNewChat")).data;
  }

  //socket
  async serviceChatSocket(data) {
    return (await this.api.post("/chat_with_socket", data)).data;
  }
  async findContentInChatSocket(data) {
    return (await this.api.put("/chat_with_socket", data)).data;
  }
  async getAllChatsForServiceSocket() {
    return (await this.api.get("/chat_with_socket")).data;
  }
}
export default new ChatService();
