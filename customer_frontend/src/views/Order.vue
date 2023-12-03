<template>
    <!-- <h2 class="text-center my-3 text-warning">
        ĐƠN ĐẶT TIỆC
    </h2> -->
    <div class="row shadow bg">

        <div class="mt-3 col-md-12">
            <h2 class="text-center  text-warning">
                ĐƠN ĐẶT TIỆC
            </h2>
            <!-- hihi {{ this.dataOrder }} -->
            <div>
                <OrderForm @submit:order="addOrder" />
            </div>
        </div>
        <!-- <div :style="{ display: 'block' }">
            <paymentSuccess @paymentSuccess="paymentSuccess_Ne" />
        </div> -->


    </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import FoodService from "@/services/food.service";
import Menu from '@/components/Menu.vue';
import OrderForm from '@/components/OrderForm.vue';
import paymentSuccess from "./paymentSuccess.vue";
import orderService from "../services/order.service";
import { mapState, mapMutations, mapActions } from "vuex";
import { useToast } from 'vue-toast-notification';
import { toast } from 'vue3-toastify';
import payment from "../services/payment.service";
export default {
    components: {
        Menu,
        OrderForm,
        paymentSuccess
    },
    data() {
        return {
            // foods: [],
            // menu: [],
            // totalPrice: 0,
            // message: ""
            // setPaymentStatus: "new",
            dataOrder: [],
            return_payment: false,
            show: true

        };
    },
    computed: {
        ...mapState(["Auth", "cartFood", "cartDrink", "cartOther", "localCart"]),

    },
    methods: {
        showSuccessToast() {
            toast.success('Đặt tiệc thành công', { autoClose: 3000 });
        },

        // showSuccessToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Đặt tiệc thành công!',
        //         type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 5000, // Thời gian hiển thị (milliseconds)
        //     });
        // },

        showFailedToast() {
            toast.success('Đặt tiệc không thành công', { autoClose: 1000 });
        },
        // showFailedToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Đặt tiệc không thành công!',
        //         type: 'error', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 5000, // Thời gian hiển thị (milliseconds)
        //     });
        // },

        ...mapActions(['getCart', 'getLocalCart', 'removeFoodInCart', 'removeOtherInCart', 'unChooseService', 'getDrinkInCart', 'getItemsInDrinkCart', 'getOtherInCart']),


        async addOrder(data) {
            try {

                const confirmed = confirm("Xác nhận đặt tiệc?");
                if (!confirmed) {
                    return;
                }
                // this.setPaymentStatus = "pending";
                // if (data.payment == 'vnpay') {
                //     const total = parseInt(data.cart.items[0].totalMenu) * parseInt(data.tray_quantity) + parseInt(data.cart.items[1].totalDrink + parseInt(data.cart.items[2].totalOther));
                //     const deposit = parseInt(total * 0.2);
                //     data.amount = deposit;
                //     data.deposit = deposit;
                //     this.dataOrder = data;

                //     const link = await payment.createPaymentVNPay(data);
                //     console.log("alo", link, data)
                //     const linkReal = link.vnpUrl;
                //     if (linkReal) {
                //         try {
                //             window.location.href = linkReal;
                //             // await orderService.addOrder(data);
                //             // this.showSuccessToast();

                //         } catch (error) {
                //             console.log(error)
                //         }

                //     }
                // } else {
                //     await orderService.addOrder(data);
                //     this.showSuccessToast();
                //     this.$router.push({ name: 'history' });
                // }

                const total = (data.cart.items[0].totalMenu) * (data.tray_quantity) +
                    (data.cart.items[1].totalDrink + (data.cart.items[2].totalOther));

                const deposit = (total * data.percentPayment);
                data.total = total;
                data.deposit = parseInt(deposit);
                const rs = await orderService.addOrder(data);
                // const idOrder = rs.insertedId;
                // console.log("ket qua: ", rs.insertedId);

                // this.$router.push({ name: 'history' });

                // return;
                // await orderService.addOrder(data);
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
                    this.showSuccessToast();
                    setTimeout(() => {
                        this.$router.push({ name: 'home' });
                    }, 1000);
                    // this.$router.push({ name: 'home' });
                } else if (this.Auth) {
                    this.getCart();
                    this.getItemsInDrinkCart();
                    this.getOtherInCart();
                    this.showSuccessToast();
                    setTimeout(() => {
                        this.$router.push({ name: 'home' });
                    }, 1000);
                    // 
                    // this.$router.push({ name: 'history' });
                }
                // this.$router.push({ name: 'payment' });
                // this.$router.push({ name: 'payment', this.$router.push({ name: 'history' });
                // this.showSuccessToast();

                // this.$router.push({ name: 'payment', params: { orderId: yourOrderIdValue } });
            } catch (error) {
                console.log(error);
                this.showFailedToast();
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
/* .page {
    text-align: left;
    max-width: 750px;
} */

.bg {
    background: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVgbpyqddpsPNP0k31Fv8Sqwi46gV-b-S7Eg&usqp=CAU);
    background-repeat: repeat;
    background-size: 100% 100%;

}
</style>
