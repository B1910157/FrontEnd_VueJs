
<template>
    <div class="row justify-content-start container ">
        <div v-for="(drink, index) in this.drinkNotInMenu" :key="drink._id" class="col-3 my-3">
            <v-card class="mx-auto" style="height: 100%;">
                <v-img :src="getImage(drink)" cover height="100px"></v-img>
                <v-card-title>
                    {{ drink.drink_name }}
                </v-card-title>
                <v-card-subtitle>
                    {{ formatCurrency(drink.price) }}
                </v-card-subtitle>
                <v-card-actions>
                    <!-- <span @click="addDrinkToMenuReal(drink._id)" class="mt-3 badge badge-primary">
                        <i class="fas fa-add"></i> </span> -->
                    <AddDrinkToCart :drink="drink" @drinkAdded="addDrinkToMenuReal" />
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>
<script>

import { VBtn, VDialog, VCard, VCardTitle, VImg, VCardSubtitle, VCardText, VCardActions } from "vuetify/lib/components/index.mjs";
import MenuService from "../../services/menu.service";
import AddDrinkToCart from "./AddDrinkToCart.vue";

export default {
    components: {
        VCardText,
        VImg,
        VBtn,
        VCardActions,
        VCard,
        VCardTitle,
        VCardSubtitle,
        VDialog,
        AddDrinkToCart
    },
    emits: ["addDrinkToMenu"],
    props: {
        drinkNotInMenu: []
    },
    data() {

        return {

        };
    },
    methods: {

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
        addDrinkToMenuReal(drinkId, quantity) {
            this.$emit("addDrinkToMenu", drinkId, quantity);
        }
        ,




    },


};
</script>
<style scoped></style>