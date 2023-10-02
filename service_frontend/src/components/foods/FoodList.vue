<script>
import { VBtn,  VCard, VImg, VCardTitle, VCardSubtitle, VCardActions, VCardText } from "vuetify/lib/components/index.mjs";
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
        <div v-for="(food, index) in foods" :key="food._id" :class="{ active: index === activeIndex }"
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
                </v-card-actions>
            </v-card>
        </div>

    </div>
</template>
