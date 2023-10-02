<template>
    <div class="row p-4">
        <h4 class="col-5">
            Danh sách món ăn
            <i class="fa fa-book icon" aria-hidden="true"></i>
        </h4>
        <div class="col-7">
            <button class="btn btn-sm btn-primary" @click="goToAddFood">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-md-11 ml-3">
            <InputSearch v-model="searchText" />
        </div>


        <div class="col-md-12">
            <FoodList v-if="filteredFoodCount > 0" :foods="filteredFood" v-model:activeIndex="activeIndex" />
            <p v-else>Không có món ăn nào.</p>
        </div>
    </div>
</template>
<script>
import FoodCard from "@/components/foods/FoodCard.vue";
import FoodList from "@/components/foods/FoodList.vue";
import FoodService from "@/services/food.service";
import InputSearch from "../../components/InputSearch.vue";

export default {
    components: {
        FoodCard,
        InputSearch,
        FoodList,

    },
    data() {
        return {
            foods: [],
            activeIndex: -1,
            searchText: "",



        };
    },

    computed: {

        foodString() {
            return this.foods.map((food) => {

                const { food_name, price } = food;
                return [food_name, price].join("").toLowerCase();
            });
        },

        filteredFood() {
            const searchTextLower = this.searchText.toLowerCase();
            if (!this.searchText) return this.foods;
            return this.foods.filter((_food, index) =>
                this.foodString[index].includes(searchTextLower)
            );
        },
        filteredFoodCount() {
            return this.filteredFood.length;
        },

    },
    methods: {
        async retrieveFoods() {
            try {
                this.foods = await FoodService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveFoods();

        },
        goToAddFood() {
            this.$router.push({ name: "addFood" });
        },

    },
    mounted() {
        this.refreshList();

    },

};
</script>
<style scoped></style>