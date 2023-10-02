<template>
  <div class="row">
    <div class="col-md-8">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-8">
      <div class="row">
        <h4 class="col-10">
          Party Planner
          <i class="fa fa-book" aria-hidden="true"></i>
        </h4>
        <div class="col-2 mb-3">
          <button class="btn btn-sm btn-primary" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
          </button>
        </div>
      </div>

      <ServiceList
        v-if="filteredServiceCount > 0"
        :services="filteredService"
        v-model:activeIndex="activeIndex"
        
      />
      <p v-else>Không có DV nào.</p>
    
    </div>
    <div class="col-md-4 mt-3">
      <div v-if="activeService" class="text-center">
        <h4>
          Chi tiết dich vu
          <i class="fa fa-cutlery" aria-hidden="true"></i>
        </h4>

        <ServiceCard :service="activeService" />

        <hr />
      </div>
    </div>
    
    
  </div>
</template>
<script>
import FoodCard from "@/components/FoodCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import FoodList from "@/components/FoodList.vue";
import FoodService from "@/services/food.service";
import HomeService from "@/services/home.service";
import ServiceList from "@/components/ServiceList.vue";
import ServiceCard from "@/components/ServiceCard.vue";
// import Menu from '@/components/Menu.vue';
export default {
  components: {
    FoodCard,
    InputSearch,
    FoodList,
    ServiceList,
    ServiceCard,
    // Menu,
  },
  data() {
    return {
      foods: [],
      services: [],
      // menu: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng Food thành chuỗi để tiện cho tìm kiếm.
    // foodString() {
    //   return this.foods.map((food) => {
    //     const { food_name, food_category, price } = food;
    //     return [food_name, food_category, price].join("");
    //   });
    // },
    // Trả về các Food có chứa thông tin cần tìm kiếm.
    // filteredFood() {
    //   if (!this.searchText) return this.foods;
    //   return this.foods.filter((_food, index) =>
    //     this.foodString[index].includes(this.searchText)
    //   );
    // },
    filteredService() {
      return this.services;
    },

    // activeFood() {
    //   if (this.activeIndex < 0) return null;
    //   return this.filteredFood[this.activeIndex];
    // },
    activeService() {
      if (this.activeIndex < 0) return null;
      return this.filteredService[this.activeIndex];
    },
  
    // filteredFoodCount() {
    //   return this.filteredFood.length;
    // },

    filteredServiceCount() {
      return this.filteredService.length;
    },
  },
  methods: {
    // async retrieveFoods() {
    //   try {
    //     this.foods = await FoodService.getAll();
    //     console.log(this.foods);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async retrieveServices() {
      try {
        this.services = await HomeService.getAllService();
      } catch (error) {
        console.log(error);
      }
    },
    // refreshList() {
    //   this.retrieveFoods();
    //   this.activeIndex = -1;
    // },
    refreshListService() {
      this.retrieveServices();
    
    },
  },
  mounted() {
    // this.refreshList();
    this.refreshListService();
  },
};
</script>
