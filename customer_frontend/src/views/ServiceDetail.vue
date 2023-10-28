<template>
  <ServiceDetail :service="filteredService" :menuOfService="filteredMenuOfService" :foodOfService="this.foodOfService"
    :cart="this.cart" :chooseService="chooseService" :unChooseService="unChooseService"
    :chooseWithOtherService="chooseWithOtherService" :drinkOfService="this.drinkOfService"
    :otherOfService="this.otherOfService" />

  <div class="border container">
    <div class="text-center">
      <!-- <h5 class="font-weight-bold">Đánh giá</h5> -->
      <div class="ratings">
        <!-- Hình 5 sao - sử dụng Vue để xử lý sự kiện đánh giá -->
        <div class="rating">
          <button @click="submitEvaluate()" class="badge badge-primary ml-3">
            Đánh giá
          </button>
          <span :class="{ 'selected-star': index <= userRating }" v-for="index in [5, 4, 3, 2, 1]" :key="index"
            @click="handleUserRating(index)">&#9733; </span>

        </div>

      </div>
    </div>
    <hr>
    <div class="ml-4">
      <h5 class="font-weight-bold">Bình luận</h5>

      <form @submit.prevent="addComment">
        <input type="text" v-model="newComment" placeholder="Thêm bình luận...">
        <button type="submit">Gửi</button>
      </form>
      <hr>
      <div class="comment-section" id="comments">
        <!-- Hiển thị các bình luận từ dữ liệu -->
        <div class="comment" v-for="(comment, index) in this.comments" :key="index">
          <strong>{{ comment.user_id }}: </strong> {{ comment.comment }}
          <p>{{ formatDate(comment.createAt) }}</p>

          <hr>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import FoodCard from "@/components/FoodCard.vue";
