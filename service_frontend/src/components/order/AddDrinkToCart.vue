<template>
    <div class="input-group input-group-sm mb-3 me-3" style="width: 150px;">
        <input type="number" class="form-control" v-model="quantity" min="1">
        <v-btn color="orange-lighten-2" @click="addDrinkToCart(drink._id, quantity)" variant=" tonal">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </v-btn>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { VBtn } from "vuetify/lib/components/index.mjs";
export default {
    components: {
        VBtn

    },
    props: {
        drink: {
            type: Object,
            required: true
        },

    },
    data() {
        return {
            quantity: 1,

        };
    },
    emits: ['drinkAdded'],
    methods: {

        async addDrinkToCart(drinkId, quantity) {
            if (confirm("Bạn muốn thêm " + quantity + "  vào menu? ")) {

                this.$emit('drinkAdded', drinkId, quantity);
                this.quantity = 0;
            }

        },


    },

};



</script>