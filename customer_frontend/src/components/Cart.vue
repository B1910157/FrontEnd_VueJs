<template>
  <div class="cart">
    <div class="cart-icon" @click="toggleCart">
      <i class="fa fa-book text-warning"></i> &nbsp;
      <p class="text-danger font-weight-bold" v-if="this.Auth"> {{ this.cartFood.menu.length + this.cartDrink.items.length
        + this.cartOther.otherList.length
      }}</p>
      <p class="text-danger font-weight-bold" v-if="!this.Auth"> {{ this.localCart.items[0].menu.length +
        this.localCart.items[1].drink.length + this.localCart.items[2].other.length
      }}</p>
     
    </div>
    <div class="cart-content" v-if="showCart && Auth">
      <div class="text-center row" v-if="this.cartFood.service_id">
        <div class="col-6 text-left">
          <router-link :to="{ name: 'serviceDetail', params: { service_id: this.cartFood.service_id } }">
            <span class="mt-2 badge badge-primary">
              Đến dịch vụ
            </span>
          </router-link>
        </div>
        <div
          v-if="this.Auth && (this.cartFood.menu.length > 0 || this.cartDrink.drink.length > 0 || this.cartOther.other.length > 0)"
          class="col-6 text-right">
          <router-link :to="{ name: 'order' }">
            <v-btn variant="tonal" class="btn btn-primary">Đặt ngay</v-btn>
          </router-link>
        </div>



      </div>
      <h5 class="text-center" v-if="!this.cartFood.service_id">
        Bạn chưa chọn dịch vụ hỗ trợ

        <router-link :to="{
          name: 'home',
        }">
          <span class="mt-2 badge badge-primary">
            Chọn</span>
        </router-link>
      </h5>

      <div v-if="this.cartFood">
        <h6>THỰC ĐƠN</h6>

        <table class="table table-bordered">
          <thead>
            <th>Tên</th>
            <th>Giá</th>
          </thead>
          <tr v-if="this.cartFood.menu.length == 0">
            <td colspan="3" class="text-center">
              <u><i>Menu trống</i></u>
            </td>
          </tr>
          <tr v-for="(item, index) in this.cartFood.menu" :key="index">
            <td>{{ item.food_name }}</td>
            <td>{{ item.price }}</td>
            <td><button class="btn btn-danger" @click="removeFoodInCartReal(item.service_id, item._id)"> <i
                  class="fa fa-trash"></i></button>
            </td>

          </tr>
          Tổng tiền Menu: {{ formatCurrency(this.cartFood.totalMenu) }}
        </table>
      </div>
      <div>
        <h6>Đồ uống</h6>
        <table class=" table table-bordered">
          <thead>
            <th>Tên</th>
            <th>Số lượng</th>
            <th>Giá</th>
          </thead>
          <tr v-if="this.cartDrink.items.length == 0">
            <td colspan="3" class="text-center">
              <u><i>Trống </i></u>
            </td>
          </tr>
          <tr v-for="(item, index) in cartDrink.items" :key="index">
            <td>{{ item.drink_name }}</td>
            <td>
              <input type="number" name="quantity" v-model="item.quantity" min="1" max="999">

              <button class="btn btn-warning mr-2" @click="updateDrink(item.service_id, item._id, item.quantity)">
                <i class="fa fa-pencil"></i>
              </button>
              <button class="btn btn-danger" @click="deleteDrinkReal(item.service_id, item._id)"> <i
                  class="fa fa-trash"></i>
              </button>
            </td>
            <td>{{ item.price }}</td>

          </tr>
          <td>Tổng tiền đồ uống: {{ formatCurrency(this.cartDrink.totalDrink) }}</td>
        </table>
      </div>

      <div v-if="this.cartOther.otherList.length != 0">
        <h6>Dịch vụ khác</h6>

        <table class="table table-bordered">
          <thead>
            <th>Tên</th>
            <th>Giá</th>
          </thead>
          <tr v-for="(item, index) in this.cartOther.otherList" :key="index">
            <td>{{ item.other_name }}</td>
            <td>{{ item.price }}</td>
            <td><button class="btn btn-danger" @click="removeOtherInCartReal(item.service_id, item._id)"> <i
                  class="fa fa-trash"></i></button>
            </td>

          </tr>
          Tổng tiền Khác: {{ formatCurrency(this.cartOther.totalOther) }}
        </table>
      </div>
      <hr>
    </div>

    <div class="cart-content" v-else-if="showCart && !Auth">
      <h4>CART LOCALSTORAGE</h4>
      <div class="row" v-if="this.localCart.service_id">
        <!-- <router-link :to="{ name: 'serviceDetail', params: { service_id: this.localCart.service_id } }">
          <span class="mt-2 badge badge-primary">Đến dịch vụ</span>
        </router-link> -->
        <div class="col-6 text-left">
          <router-link :to="{ name: 'serviceDetail', params: { service_id: this.localCart.service_id } }">
            <span class="mt-2 badge badge-primary">
              Đến dịch vụ
            </span>
          </router-link>
        </div>



        <div
          v-if="!this.Auth && (this.localCart.items[0].menu.length > 0 || this.localCart.items[1].drink.length > 0 || this.localCart.items[2].other.length > 0)"
          class="col-6 text-right">
          <router-link :to="{ name: 'order' }">
            <v-btn variant="tonal" class="btn btn-primary">Đặt ngay</v-btn>
          </router-link>
        </div>


      </div>
      <h5 class="text-center" v-else>
        Bạn chưa chọn dịch vụ hỗ trợ

        <router-link :to="{
          name: 'home',

        }">
          <span class="mt-2 badge badge-primary">
            Chọn</span>
        </router-link>
      </h5>
      <div v-if="this.localCart">

        <h6>THỰC ĐƠN</h6>
        <table class="table table-bordered">
          <thead>
            <th>Tên</th>
            <th>Giá</th>
          </thead>
          <tr class="text-center" v-if="this.localCart.items[0].menu.length == 0">
            <td colspan="4">
              <u><i>Trống</i></u>

            </td>
          </tr>
          <tr v-for="(item, index) in this.localCart.items[0].menu" :key="index">
            <td>{{ item.food_name }}</td>
            <td>{{ item.price }}</td>

            <td><button class="btn btn-danger" @click="removeFoodInLocalCart(item._id)"> <i
                  class="fa fa-trash"></i></button>
            </td>

          </tr>
          Tổng tiền Menu: {{ formatCurrency(this.localCart.items[0].totalMenu) }}

        </table>
      </div>
      <!-- <div v-else>
        Trống
      </div> -->
      <div v-if="this.localCart">

        <h6>Đồ uống</h6>
        <table class="table table-bordered">
          <thead>
            <th>Tên</th>
            <th>Giá</th>
          </thead>
          <!-- <tr class="text-center" v-if="this.localCart.items[1].drink.length == 0">
            <td colspan="4">
              <u><i>Trống</i></u>

            </td>
          </tr> -->
          <tr v-for="(item, index) in this.localCart.items[1].drink" :key="index">
            <td>{{ item.drink_name }}</td>

            <td>
              <input type="number" name="quantity" v-model="item.quantity" min="1" max="999">

              <button class="btn btn-warning mr-2"
                @click="updateDrinkLocalCart(this.localCart.service_id, item, item.quantity)">
                <i class="fa fa-pencil"></i>
              </button>
              <button class="btn btn-danger " @click="removeDrinkInLocalCart(item._id)"> <i
                  class="fa fa-trash"></i></button>
            </td>
            <td>{{ item.price }}</td>
          </tr>
          Tổng tiền đồ uống: {{ formatCurrency(this.localCart.items[1].totalDrink) }}

        </table>
      </div>

      <div v-if="this.localCart">
        <h6>DỊCH VỤ KHÁC</h6>
        <table class="table table-bordered">
          <thead>
            <th>Tên</th>
            <th>Giá</th>
          </thead>

          <tr v-for="(item, index) in this.localCart.items[2].other" :key="index">
            <td>{{ item.other_name }}</td>
            <td>{{ item.price }}</td>
            <td><button class="btn btn-danger" @click="removeOtherInLocalCart(item._id)"> <i
                  class="fa fa-trash"></i></button>
            </td>

          </tr>
          Tổng tiền khác: {{ formatCurrency(this.localCart.items[2].totalOther) }}

        </table>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import infoService from "../services/info.service";
