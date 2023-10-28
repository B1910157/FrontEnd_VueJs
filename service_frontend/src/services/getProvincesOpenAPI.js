import axios from "axios";

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const createApiClient = (baseURL) => {
  const axiosInstance = axios.create({
    baseURL,
    ...commonConfig,
  });

  return axiosInstance;
};

class ProvinceService {
  constructor(baseUrl = "https://provinces.open-api.vn/api/") {
    this.api = createApiClient(baseUrl);
  }

  async getAllProvinces(params) {
    return (await this.api.get("p/", { params })).data;
  }

  async getProvince(code) {
    return (await this.api.get(`p/${code}?depth=2`)).data;
  }

  async getDistrict(code) {
    return (await this.api.get(`d/${code}?depth=2`)).data;
  }
}

export default new ProvinceService();
