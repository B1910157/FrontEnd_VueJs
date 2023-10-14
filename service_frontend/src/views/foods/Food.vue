<template>
    <div class="row ml-3 mb-3">
        <h4 class="col-5 title-in-page">
            Danh sách món ăn
            <i class="fa fa-book icon" aria-hidden="true"></i>
        </h4>
        <div class="col-7 row text-right">
            <div class="col-12">
                <button class="btn btn-sm btn-primary" @click="goToAddFood">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>

        </div>
    </div>
    <div class="row container">
        <div class="col-md-12 ml-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="col-md-12">
            <FoodList v-if="filteredFoodCount > 0" @delete:food="deleteFood" :foods="filteredFood"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có món ăn nào.</p>
        </div>
    </div>
</template>
<script>
import FoodCard from "@/components/foods/FoodCard.vue";
import FoodList from "@/components/foods/FoodList.vue";
import FoodService from "@/services/food.service";
import InputSearch from "../../components/InputSearch.vue";
import { useToast } from 'vue-toast-notification';

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
        async deleteFood(foodId) {
            if (confirm("Bạn muốn xóa món ăn này?")) {
                try {
                    await FoodService.delete(foodId);
                    this.deleteSuccessToast();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        deleteSuccessToast() {
            const VueToast = useToast();
            VueToast.open({
                message: 'Xóa thành công!',
                type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
                position: 'top-right', // Vị trí hiển thị toast
                duration: 5000, // Thời gian hiển thị (milliseconds)
            });
        },

    },
    mounted() {
        this.refreshList();

    },

};
</script>
<style scoped></style>