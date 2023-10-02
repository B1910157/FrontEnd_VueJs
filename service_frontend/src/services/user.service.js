import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server 
class UserService {
    constructor(baseUrl = "/api/services") {
        this.api = createApiClient(baseUrl);
    }
    //Gọi đến endpoint trong routes
    // async register(data) {
    //     return (await this.api.post("/register", data)).data;
    // }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async logout() {
        return (await this.api.post("/logout")).data;
    }
    
}

export default new UserService();