import ServiceDetail from "@/components/ServiceDetail.vue";
import infoService from "../services/info.service";
import MenuService from "../services/menu.service";
import CommentAndEvaluate from "../services/commentAndEvaluate.service.js";
import Home from "@/services/home.service";
import { object } from "yup";
import { mapActions, mapState } from 'vuex';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    FoodCard,
    ServiceDetail,
    Form,
    Field,
    ErrorMessage,

  },

  props: {
    service_id: { type: String, required: true },
  },
  data() {
    return {
      info: object,
      service: {},
      menuOfService: [],
      foodOfService: [],
      drinkOfService: [],
      otherOfService: [],
      cart: [],
      comments: [
        { user: 'Nguyễn Văn A', comment: 'Hello' },
        { user: 'Nguyễn Thị B', comment: 'Cửa hàng rất tuyệt vời!' },
        // Thêm dữ liệu bình luận khác tại đây
      ],
      userRating: 0,
      newComment: "",
      comments: [],
    };
  },
  watch: {
    '$route.params.service_id': {
      immediate: true,
      handler() {
        let service_id_real = '';
        if (this.$route.params.service_id) {
          service_id_real = this.$route.params.service_id;
          this.getService(service_id_real);
          this.getMenuOfService(service_id_real);
          this.getFoodOfService(service_id_real);
          this.getDrinkOfService(service_id_real);
          this.getOtherOfService(service_id_real);
        }

      }
    },

  },
  computed: {
    filteredinfo() {
      return this.info;
    },
    filteredService() {
      return this.service;
    },
    filteredMenuOfService() {
      return this.menuOfService;
    },
    ...mapState(['Auth', 'localCart']),


  },

  methods: {
    submitEvaluate() {
      if (this.userRating != 0) {
        console.log("SỐ SAO", this.userRating)
      }

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
    async addComment() {
      if (this.newComment && this.Auth) {
        console.log("HELLO nè", this.newComment)
        const data = {
          user_id: this.info._id,
          service_id: this.service_id,
          comment: this.newComment

        };
        const rs = await CommentAndEvaluate.createComment(data);
        this.getService(this.service_id);
      } else if (!this.Auth) {
        alert("Vui lòng đăng nhập!!");
      }
    },
    async getCommentOfService() {
      this.comments = await CommentAndEvaluate.getAllCommentOfService(this.service_id);
      // console.log("COMT", this.comments)
    },
    handleUserRating(rating) {
      this.userRating = rating; // Lưu điểm đánh giá từ người dùng
      console.log("saoooo: ", this.userRating);
      // Có thể thực hiện các hành động khác liên quan đến việc lưu trữ hoặc gửi điểm đánh giá
    },
    ...mapActions(['getCart', 'getOtherInCart', 'getItemsInDrinkCart']),
    async retrieveInfo() {
      if (this.Auth) {
        try {
          this.info = await infoService.info();
          this.cart = await this.info.cart;

        } catch (error) {
          console.log(error);
        }
      }

    },

    async chooseService(service_id) {
      try {
        if (!this.Auth) {
          console.log("voo", this.localCart)
          this.localCart.service_id = service_id;

          localStorage.setItem('localCart', JSON.stringify(this.localCart));
          console.log(localStorage.getItem("localCart"));
          this.getService(service_id);

        } else {
          const rs = await Home.chooseService(service_id);

          if (rs) {
            console.log("đã chọn dịch vụ");
            this.getCart();
            this.getOtherInCart();
            this.getItemsInDrinkCart();
            this.retrieveInfo();
          }

        }

      } catch (error) {
        console.log(error);
      }
    },
    async unChooseService() {
      try {
        if (!this.Auth) {
          this.localCart.service_id = null;
          this.localCart.items[0].menu = [];
          this.localCart.items[1].drink = [];
          this.localCart.items[2].other = [];

          this.localCart.items[0].totalMenu = 0;
          this.localCart.items[1].totalDrink = 0;
          this.localCart.items[2].totalOther = 0;
          localStorage.setItem('localCart', JSON.stringify(this.localCart));
          await this.getService(this.service_id);

        } else {
          const rs = await Home.unChooseServiceReal();
          if (rs) {
            this.getCart();
            this.getOtherInCart();
            this.getItemsInDrinkCart();
            this.retrieveInfo();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async chooseWithOtherService(service_id) {
      try {
        if (window.confirm('Bạn muốn chọn dịch vụ này?\nCác lựa chọn của bạn trên dịch vụ khác sẽ bị xóa!!!')) {
          await this.unChooseService();
          await this.chooseService(service_id);
        }

      } catch (error) {

      }


    },
    async getService(service_id) {
      try {
        this.service = await Home.getService(service_id);

      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async getFoodOfService(service_id) {
      try {
        this.foodOfService = await Home.getAllFoodOfService(service_id);
      }
      catch (error) {
        console.log(error);

      }

    },
    async getDrinkOfService(service_id) {
      try {
        this.drinkOfService = await Home.getAllDrinkOfService(service_id);

      }
      catch (error) {
        console.log(error);

      }

    },
    async getOtherOfService(service_id) {
      try {
        this.otherOfService = await Home.getAllOtherOfService(service_id);

      }
      catch (error) {
        console.log(error);

      }

    },
    async getMenuOfService(service_id) {

      try {
        this.menuOfService = await Home.getAllMenuOfService(service_id);


      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    refreshInfo() {
      this.retrieveInfo();
    },
  },
  created() {
    this.getService(this.service_id);
    this.getCommentOfService();
    this.getMenuOfService(this.service_id);
    this.getFoodOfService(this.service_id);
    this.getDrinkOfService(this.service_id);
    this.getOtherOfService(this.service_id);

  },
  mounted() {

    this.refreshInfo();

  },
};
</script>
<style scoped>
@import "@/assets/form.css";

.rating {
  unicode-bidi: bidi-override;
  direction: rtl;
}

.rating>span {
  display: inline-block;
  position: relative;
  width: 1.1em;
}

.rating>span:hover:before,
.rating>span:hover~span:before {
  content: "\2605";
  position: absolute;
}

.selected-star {
  color: gold;
  /* hoặc màu vàng khác tùy ý bạn chọn */
}

.comment-section {
  margin-top: 10px;
}

.comment-section strong {
  font-weight: bold;
}
</style>

