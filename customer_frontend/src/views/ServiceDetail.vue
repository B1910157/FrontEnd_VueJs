<template>
  <ServiceDetail :service="filteredService" :menuOfService="filteredMenuOfService" :foodOfService="this.foodOfService"
    :cart="this.cart" :chooseService="chooseService" :unChooseService="unChooseService"
    :chooseWithOtherService="chooseWithOtherService" :drinkOfService="this.drinkOfService"
    :otherOfService="this.otherOfService" :star="this.avgStar" />


  <div class="container">
    <hr>
    <div class="text-center">
      <h5 class="font-weight-bold">Đánh giá </h5>
      <div class="ratings">
        <!-- Hình 5 sao - sử dụng Vue để xử lý sự kiện đánh giá -->
        <div class="rating">
          <button @click="addEvaluate()" class="badge badge-primary ml-3">
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
        <button class="badge badge-primary text-white" type="submit">Bình luận</button>
      </form>
      <hr>

      <div class="comment-section" id="comments">

        <div class="comment" v-for="(comment, index) in latestComments" :key="index">
          <strong>{{ comment.fullname }}: </strong> {{ comment.comment }}
          <p><i> {{ formatDate(comment.createAt) }}</i></p>
          <hr>
        </div>

        <button v-if="showViewMoreButton" @click="viewAllComments">Xem tất cả <i
            class="fa-solid fa-angles-down"></i></button>
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
import { toast } from 'vue3-toastify';

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
      info: {},
      service: {},
      menuOfService: [],
      foodOfService: [],
      drinkOfService: [],
      otherOfService: [],
      cart: [],
      // comments: [
      //   { user: 'Nguyễn Văn A', comment: 'Hello' },
      //   { user: 'Nguyễn Thị B', comment: 'Cửa hàng rất tuyệt vời!' },

      // ],
      userRating: 0,
      newComment: "",
      comments: [],
      evaluates: [],
      avgStar: 0,
      maxVisibleComments: 2,
      // checkEvaluate: false,
    };
  },

  watch: {
    '$route.params.service_id': {
      immediate: true,
      async handler() {
        let service_id_real = '';
        if (this.$route.params.service_id) {
          service_id_real = this.$route.params.service_id;
          await this.getService(service_id_real);
          await this.getMenuOfService(service_id_real);
          await this.getFoodOfService(service_id_real);
          await this.getDrinkOfService(service_id_real);
          await this.getOtherOfService(service_id_real);
        }
      }
    },

  },
  computed: {
    latestComments() {
      return this.comments.slice(0, this.maxVisibleComments);
    },
    showViewMoreButton() {
      return this.comments.length > this.maxVisibleComments;
    },
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
    evaluateSuccessToast() {
      toast.success('Đã đánh giá', { autoClose: 1000 });
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
    getAvgStarOfService() {
      if (this.evaluates && this.evaluates.length > 0) {
        let totalStar = 0;
        for (const e of this.evaluates) {
          totalStar = e.evaluate + totalStar;
        }
        if (totalStar != 0) {
          this.avgStar = Math.ceil(totalStar / (this.evaluates.length));
        } else {
          this.avgStar = 0;
        }


      }

    },
    async addComment() {
      if (this.newComment && this.Auth) {

        const data = {
          user_id: this.info._id,
          service_id: this.service_id,
          comment: this.newComment

        };
        const rs = await CommentAndEvaluate.createComment(data);
        this.newComment = "";
        this.getService(this.service_id);
      } else if (!this.Auth) {
        alert("Vui lòng đăng nhập!!");
      }
    },
    viewAllComments() {

      this.maxVisibleComments = this.comments.length;
    },

    async getCommentOfService() {
      this.comments = await CommentAndEvaluate.getAllCommentOfService(this.service_id);
      // console.log("COMT", this.comments)
    },



    //EVALUATE
    async addEvaluate() {

      if (this.userRating && this.Auth) {

        const data = {
          user_id: this.info._id,
          service_id: this.service_id,
          evaluate: this.userRating

        };
        const rs = await CommentAndEvaluate.createEvaluate(data);

        this.evaluateSuccessToast();
        this.getService(this.service_id);
      } else if (!this.Auth) {
        alert("Vui lòng đăng nhập!!");
      }
    },

    async getEvaluateOfService() {
      this.evaluates = await CommentAndEvaluate.getAllEvaluateOfService(this.service_id);
      this.getEvaluateOfUser();
      this.getAvgStarOfService();
      // console.log("COMT", this.comments)
    },
    handleUserRating(rating) {
      this.userRating = rating;
      // console.log("saoooo: ", this.userRating);



    },
    getEvaluateOfUser() {
      // let check = false;
      for (const user of this.evaluates) {
        if (user.user_id == this.info._id) {
          // this.checkEvaluate = true;
          this.userRating = user.evaluate;
        } else {
          this.userRating = 0;

        }
      }
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

          this.localCart.service_id = service_id;

          localStorage.setItem('localCart', JSON.stringify(this.localCart));

          this.getService(service_id);

        } else {
          const rs = await Home.chooseService(service_id);

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
        this.getCommentOfService();
        // this.getEvaluateOfService();
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
  async created() {
    if (this.Auth) {
      this.refreshInfo();
    }
    await this.getService(this.service_id);
    this.getEvaluateOfService();
    this.getMenuOfService(this.service_id);
    this.getFoodOfService(this.service_id);
    this.getDrinkOfService(this.service_id);
    this.getOtherOfService(this.service_id);




  },
  // async mounted() {
  //   await this.getService(this.service_id);
  //   this.getMenuOfService(this.service_id);
  //   this.getFoodOfService(this.service_id);
  //   this.getDrinkOfService(this.service_id);
  //   this.getOtherOfService(this.service_id);
  //   if (this.Auth) {
  //     this.refreshInfo();
  //   }


  // },
  // created() {



  // },
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

}

.comment-section {
  margin-top: 10px;
}

.comment-section strong {
  font-weight: bold;
}
</style>

