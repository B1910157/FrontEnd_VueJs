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
    props: {
        drinks: { type: Array, default: [] },

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
    }
};

</script>
<template>
    <div class="row justify-content-start container">
        <div v-for="(drink, index) in drinks" :key="drink._id" class="col-3 my-3">
            <v-card class="mx-auto" style="height: 100%;">
                <v-img :src="getImage(drink)" cover height="100px"></v-img>
                <v-card-title>
                    {{ drink.drink_name }}
                </v-card-title>
                <v-card-subtitle>
                    {{ formatCurrency(drink.price) }}/{{ drink.unit }}
                </v-card-subtitle>
                <v-card-actions>
                    <router-link :to="{
                        name: 'editDrink',
                        params: { id: drink._id },
                    }">
                        <span class="mt-2 badge badge-warning">
                            <i class="fas fa-edit"></i> </span>
                    </router-link>
                </v-card-actions>
            </v-card>
        </div>

    </div>
</template>
