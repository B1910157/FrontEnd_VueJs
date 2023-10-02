<template>
    <div class=" row shadow ">

        <div class="mt-3 col-md-12">

            <div>
                <OrderForm @submit:order="addOrder" />

            </div>


        </div>

    </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import FoodService from "@/services/food.service";
import Menu from '@/components/Menu.vue';
import OrderForm from '@/components/OrderForm.vue';
import orderService from "../services/order.service";
import { mapState, mapMutations, mapActions } from "vuex";
import { useToast } from 'vue-toast-notification';
export default {
    components: {
        Menu,
        OrderForm,
    },
    data() {
        return {
            // foods: [],
            // menu: [],
            // totalPrice: 0,
            // message: ""

        };
    },
    computed: {
        ...mapState(["Auth", "cartFood", "cartDrink", "cartOther", "localCart"]),

    },
    methods: {
        showSuccessToast() {
            const VueToast = useToast();
            VueToast.open({
                message: 'Đặt tiệc thành công!',
                type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
                position: 'top-right', // Vị trí hiển thị toast
                duration: 5000, // Thời gian hiển thị (milliseconds)
            });
        },

        ...mapActions(['getCart', 'getLocalCart', 'removeFoodInCart', 'removeOtherInCart', 'unChooseService', 'getDrinkInCart', 'getItemsInDrinkCart', 'getOtherInCart']),


        async addOrder(data) {
            try {
                const confirmed = confirm("Bạn chắc chắn muốn đặt tiệc?");
                if (!confirmed) {
                    return;
                }
                await orderService.addOrder(data);
                if (!this.Auth) {
                    const newLocalCart = {
                        service_id: null,
                        items: [
                            {
                                menu: [],
                                totalMenu: 0,
                            },
                            {
                                drink: [],
                                totalDrink: 0,
                            },
                            {
                                other: [],
                                totalOther: 0,
                            },
                        ],
                    };
                    localStorage.setItem("localCart", JSON.stringify(newLocalCart));
                    this.getLocalCart();
                    this.$router.push({ name: 'home' });
                } else if (this.Auth) {
                    this.getCart();
                    this.getItemsInDrinkCart();
                    this.getOtherInCart();
                    this.$router.push({ name: 'history' });
                }
                this.showSuccessToast();

            } catch (error) {
                console.log(error);
            }
        },

    },
    mounted() {
        // this.refreshList();
        // const menuData = localStorage.getItem('menu');
        // if (menuData) {
        //     this.menu = JSON.parse(menuData);
        // }
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>