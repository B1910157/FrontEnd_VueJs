<template>
    <div class="input-group input-group-sm mb-3 me-3" style="width: 150px;">
        <input type="number" class="form-control" v-model="quantity" min="1">
        <v-btn color="orange-lighten-2" @click="this.Auth ? addDrinkToCart(service._id, drink._id, quantity)
            : addDrinkToLocalCartReal(service._id, drink, quantity)" variant="tonal">
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
        service: { type: Object, required: true },
    },
    data() {
        return {
            quantity: 0,

        };
    },
    emits: ['drinkAdded'],
    methods: {

        async addDrinkToCart(service_id, drinkId, quantity) {
            if (confirm("Bạn muốn thêm " + quantity + "  vào menu? ")) {
                console.log("Helloo", service_id, drinkId, quantity)
                await this.addDrinkToCartReal({ service_id, drinkId, quantity });
                this.$emit('drinkAdded', quantity);
                this.quantity = 0;
            }

        },
        async addDrinkToLocalCartReal(service_id, drinkObject, quantity) {

            await this.addDrinkToLocalCart({ service_id, drinkObject, quantity });
        },

        ...mapActions(['addDrinkToCartReal', 'addDrinkToLocalCart']),



    },
    computed: {
        ...mapState(['Auth']),

    },
    mounted() {

    }
};



</script>