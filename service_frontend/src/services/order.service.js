import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server
class OrderService {
  constructor(baseUrl = "/api/service_orders") {
    this.api = createApiClient(baseUrl);
  }
  //Gọi đến endpoint trong routes
  // async addOrder(data) {
  //     return (await this.api.post("/", data)).data;
  // }
  async findAll() {
    return (await this.api.get("/")).data;
  }
  async getOrder() {
    return (await this.api.get("/getOrder")).data;
  }
  async findOneOrder(orderId) {
    return (await this.api.get(`/${orderId}`)).data;
  }

  async accept(orderId) {
    return (await this.api.put(`/accept/${orderId}`)).data;
  }
  async cancel(orderId, reason) {
    return (await this.api.put(`/cancel/${orderId}`, reason)).data;
  }

  async removeFoodInOrder(orderId, foodId) {
    return (await this.api.delete(`/removeFoodInOrder/${orderId}/${foodId}`))
      .data;
  }
  async addFoodToCartInOrder(orderId, foodId) {
    return (await this.api.get(`/addFoodToCartInOrder/${orderId}/${foodId}`))
      .data;
  }
  async getFoodNotInOrder(orderId) {
    return (await this.api.get(`/order/findFoodNotInOrder/${orderId}`)).data;
  }

  async getDrinkNotInOrder(orderId) {
    return (await this.api.get(`/order/findDrinkNotInOrder/${orderId}`)).data;
  }

  async addOrUpdateDrink(orderId, data) {
    return (await this.api.put(`/${orderId}/addOrUpdateDrink`, data)).data;
  }
  async removeDrinkInOrder(orderId, drinkId) {
    return (await this.api.delete(`/removeDrinkInOrder/${orderId}/${drinkId}`))
      .data;
  }

  async addOtherToCartInOrder(orderId, otherId) {
    return (await this.api.get(`/addOtherToCartInOrder/${orderId}/${otherId}`))
      .data;
  }
  async getOtherNotInOrder(orderId) {
    return (await this.api.get(`/order/findOtherNotInOrder/${orderId}`)).data;
  }
  async removeOtherInOrder(orderId, otherId) {
    return (await this.api.delete(`/removeOtherInOrder/${orderId}/${otherId}`))
      .data;
  }
  async updateInfoParty(orderId, data) {
    return (await this.api.post(`/updateInfoParty/${orderId}`, data)).data;
  }
  async addSurcharges(data) {
    return (await this.api.post(`/surcharges`, data)).data;
  }
  async reSendMail(orderId) {
    return (await this.api.get(`/reSendMail/${orderId}`)).data;
  }
  async findOrdersByDate(data) {
    return (await this.api.post(`/findOrdersByDate`, data)).data;
  }
}

export default new OrderService();
