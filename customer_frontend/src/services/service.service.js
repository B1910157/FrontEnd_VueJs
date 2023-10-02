import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server 
class ServiceService {
    constructor(baseUrl = "/api/services") {
        this.api = createApiClient(baseUrl);
    }
    //Gọi đến endpoint trong routes
    
    async getService(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    
}

export default new ServiceService();
