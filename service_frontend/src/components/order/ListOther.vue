
<template>
    <div class="row justify-content-start container ">
        <div v-for="(food, index) in this.otherNotInMenu" :key="food._id" class="col-3 my-3">
            <v-card class="mx-auto" style="height: 100%;">
                <v-img :src="getImage(food)" cover height="100px"></v-img>
                <v-card-title>
                    {{ food.other_name }}
                </v-card-title>
                <v-card-subtitle>
                    {{ formatCurrency(food.price) }}
                </v-card-subtitle>
                <v-card-actions>
                    <span @click="addOtherToMenuReal(food._id)" class="mt-3 badge badge-primary">
                        <i class="fas fa-add"></i> </span>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>
<script>

import { VBtn, VDialog, VCard, VCardTitle, VImg, VCardSubtitle, VCardText, VCardActions } from "vuetify/lib/components/index.mjs";
import MenuService from "../../services/menu.service";


export default {
    components: {
        VCardText,
        VImg,
        VBtn,
        VCardActions,
        VCard,
        VCardTitle,
        VCardSubtitle,
        VDialog
    },
    emits: ["addOtherToMenu"],
    props: {
        otherNotInMenu: []
    },
    data() {

        return {

        };
    },
    methods: {

        getImage(food) {
            return `http://localhost:3000/${food.image}`;
        },

        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },
        addOtherToMenuReal(otherId) {
            this.$emit("addOtherToMenu", otherId);
        }
        ,



    },


};
</script>
<style scoped></style>