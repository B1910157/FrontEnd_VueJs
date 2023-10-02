import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server
class MenuService {
  constructor(baseUrl = "/api/service") {
    this.api = createApiClient(baseUrl);
  }

  async addFoodToMenu(service_id, foodId) {
    return (await this.api.get(`/addFoodToCart/${service_id}/${foodId}`)).data;
  }
  async addFoodFromMenu(service_id, menuId) {
    return (await this.api.get(`/addFoodFromMenu/${service_id}/${menuId}`))
      .data;
  }
  async removeFoodInCart(service_id, foodId) {
    return (await this.api.delete(`/${service_id}/removeFoodInCart/${foodId}`))
      .data;
  }
  async addDrink(service_id, data) {
    return (await this.api.put(`/${service_id}/addDrink`, data)).data;
  }
  async deleteDrink(service_id, drinkId){
    return (await this.api.get(`/${service_id}/removeDrink/${drinkId}`)).data;
  }
  async addOtherToMenu(service_id, otherId){
    return (await this.api.get(`/addOtherToCart/${service_id}/${otherId}`))
    .data;
  }
  async removeOtherInCart(service_id, otherId) {
    return (await this.api.delete(`/${service_id}/removeOtherInCart/${otherId}`))
      .data;
  }
}

export default new MenuService();
