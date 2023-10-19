import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server
class PaymentService {
  constructor(baseUrl = "/api/paymentVNpay") {
    this.api = createApiClient(baseUrl);
  }
  //Gọi đến endpoint trong routes
  async createPayment(data) {
    return (await this.api.post("/vnPay", data)).data;
  }
  async createPaymentVNPay(data) {
    return (await this.api.post("/create_payment_url", data)).data;
  }
  async vnPay_ipn() {
    return (await this.api.get("/vnpay_ipn")).data;
  }
  async vnPay_return() {
    return (await this.api.get("/vnpay_return")).data;
  }
}

export default new PaymentService();
