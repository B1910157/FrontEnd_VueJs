import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server 
class CartService {
    constructor(baseUrl = "/api/cart") {
        this.api = createApiClient(baseUrl);
    }
    //Gọi đến endpoint trong routes
    async getFoodInCartOfUser() {
        return (await this.api.get("/findFood")).data;
    }
    async getDrinkInCartOfUser() {
        return (await this.api.get("/findDrink")).data;
    }
    async getOtherInCartOfUser() {
        return (await this.api.get("/findOther")).data;
    }

  
    
}

export default new CartService();
