<script>
import orderService from "@/services/order.service";
import { VImg, VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VExpansionPanelText } from "vuetify/lib/components/index.mjs";
import payment from "../services/payment.service";
import { isAfter, parseISO } from 'date-fns';
export default {
  components: {
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelText,
    VExpansionPanelTitle,
    VImg
  },
  data() {
    return {
      currentPage: 1,
      ordersPerPage: 5,
    };
  },
  props: {
    orders: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  // emits: ["update:activeIndex"],
  methods: {
    // updateActiveIndex(index) {
    //     this.$emit("update:activeIndex", index);
    // }
    isFutureEvent(eventDate) {
      const parsedEventDate = parseISO(eventDate);
      const currentDate = new Date();
      // console.log("123", isAfter(parsedEventDate, currentDate));
      // So sánh ngày event_date với ngày hiện tại
      return isAfter(parsedEventDate, currentDate);
    },
    getImage(food) {
      return `http://localhost:3000/${food.image}`;
    },
    formatCurrency(number) {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      });
      return formatter.format(number);
    },
    toggleMenu(index) {
      this.orders[index].showMenu = !this.orders[index].showMenu;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      return formattedDate;
    },
    showConfirmCancel(orderId) {
      if (confirm("Bạn có chắc chắn muốn hủy đơn này?")) {
        this.cancel(orderId);
      }
    },
    async payment(orderId) {
      this.$router.push({ name: 'payment', params: { orderId: orderId } });
      // const data = {
      //   orderId: orderId,
      //   amount: 100000
      // };
      // console.log("data", data)
      // const link = await payment.createPaymentVNPay(data);
      // const linkReal = link.vnpUrl;
      // if (linkReal) {
      //   try {
      //     window.location.href = linkReal;
      //     // await orderService.addOrder(data);
      //     // this.showSuccessToast();

      //   } catch (error) {
      //     console.log(error)
      //   }}



    },
    async cancel(orderId) {
      console.log(orderId)
      try {
        const rs = await orderService.cancelOrder(orderId);
        // console.log("hike", rs)
        if (rs) {

          this.$emit('cancel', this.orders)
        }
      } catch (error) {
        console.log(error);
      }
    },
    // Chuyển đến trang trước
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // Chuyển đến trang sau
    nextPage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++;
      }
    },


  },
  computed: {
    // Tính toán số trang dựa trên số đơn hàng và đơn hàng trên mỗi trang
    totalPage() {
      return Math.ceil(this.orders.length / this.ordersPerPage);
    },
    // Lọc và hiển thị danh sách đơn hàng trên trang hiện tại
    displayedOrders() {
      const startIndex = (this.currentPage - 1) * this.ordersPerPage;
      const endIndex = startIndex + this.ordersPerPage;
      return this.orders.slice(startIndex, endIndex);
    },
  },

};

