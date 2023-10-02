<template>

  <ServiceDetail :service="filteredService" :menuOfService="filteredMenuOfService" :foodOfService="this.foodOfService"
    :cart="this.cart" :chooseService="chooseService" :unChooseService="unChooseService"
    :drinkOfService="this.drinkOfService" :otherOfService="this.otherOfService" />

  <div v-if="this.Auth">
    Hello

  </div>
  <div v-else>
    Hi

  </div>
</template>
<script>

import FoodCard from "@/components/FoodCard.vue";
import ServiceDetail from "@/components/ServiceDetail.vue";
import infoService from "../services/info.service";
import MenuService from "../services/menu.service";
import Home from "@/services/home.service";
import { object } from "yup";
import { mapActions, mapState } from 'vuex';


export default {
  components: {
    FoodCard,
    ServiceDetail,
  
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
          console.log("voo", this.localCart)
          this.localCart.service_id = null;
          this.localCart.items[0] = [];
          this.localCart.items[1] = [];
          this.localCart.items[2] = [];
          this.localCart.items[0].totalMenu = 0;
          this.localCart.items[1].totalDrink = 0;
          this.localCart.items[2].totalOther = 0;


          localStorage.setItem('localCart', JSON.stringify(this.localCart));
          this.getService(this.service_id);

        } else {
          const rs = await Home.unChooseServiceReal();
          if (rs) {
            console.log("đã bỏ chọn dịch vụ");
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

