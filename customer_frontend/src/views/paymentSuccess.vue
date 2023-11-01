<template>
    <div v-if="this.paymentSuccess == true" class="payment-success">
        <i class="fas fa-check-circle success-icon"></i>
        <h1>Thanh toán thành công!</h1>
        <p>Cảm ơn bạn đã sử dụng dịch vụ.</p>
        <!-- <p>DATA : {{ this.dataOrder }}</p> -->
        <!-- Params {{ this.$route.query }} -->
        <router-link to="/">Trở về trang chủ</router-link>
    </div>
    <div v-else class="payment-success error">
        <i class="fas fa-exclamation-circle error-icon"></i>
        <h1>Thanh toán không thành công!</h1>
        <p>Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ.</p>
        <router-link to="/">Trở về trang chủ</router-link>
    </div>
</template>
  
<script>
import orderService from "../services/order.service";
import { useToast } from 'vue-toast-notification';
export default {
    name: 'PaymentSuccess',
    props: {
        // dataOrder: { required: true },
    },
    data() {
        return {
            paymentSuccess: false
        };
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
        showFailedToast() {
            const VueToast = useToast();
            VueToast.open({
                message: 'Đặt tiệc không thành công!',
                type: 'error', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
                position: 'top-right', // Vị trí hiển thị toast
                duration: 5000, // Thời gian hiển thị (milliseconds)
            });
        },
        async createOrder() {
            try {
                console.log("Tới đây nè stripe");


                if (this.$route.query.vnp_TransactionStatus && this.$route.query.vnp_ResponseCode && this.$route.query.vnp_TransactionStatus === '00' && this.$route.query.vnp_ResponseCode === '00') {

                    // const statusTransaction = this.$route.query.vnp_TransactionStatus;
                    // const statusResponse = this.$route.query.vnp_ResponseCode;
                    const orderIdEncode = this.$route.query.vnp_TxnRef;
                    const amount = this.$route.query.vnp_Amount;
                    const orderId = orderIdEncode.split('_')[0];
                    const data = {
                        orderId: orderId,
                        paymentMethod: 'vnpay',
                        amount: amount

                    };
                    await orderService.choosePayment(data) //data:  { orderID, paymentMethod}
                    this.paymentSuccess = true;

                    // this.$router.push({ name: 'order' });
                    // this.showFailedToast();

                } else if (this.$route.query.statusPayment && this.$route.query.statusPayment == 'success') {
                    const orderId = this.$route.query.orderId;
                    const amount = this.$route.query.amount;
                    const data = {
                        orderId: orderId,
                        paymentMethod: 'stripe',
                        amount: amount

                    };
                    await orderService.choosePayment(data) //data:  { orderID, paymentMethod}
                    this.paymentSuccess = true;
                    // console.log("aloo", this.$route.query.statusPayment, this.$route.query.orderId)
                }
                else if (this.$route.query.statusPayment && this.$route.query.statusPayment == 'error') {

                }
            } catch (error) {
                console.error(error);
                this.showFailedToast();
            }
        },


    },
    created() {
        this.createOrder();
    }
};
</script>
  
<style scoped>
.payment-success {
    text-align: center;
    margin-top: 100px;
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
}

.success {
    /* background-color: #4caf50; */
    /* Màu xanh lá cây */
    /* color: #fff; */
    /* Màu chữ trắng */
}

.error {
    /* background-color: #f44336; */
    /* Màu đỏ */
    /* color: #fff; */
    /* Màu chữ trắng */
}

.success-icon {
    font-size: 100px;
    color: green;
}

.error-icon {
    font-size: 100px;
    /* background-color: red; */
    color: red;
}

h1 {
    font-size: 24px;
    margin-top: 10px;
}

p {
    font-size: 18px;
    margin-top: 10px;
}

router-link {
    display: block;
    font-size: 18px;
    margin-top: 20px;
    text-decoration: none;
    color: #007BFF;
    /* Màu xanh dương */
}

router-link:hover {
    text-decoration: underline;
}
</style>
  