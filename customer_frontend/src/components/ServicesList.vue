<script>
import InputSearch from './InputSearch.vue';
export default {
  components: {
    InputSearch

  },
  data() {
    return {

      searchText: ""

    };
  },
  props: {
    foods: { type: Array, default: [] },

    activeIndex: { type: Number, default: -1 },
  },
  computed: {

    serviceString() {
      return this.foods.map((food) => {
        const { service_name, email, phone, support_area, support_party_type } = food;
        return [service_name, email, phone, support_area, support_party_type].join("").toLowerCase();
      });

    },

    filteredService() {
      const searchTextLower = this.searchText.toLowerCase();
      if (!this.searchText) return this.foods;
      return this.foods.filter((_food, index) =>
        this.serviceString[index].includes(searchTextLower)
      );
    },


  },

  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },

  },
};
</script>
<template>
  <div id="header">
    <h1>Hỗ trợ đặt tiệc lưu động</h1>
    <p>Party Planner</p>
  </div>
  <div class="container row">
    <div class="col-1">
    </div>
    <div class="col-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="col-1">
    </div>
  </div>
  <div class="container">


    <div v-for="(food, index) in filteredService" :key="food._id" :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)">


      <div class="card">
        <router-link :to="{
          name: 'serviceDetail',
          params: { service_id: food._id },
        }">
          <div class="card-image">
            <img
              src="https://images.unsplash.com/photo-1604135307399-86c6ce0aba8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80">
          </div>
        </router-link>
        <div class="card-text">
          <h2 class="card-title">{{ food.service_name }}</h2>
          <p class="card-body">Khu vực hỗ trợ: {{ food.support_area }} <br>
            Loại tiệc phục vụ: {{ food.support_party_type }}
          </p>
        </div>
        <div class="card-price">
          <router-link :to="{
            name: 'serviceDetail',
            params: { service_id: food._id },
          }">
            <span class="mt-2 badge badge-warning">
              Xem</span>
          </router-link>
        </div>
      </div>






    </div>

  </div>

  <!-- 

  <div style="height: 700px; overflow-y: scroll">
    <ul class="list-group">
      <li class="list-group-item" v-for="(food, index) in foods" :key="food._id"
        :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
        <b> ***{{ food.service_name }} </b>
        <router-link :to="{
          name: 'serviceDetail',
          params: { service_id: food._id },
        }">
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Xem chi tiet</span>
        </router-link>
      </li>
    </ul>
  </div> -->
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Playfair Display', serif;
}

body {
  background: url(https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80);
  background-size: cover;
  background-position: right;
  background-attachment: fixed;
}

#header {
  margin: 20px;
}

#header>h1 {
  text-align: center;
  font-size: 3rem;
}

#header>p {
  text-align: center;
  font-size: 1.5rem;
  font-style: italic;
}

.container {
  width: 100vw;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 40px 20px;
}

.card {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-bottom: 60px;
}

.card>div {
  box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.5);
}

.card-image {
  width: 400px;
  height: 250px;
}

.card-image>img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
}

.card-text {
  margin: -30px auto;
  margin-bottom: -50px;
  height: 300px;
  width: 300px;
  background-color: #1D1C20;
  color: #fff;
  padding: 20px;
}

.card-meal-type {
  font-style: italic;
}

.card-title {
  font-size: 2.2rem;
  margin-bottom: 20px;
  margin-top: 5px;
}

.card-body {
  font-size: 1.25rem;
}

.card-price {
  width: 100px;
  height: 100px;
  background-color: #970C0A;
  color: #fff;
  margin-left: auto;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  