</script>
<template>
  <div class="row">

    <v-expansion-panels>
      <v-expansion-panel class="mb-3" v-for="(order, index) in  displayedOrders" :key="order._id">
        <div class="row">
          <div class="col-md-12 mb-3">
            <p class="ms-2"><b>Trạng thái:</b> &nbsp;
              <span class="text-warning" v-if="order.status == 0">Chưa duyệt <button class="btn btn-danger"
                  @click="showConfirmCancel(order._id)">Hủy</button></span>
              <span class="text-success" v-if="order.status == 1">Đã duyệt <i class="fa fa-check"
                  aria-hidden="true"></i></span>
              <span class="text-danger" v-if="order.status == 2">Đã bị hủy <i class="fa fa-times"
                  aria-hidden="true"></i></span>
              <span class="text-danger" v-if="order.status == 3">Bạn đã hủy <i class="fa fa-times"
                  aria-hidden="true"></i></span>
            </p>
          </div>



          <div class="col-md-12">
            <div class="row">

              <div class="custom-column col-6">
                <div class="info-row">
                  <span class="label"><i class="fa-solid fa-user"></i> Họ tên: &nbsp;</span>
                  <span class="value">{{ order.fullname }}</span>
                </div>
                <div class="info-row">
                  <span class="label"><i class="fa-solid fa-envelope"></i> Email: &nbsp;</span>
                  <span class="value">{{ order.email }}</span>
                </div>
                <div class="info-row">
                  <span class="label"><i class="fa-solid fa-phone"></i> Số điện thoại: &nbsp;</span>
                  <span class="value">{{ order.phone }}</span>
                </div>
                <div class="info-row">
                  <span class="label"><i class="fa-solid fa-tablet"></i> Số lượng bàn: &nbsp;</span>
                  <span class="value">{{ order.tray_quantity }}</span>
                </div>
                <div class="info-row" v-if="order.note">
                  <span class="label"><i class="fa-solid fa-note-sticky"></i> Ghi chú: &nbsp;</span>
                  <span class="value">{{ order.note }}</span>
                </div>
                <div class="info-row" v-if="order.status == 1">
                  <span class="label"><i class="fa-solid fa-credit-card"></i> Trạng thái thanh toán &nbsp;</span>
                  <span class="badge badge-success d-flex align-items-center"
                    v-if="order.statusPayment == 1 && order.paymentMethod == 'vnpay'">
                    Đã thanh toán vnpay
                  </span>
                  <span class="badge badge-success d-flex align-items-center"
                    v-if="order.statusPayment == 1 && order.paymentMethod == 'stripe'">
                    Đã thanh toán stripe
                  </span>
                  <span class="badge badge-success d-flex align-items-center"
                    v-if="order.statusPayment == 1 && order.paymentMethod == 'paylater'">
                    Thanh toán trực tiếp
                  </span>
                  <span class="badge badge-danger d-flex align-items-center" v-else-if="order.statusPayment == 0">
                    Chưa thanh toán
                  </span>
                </div>
              </div>

              <div class="custom-column col-6">
                <div class="info-row">
                  <span class="label"><i class="fa-regular fa-calendar-days"></i> Ngày thực hiện: &nbsp;</span>
                  <span class="value">{{ formatDate(order.createAt) }}</span>
                </div>
                <div class="info-row">
                  <span class="label"><i class="fa-regular fa-calendar-check"></i> Ngày diễn ra: &nbsp;</span>
                  <span class="value">{{ order.event_date + " Vào lúc: " + order.event_time }}</span>
                </div>
                <div class="info-row">
                  <span class="label"><i class="fa-solid fa-location-dot"></i> Địa chỉ tiệc: &nbsp;</span>
                  <span class="value">{{ order.address }}</span>
                </div>
                <div class="info-row">
                  <span class="label"><i class="fa-solid fa-dollar-sign"></i> Tổng tiền: &nbsp;</span>
                  <span class="value">{{ formatCurrency(order.total) }}</span>
                </div>

                <div class="info-row" v-if="order.deposit !== 0">
                  <span class="label" v-if="order.paymentMethod != ''"><i class="fa-solid fa-dollar-sign"></i> Số
                    tiền đã thanh toán: &nbsp;</span>

                  <span class="value" v-if="order.statusPayment == 1 && order.paymentMethod == 'vnpay'">
                    {{ formatCurrency(order.deposit) }}</span>
                  <span class="value" v-if="order.statusPayment == 1 && order.paymentMethod == 'stripe'">
                    {{ formatCurrency(order.deposit) }}
                  </span>
                </div>
                <div v-if="order.surcharges && order.surcharges.length > 0" class="info-row">
                  <table class="table">
                    <tr>
                      <th>Phụ thu: </th>
                      <td>
                        <ul>
                          <li v-for="(surcharge, index) in order.surcharges" :key="index">
                            {{ surcharge.key }}: {{ surcharge.value }}
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </table>

                </div>
              </div>


            </div>
            <div v-if="order.statusPayment == 0 && isFutureEvent(order.event_date) && order.status == 1">
              <button class="btn btn-success ml-3" @click="payment(order._id)"><i class="fa-solid fa-dollar-sign"></i>
                Thanh toán</button>
            </div>
            <div v-if="order.statusPayment == 0 && !isFutureEvent(order.event_date) && order.status !== 1">
              Đơn hàng chưa duyệt hoặc quá hạn
            </div>
          </div>






          <!-- <div class="col-md-12">
            <div style="display: flex; justify-content: space-between;">
              <div style="flex: 1;">
                <table class="table custom-height-table">
                  <tbody>
                    <tr>
                      <th>Họ tên: &nbsp;</th>
                      <td>{{ order.fullname }}</td>
                    </tr>
                    <tr>
                      <th>Email: &nbsp;</th>
                      <td>{{ order.email }}</td>
                    </tr>
                    <tr>
                      <th>Số điện thoại: &nbsp;</th>
                      <td>{{ order.phone }}</td>
                    </tr>
                    <tr>
                      <th>Số lượng bàn: &nbsp;</th>
                      <td>{{ order.tray_quantity }}</td>
                    </tr>
                    <tr v-if="order.status == 1">
                      <th>Trạng thái thanh toán &nbsp;</th>
                      <td class="text-success" v-if="order.statusPayment == 1 && order.paymentMethod == 'vnpay'">
                        Đã thanh toán
                      </td>
                      <td class="text-success" v-if="order.statusPayment == 1 && order.paymentMethod == 'paylater'">
                        Thanh toán trực tiếp
                      </td>
                      <td class="text-danger" v-else-if="order.statusPayment == 0">
                        Chưa thanh toán
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
              <div style="flex: 1;">
                <table class="table custom-height-table">
                  <tbody>
                    <tr>
                      <th>Địa chỉ tiệc: &nbsp;</th>
                      <td>{{ order.address }}</td>
                    </tr>
                    <tr>
                      <th>Ngày diễn ra: &nbsp;</th>
                      <td>{{ order.event_date + " Vào lúc: " + order.event_time }}</td>
                    </tr>
                    <tr>
                      <th>Ngày thực hiện: &nbsp;</th>
                      <td>{{ formatDate(order.createAt) }}</td>
                    </tr>
                    <tr>
                      <th>Tổng tiền: &nbsp;</th>
                      <td>{{ formatCurrency(order.total) }}</td>
                    </tr>
                    <tr v-if="order.deposit !== 0">
                      <th v-if="order.paymentMethod == 'vnpay'">Số tiền đã thanh toán: &nbsp;</th>
                      <td v-if="order.statusPayment == 1 && order.paymentMethod == 'vnpay'">
                        {{ formatCurrency(order.deposit) }}
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
            <div v-if="order.statusPayment == 0 && isFutureEvent(order.event_date) && order.status == 1">
              <button class="btn btn-success" @click="payment(order._id)">Thanh toán</button>
            </div>
            <div v-if="order.statusPayment == 0 && !isFutureEvent(order.event_date) && order.status !== 1">
              Đơn hàng chưa duyệt hoặc quá hạn
            </div>
          </div> -->
        </div>
        <v-expansion-panel-title>
          <div class="col-md-12 text-center">
            <i class="fa fa-angle-double-down" aria-hidden="true"></i>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-if="order.cart" class="container">
            <div v-if="order.cart[0].menu.length > 0">
              <div>
                <h5 class="text-center">Thực đơn</h5>
                <table class="table table-bordered text-center ">
                  <thead>
                    <th>Tên món</th>
                    <th>Hình ảnh</th>
                    <th>Giá</th>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in order.cart[0].menu" :key="index">
                      <td>{{ item.food_name }}</td>
                      <td><v-img :src="getImage(item)" cover height="100px"></v-img></td>
                      <td>{{ formatCurrency(item.price) }}</td>
                    </tr>
                    <tr>
                      <td>
                        Tổng tiền Menu: {{ formatCurrency(order.cart[0].totalMenu) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="order.cart[1].drink.length > 0">
              <h5 class="text-center">Đồ uống</h5>
              <div>
                <table class="table table-bordered text-center">
                  <thead>
                    <th>Tên</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in   order.cart[1].drink  " :key="index">
                      <td>{{ item.drink_name }}</td>
                      <td>
                        {{ item.quantity + " " + item.unit }}
                      </td>
                      <td>{{ formatCurrency(item.price) }}</td>
                    </tr>
                    <tr>
                      <td>
                        Tổng tiền Đồ uống: {{ formatCurrency(order.cart[1].totalDrink) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="order.cart[2].other.length > 0">
              <h5 class="text-center">Khác</h5>
              <table class="table table-bordered text-center">
                <thead>
                  <th>Tên</th>
                  <th>Hình ảnh</th>
                  <th>Giá</th>
                </thead>
                <tbody>
                  <tr v-for="(  item, index  ) in   order.cart[2].other  " :key="index">
                    <td>{{ item.other_name }}</td>
                    <td><v-img :src="getImage(item)" cover height="100px"></v-img></td>
                    <td>{{ formatCurrency(item.price) }}</td>
                  </tr>
                  <tr>
                    <td>
                      Tổng tiền Khác: {{ formatCurrency(order.cart[2].totalOther) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else class="container">
            Trống
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- Nút điều hướng trang -->
    <div class="col-md-12 text-center my-3">
      <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1"><i class="fa fa-angle-double-left"
          aria-hidden="true"></i>
      </button>
      <span> &nbsp; <u>{{ currentPage }}</u> &nbsp; </span>
      <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPage"><i
          class="fa fa-angle-double-right" aria-hidden="true"></i></button>
    </div>
  </div>
</template>
<style scoped>
.status-container {
  display: flex;
  align-items: center;
}

.custom-column {
  padding: 40px;
  /* width: 150px; */
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  margin-bottom: 10px;
  border-radius: 10px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  /* margin-top: 5px; */
  padding-bottom: 10px;
}

.label {
  flex: 1;
  font-weight: bold;
  white-space: nowrap;
}

/* .value {
  flex: 2;
  white-space: nowrap;
} */


.custom-height-table tbody tr th,
.custom-height-table tbody tr td {
  height: 97px;
}
</style>