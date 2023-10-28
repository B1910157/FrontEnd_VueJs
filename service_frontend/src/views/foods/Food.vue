<template>
    <div class="row ml-3 mb-3">
        <h4 class="col-5 title-in-page">
            Danh sách món ăn
            <i class="fa fa-book icon" aria-hidden="true"></i>
        </h4>
        <div class="col-7 row text-right">
            <div class="col-12">

                <!-- <button class="btn btn-sm btn-primary" @click="this.isAddFood = true">
                    <i class="fas fa-plus"></i> Thêm mới
                </button> -->
            </div>

        </div>
    </div>
    <div class="row container">
        <div class="col-md-12 ml-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="col-md-12">
            <FoodList @openForm="this.isAddFood = true" @edit:food="editFood" @delete:food="deleteFood"
                :foods="filteredFood" v-model:activeIndex="activeIndex" />
            <p v-if="filteredFoodCount == 0">Không có món ăn nào.</p>
        </div>
    </div>

    <v-dialog v-model="this.isAddFood" max-width="800px">

        <v-btn color="danger" @click="this.isAddFood = false" icon="fa fa-close" class="ml-auto mb-2"><i
                class="fa fa-close"></i></v-btn>
        <div class="p-3 bg-white rounded-lg">
            <FoodForm :food="{}" @submit:food="addFood" />
        </div>

    </v-dialog>
    <v-dialog v-model="this.isEditFood" max-width="800px">
        <v-btn color="danger" @click="this.isEditFood = false" icon="fa fa-close" class="ml-auto mb-3"><i
                class="fa fa-close"></i></v-btn>
        <div class="p-3 bg-white rounded-lg">
            <FoodForm :food="this.food" @submit:food="updateFood" />
        </div>

    </v-dialog>
</template>
<script>
import { VBtn, VDialog } from "vuetify/lib/components/index.mjs";

import { toast } from 'vue3-toastify';
import FoodCard from "@/components/foods/FoodCard.vue";
import FoodList from "@/components/foods/FoodList.vue";
import FoodForm from "@/components/foods/FoodForm.vue";
import FoodService from "@/services/food.service";
import InputSearch from "../../components/InputSearch.vue";
import { useToast } from 'vue-toast-notification';

export default {
    components: {
        FoodCard,
        InputSearch,
        FoodList,
        FoodForm,
        VDialog,
        VBtn

    },
    data() {
        return {
            foods: [],
            activeIndex: -1,
            searchText: "",
            isAddFood: false,
            isEditFood: false,
            food: {},



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
        addSuccessToast() {
            toast.success('Thêm thành công', { autoClose: 1000 });
        },
        updateSuccessToast() {
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        },
        async editFood(foodId) {
            this.getFood(foodId);
            this.isEditFood = true;

        },
        async updateFood(data) {
            try {
                await FoodService.update(this.food._id, data);
                this.updateSuccessToast();
                this.refreshList();
                this.isEditFood = false;
            } catch (error) {
                console.log(error);
            }
        },
        async addFood(data) {
            try {

                await FoodService.create(data);
                // this.message = "Món ăn được thêm thành công.";
                this.addSuccessToast();
                this.refreshList();
                this.isAddFood = false;

            } catch (error) {
                console.log(error);
            }
        },
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
        async getFood(id) {
            try {
                this.food = await FoodService.get(id);

            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
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
            toast.success('Xóa thành công', { autoClose: 1000 });
        },
        // deleteSuccessToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Xóa thành công!',
        //         type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 5000, // Thời gian hiển thị (milliseconds)
        //     });
        // },

    },
    mounted() {
        this.refreshList();

    },

};
</script>
<style scoped></style>