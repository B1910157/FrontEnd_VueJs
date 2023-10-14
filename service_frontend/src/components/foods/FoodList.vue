<script>
import { VBtn, VCard, VImg, VCardTitle, VCardSubtitle, VCardActions, VCardText } from "vuetify/lib/components/index.mjs";
export default {
    components: {
        VBtn,
        VCard,
        VImg,
        VCardSubtitle,
        VCardTitle,
        VCardActions,
        VCardText,


    },
    data() {
        return {
            currentPage: 1, // Trang hiện tại
            pageSize: 12, // Kích thước trang
        };
    },
    computed: {
        paginatedFoods() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.foods.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.foods.length / this.pageSize);
        },
    },
    props: {
        foods: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        getImage(food) {
            return `http://localhost:3000/${food.image}`;
        },
        deleteFood(foodId) {
            this.$emit("delete:food", foodId);
        },
        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },
        setPage(page) {
            this.currentPage = page;
        },
    }
};

</script>
<template>
    <div class="row justify-content-start px-3">
        <div v-for="(food, index) in paginatedFoods" :key="food._id" :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)" class="col-3 my-3">
            <v-card class="mx-auto" style="height: 100%;">
                <v-img :src="getImage(food)" cover height="100px"></v-img>
                <v-card-title>
                    {{ food.food_name }}
                </v-card-title>
                <v-card-subtitle>
                    {{ formatCurrency(food.price) }}
                </v-card-subtitle>
                <v-card-actions>
                    <router-link :to="{
                        name: 'editFood',
                        params: { id: food._id },
                    }">
                        <span class="mt-2 badge badge-warning">
                            <i class="fas fa-edit"></i> </span>
                    </router-link>

                    <span @click="deleteFood(food._id)" class=" mt-2 ml-2 badge badge-danger">
                        <i class="fas fa-trash"></i> </span>
                </v-card-actions>
            </v-card>
        </div>

    </div>

    <div class="text-center mt-3 ml-3">
        <ul class="pagination">
            <li class="page-item" v-for="page in totalPages" :key="page">
                <a class="page-link" @click="setPage(page)" :class="{ 'current-page': currentPage === page }">{{ page }}</a>
            </li>
        </ul>
    </div>
</template>
<style>
.current-page {
    background-color: #007bff;
    /* Đặt màu nền cho trang hiện tại, ở đây là màu xanh dương */
    color: #fff;
    /* Đặt màu chữ cho trang hiện tại, ở đây là màu trắng */
}


</style>
