import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server
class ProvincesService {
  constructor(baseUrl = "https://vn-public-apis.fpo.vn/") {
    this.api = createApiClient(baseUrl);
  }
  //Gọi đến endpoint trong routes
  async getProvinces(provinceName) {
    return (
      await this.api.get(
        `/provinces/getAll?q=${provinceName}&cols=name&page=1&limit=-1`
      )
    ).data.data.data;
  }
  async getDistricts(provinceCode, districtName) {
    return (
      await this.api.get(
        `/districts/getByProvince?provinceCode=${provinceCode}&q=${districtName}&cols=name&page=1&limit=-1`
      )
    ).data.data.data;
  }
  async getWards(districtCode, wardName) {
    return (
      await this.api.get(
        `wards/getByDistrict?q=${wardName}&cols=name&page=1&limit=-1&districtCode=${districtCode}`
      )
    ).data.data.data;
  }
}

export default new ProvincesService();
