
           
<template>
    <div class="container row">
        <div class="col-2">

        </div>
        <div class="col-8 p-3">
            <h3 class="text-center text-secondary">Thanh toán <i class="fa fa-shopping-cart" aria-hidden="true"></i></h3>
            <table class="table">
                <tr>
                    <td>
                        Mã đơn đặt tiệc
                    </td>

                    <td>
                        {{ this.order._id }}
                    </td>
                </tr>
                <tr>
                    <td>
                        Tổng tiền đặt tiệc (Không tính phát sinh)
                    </td>
                    <td>
                        {{ formatCurrency(this.order.total) }}
                    </td>
                </tr>
                <!-- <tr>
                    <td>
                        Tiền cọc thanh toán
                    </td>
                    <td>
                        {{ formatCurrency(this.order.deposit) }}
                    </td>
                </tr> -->

            </table>
            <Form @submit="submitPayment" :validation-schema="paymentFormSchema">
                <div class="form-group col-12">
                    <label class="font-weight-bold"> Thanh toán </label>
                    <div class="row">
                        <div class="col-6 row">
                            <div class="col-6 ">
                                <input class="" type="radio" name="percentPayment" value="0.2"
                                    v-model="this.percentPayment" />
                                <label class=""> 20%</label>
                            </div>

                            <div class="col-6">
                                <input type="radio" name="percentPayment" value="1" v-model="this.percentPayment" />
                                <label> 100%</label>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="form-group col-12">
                    <label class="font-weight-bold"> Phương thức thanh toán </label>

                    <div>
                        <input type="radio" id="paymentVnPay" name="payment" value="vnpay" v-model="paymentLocal.payment" />
                        <label for="paymentVnPay">Thanh toán qua VN Pay</label>
                    </div>
                    <div>
                        <input type="radio" id="paymentPayLater" name="payment" value="paylater"
                            v-model="paymentLocal.payment" />
                        <label for="paymentPayLater">Thanh toán trực tiếp</label>
                    </div>
                </div>
                <div class="form-group col-12">
                    <button type="submit" class="btn btn-primary">Thanh toán</button>
                </div>
            </Form>

        </div>
        <div class="col-2">

        </div>

    </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import orderService from "../services/order.service";
import payment from "../services/payment.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,

    },
    data() {
        const paymentFormSchema = yup.object().shape({

        });
        return {
            orderId: "",
            order: {},
            paymentLocal: {
                payment: 'vnpay',
                // percentPayment: 0.2
            },
            percentPayment: 0.2,
            amount: 0,
            paymentFormSchema

        };
    },
    methods: {
        async submitPayment() {
            this.orderId = this.order._id;
            const paymentMethod = this.paymentLocal.payment;
            if (paymentMethod == 'paylater') {
                const data1 = {
                    orderId: this.orderId,
                    paymentMethod: paymentMethod,
                    amount: 0
                };
                await orderService.choosePayment(data1);
                this.$router.push({ name: 'history' });
            } else if (paymentMethod == 'vnpay') {
                this.amount = this.order.total * this.percentPayment;
                const amountReal = parseInt(this.amount);
                const data = {
                    orderId: this.orderId,
                    // paymentMethod,
                    amount: amountReal
                };
                console.log("this order", data);
                const link = await payment.createPaymentVNPay(data);
                const linkReal = link.vnpUrl;
                if (linkReal) {
                    try {
                        window.location.href = linkReal;
                        // await orderService.addOrder(data);
                        // this.showSuccessToast();

                    } catch (error) {
                        console.log(error)
                    }

                }
            }

            // await orderService.choosePayment();
        },
        async getOrder() {
            this.order = await orderService.findOneOrder(this.$route.params.orderId)
        },
        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },
    },
    created() {
        // this.orderId = this.$route.params.orderId;
        this.getOrder();
    }
}
</script>