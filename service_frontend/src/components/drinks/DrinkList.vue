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
        VCardText

    },
    emits: ["edit:drink", "delete:drink", "openForm"],
    computed: {
        paginatedDrinks() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.drinks.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.drinks.length / this.pageSize);
        },
    },
    data() {
        return {
            currentPage: 1, // Trang hiện tại
            pageSize: 12, // Kích thước trang
        };
    },
    props: {
        drinks: { type: Array, default: [] },

    },

    methods: {
        setPage(page) {
            this.currentPage = page;
        },
        getImage(drink) {
            return `http://localhost:3000/${drink.image}`;
        },
        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },
        deleteDrink(drinkId) {
            this.$emit("delete:drink", drinkId);
        },
        editDrink(drinkId) {

            this.$emit("edit:drink", drinkId);
        },
        openForm() {
            this.$emit("openForm");
        },
    }
};

</script>
<template>
    <div class="row justify-content-start px-3">
        <div class="col-3 my-3">
            <v-card class="mx-auto" style="height: 100%;">
                <v-card-title class="text-center text-primary">
                    THÊM
                </v-card-title>
                <v-card-text class="pt-5 text-center ">
                    <div class="border p-4 m-2 rounded-lg" style="background-color: #f0f0f0;">
                        <i class="fas fa-plus btn btn-success" @click="openForm" style="font-size: 24px;"></i>
                    </div>
                </v-card-text>

            </v-card>
        </div>
        <div v-for="(drink, index) in paginatedDrinks" :key="drink._id" class="col-3 my-3">
            <v-card class="mx-auto" style="height: 100%;">
                <v-img :src="getImage(drink)" cover height="100px"></v-img>
                <v-card-title>
                    {{ drink.drink_name }}
                </v-card-title>
                <v-card-subtitle>
                    {{ formatCurrency(drink.price) }}/{{ drink.unit }}
                </v-card-subtitle>
                <v-card-actions>
                    <!-- <router-link :to="{
                        name: 'editDrink',
                        params: { id: drink._id },
                    }">
                        <span class="mt-2 badge badge-warning">
                            <i class="fas fa-edit"></i> </span>
                    </router-link> -->
                    <span @click="editDrink(drink._id)" class=" mt-2 ml-2 btn btn-warning btn-sm">
                        <i class="fas fa-edit"></i> </span>

                    <span @click="deleteDrink(drink._id)" class="mt-2 ml-2 btn btn-danger btn-sm">
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
