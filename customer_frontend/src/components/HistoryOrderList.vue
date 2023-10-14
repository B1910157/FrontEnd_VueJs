<script>
import orderService from "@/services/order.service";
import { VImg, VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VExpansionPanelText } from "vuetify/lib/components/index.mjs";

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
  <div class="row container">
    <v-expansion-panels>
      <v-expansion-panel class="mb-3" v-for="(order, index) in  displayedOrders" :key="order._id">
        <div class="row container">
          <div class="col-md-12 mb-3">
            <b>Trạng thái:</b> &nbsp;
            <span class="text-warning" v-if="order.status == 0">Chưa duyệt <button class="btn btn-danger"
                @click="showConfirmCancel(order._id)">Hủy</button></span>
            <span class="text-success" v-if="order.status == 1">Đã duyệt <i class="fa fa-check"
                aria-hidden="true"></i></span>
            <span class="text-danger" v-if="order.status == 2">Đã bị hủy <i class="fa fa-times"
                aria-hidden="true"></i></span>
            <span class="text-danger" v-if="order.status == 3">Bạn đã hủy <i class="fa fa-times"
                aria-hidden="true"></i></span>
          </div>
          <div class="col-md-12">
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
                <table class="table table-bordered ">
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
    <div class="col-md-12 text-center mt-3">
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

.custom-height-table tbody tr th,
.custom-height-table tbody tr td {
  height: 73px;
}
</style>