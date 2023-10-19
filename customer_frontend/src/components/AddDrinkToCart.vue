<template>
    <div class="input-group input-group-sm mb-3 me-3" style="width: 150px;">
        <input type="number" class="form-control" v-model="quantity" min="1" style="height: 30px; margin-right: 2px;">
        <v-btn color="blue" @click="this.Auth ? addDrinkToCart(service._id, drink._id, quantity)
            : addDrinkToLocalCartReal(service._id, drink, quantity)" variant="tonal" style="height: 30px;">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </v-btn>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { VBtn } from "vuetify/lib/components/index.mjs";
import { useToast } from 'vue-toast-notification';
import { toast } from 'vue3-toastify';
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
            quantity: 1,

        };
    },
    emits: ['drinkAdded'],
    methods: {
        checkQuantity() {
            toast.error('Số lượng không hợp lệ', { autoClose: 1000 });
        },

        // checkQuantity() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Số lượng không hợp lệ',
        //         type: 'error', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 3000, // Thời gian hiển thị (milliseconds)
        //     });
        // },
        addSuccessToast() {
            toast.success('Thêm thành công', { autoClose: 1000 });
        },
        // addSuccessToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Thêm thành công',
        //         type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 3000, // Thời gian hiển thị (milliseconds)
        //     });
        // },

        async addDrinkToCart(service_id, drinkId, quantity) {
            if (quantity < 1) {
                this.checkQuantity()
            } else {
                await this.addDrinkToCartReal({ service_id, drinkId, quantity });
                this.$emit('drinkAdded', quantity);
                this.quantity = 1;
            }



        },
        async addDrinkToLocalCartReal(service_id, drinkObject, quantity) {
            if (quantity < 1) {
                this.checkQuantity()
            }
            else {
                await this.addDrinkToLocalCart({ service_id, drinkObject, quantity });
                this.addSuccessToast();
            }

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