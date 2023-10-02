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
        other: { type: Array, default: [] },

    },

    methods: {
        getImage(other) {
            return `http://localhost:3000/${other.image}`;
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
        <div v-for="(other1, index) in other" :key="other1._id" class="col-3 my-3">
            <v-card class="mx-auto" style="height: 100%;">
                <v-img :src="getImage(other1)" cover height="100px"></v-img>
                <v-card-title>
                    {{ other1.other_name }}
                </v-card-title>
                <v-card-subtitle>
                    {{ formatCurrency(other1.price) }} <br>
                    {{ other1.description }}
                </v-card-subtitle>
                <v-card-actions>
                    <router-link :to="{
                        name: 'editOther',
                        params: { id: other1._id },
                    }">
                        <span class="mt-2 badge badge-warning">
                            <i class="fas fa-edit"></i> </span>
                    </router-link>
                </v-card-actions>
            </v-card>
        </div>

    </div>
</template>