import CartService from "../services/cart.service";
import MenuService from "../services/menu.service";
import homeService from "@/services/home.service";
import { object } from "yup";
import { VBtn } from "vuetify/lib/components/index.mjs";


export default {
  components: {
    VBtn
  },
  data() {
    return {
      showCart: false,
      info: object,
      service: object,
      menuInCart: [],


    };
  },

  computed: {
    ...mapState(["Auth", "cartFood", "cartDrink", "cartOther", "localCart"]),

    filteredinfo() {
      return this.info;
    },
    filteredService() {
      return this.service;
    },
  },

  methods: {
    formatCurrency(number) {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      });
      return formatter.format(number);
    },
    ...mapMutations(["setAuth"]),

    ...mapActions(['getCart', 'getLocalCart', 'removeFoodInCart', 'removeOtherInCart', 'unChooseService', 'getDrinkInCart', 'getItemsInDrinkCart', 'getOtherInCart']),

    async updateDrink(service_id, drinkId, quantity) {
      await this.addDrinkToCartReal({ service_id, drinkId, quantity });

    },
    async deleteDrinkReal(service_id, drinkId) {
      try {
        if (confirm("Xác nhận xóa?")) {
          await MenuService.deleteDrink(service_id, drinkId);
          this.getItemsInDrinkCart();
        }

      } catch (error) {

        console.log(error);
      }

    },

    ...mapActions(['addDrinkToCartReal', 'addDrinkToLocalCart']),

    async unChooseServiceReal() {
      this.unChooseService();
    },

    toggleCart() {
      this.showCart = !this.showCart;
    },
    async retrieveInfo() {
      if (this.Auth) {
        try {

          this.info = await infoService.info();
          // console.log("ìnoooooooooooooo",this.info);
          if (this.info.cart.service_id) {

            await this.getService(this.info.cart.service_id);
          } else {
            console.log("Chưa chọn dịch vụ") //TODO
          }
        } catch (error) {
          console.log(error);
        }

      }

    },
    refreshInfo() {
      this.retrieveInfo();
    },

    async getService(service_id) {
      try {
        this.service = await homeService.getService(service_id);
      } catch (error) {
        console.log(error);
      }
    },
    async removeFoodInCartReal(service_id, foodId) {
      await this.removeFoodInCart({ service_id, foodId });
    },
    async removeOtherInCartReal(service_id, otherId) {
      await this.removeOtherInCart({ service_id, otherId });
    },
    calculateTotal(localCart) {
      let totalMenu = 0;
      for (const item of localCart.items[0].menu) {
        totalMenu += item.price;
      }
      return totalMenu;
    },
    calculateOtherTotal(localCart) {
      let totalOther = 0;
      for (const item of localCart.items[2].other) {
        totalOther += item.price;
      }
      return totalOther;
    },
    calculateDrinkTotal(localCart) {
      let totalDrink = 0;
      for (const item of localCart.items[1].drink) {
        totalDrink += item.price * item.quantity;
      }
      return totalDrink;
    },

    removeFoodInLocalCart(foodId) {
      if (window.confirm('Bạn có chắc chắn muốn xóa món này khỏi menu?')) {
        const updatedMenu = this.localCart.items[0].menu.filter((food) => food._id !== foodId);
        this.localCart.items[0].menu = updatedMenu;
        this.localCart.items[0].totalMenu = this.calculateTotal(this.localCart);
        localStorage.setItem('localCart', JSON.stringify(this.localCart));
      }
    },
    removeOtherInLocalCart(otherId) {
      if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ khác này?')) {
        const updatedMenu = this.localCart.items[2].other.filter((other) => other._id !== otherId);
        this.localCart.items[2].other = updatedMenu;
        this.localCart.items[2].totalOther = this.calculateOtherTotal(this.localCart);
        localStorage.setItem('localCart', JSON.stringify(this.localCart));
      }
    },
    removeDrinkInLocalCart(drinkId) {
      if (window.confirm('Bạn có chắc chắn muốn xóa món này khỏi menu?')) {
        const updatedMenu = this.localCart.items[1].drink.filter((drink) => drink._id !== drinkId);
        this.localCart.items[1].drink = updatedMenu;
        this.localCart.items[1].totalDrink = this.calculateDrinkTotal(this.localCart);
        localStorage.setItem('localCart', JSON.stringify(this.localCart));
      }
    },

    async updateDrinkLocalCart(service_id, drinkObject, quantity) {

      await this.addDrinkToLocalCart({ service_id, drinkObject, quantity });
    },
  },

  created() {
    if (!this.Auth) {
      this.getLocalCart();

    } else {
      this.getCart();
      this.getDrinkInCart();
      this.getItemsInDrinkCart();
      this.getOtherInCart();
    }

  },
  mounted() {
    this.refreshInfo();
  },
};
</script>

<style scoped>
.cart {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 750px;
  z-index: 1000;

}

.cart-icon {
  background-color: #f0f0f0;
  width: 80px;
  height: 80px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  position: absolute;
  bottom: 0;
  right: 0;
}

.cart-icon i {
  font-size: 30px;
}

.cart-icon:hover {
  background-color: #dddddd;
}

.cart-content {
  max-height: 450px;
  width: 660px;
  overflow-y: auto;
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 100%;

}

input {
  border: solid 1px black;
  width: 60px;
  margin-right: 10px;
  padding-left: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .cart {
    width: 100%;
    right: 0;
    bottom: 0;
  }

  .cart-content {
    max-height: 50vh;
    width: 100%;
    bottom: 80px;

  }


}
</style>
