
           
<template>
    <div class="container bg-white row" ref="billContent">
        <div class="col-md-12 text-center">
            <h4 class="text-uppercase">NHÀ HÀNG: {{ this.info.service_name }}</h4>
            Địa chỉ: {{ this.info.address }} <br>
            Số điện thoại: {{ this.info.phone }}
            <hr />
        </div>
        <div class="col-md-12">
            <h5 class="text-center">HÓA ĐƠN TẠM TÍNH</h5>
            <p>Ngày xuất hóa đơn: {{ formatDate(new Date()) }}</p>
            <p>Khách hàng: {{ this.order.fullname }}</p> <br>
            <div class="row  pl-3">
                <table class="table col-md-6 table-bordered" v-if="this.order && this.order.cart[0]">

                    <thead>
                        <tr>
                            <th class="text-center" colspan="2">THỰC ĐƠN</th>
                        </tr>
                        <tr>
                            <th>Món ăn</th>
                            <th>Giá</th>
                        </tr>


                    </thead>
                    <tbody v-for="(item, index) in this.order.cart[0].menu" :key="index">
                        <tr>

                            <td>{{ item.food_name }}</td>
                            <td>{{ formatCurrency(item.price) }}</td>

                        </tr>

                    </tbody>
                    <tr class="font-weight-bold">
                        <td>Tổng</td>
                        <td>
                            {{ formatCurrency(this.order.cart[0].totalMenu) }}
                        </td>
                    </tr>
                </table>

                <table class="table col-md-6 table-bordered" v-if="this.order && this.order.cart[1].drink.length > 0">
                    <thead>
                        <tr class="text-center">
                            <th colspan="3">ĐỒ UỐNG</th>
                        </tr>
                        <tr>
                            <th>Tên</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in this.order.cart[1].drink" :key="index">
                            <td>{{ item.drink_name }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ formatCurrency(item.price) }}</td>

                        </tr>
                    </tbody>
                    <tr class="font-weight-bold">
                        <td colspan="2">Tổng</td>
                        <td>
                            {{ formatCurrency(this.order.cart[1].totalDrink) }}
                        </td>
                    </tr>
                </table>
            </div>
            <div v-if="this.order && this.order.cart[2].other.length > 0" class="row pl-3">
                <table class="table table-bordered col-md-12">
                    <thead>
                        <tr>
                            <th class="text-center" colspan="2">KHÁC</th>
                        </tr>
                        <tr>
                            <th>Tên</th>
                            <th>Giá</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in this.order.cart[2].other" :key="index">
                        <tr>
                            <td width="50%">{{ item.other_name }}</td>
                            <td>{{ formatCurrency(item.price) }}</td>
                        </tr>
                    </tbody>
                    <tr class="font-weight-bold">
                        <td>Tổng</td>
                        <td>
                            {{ formatCurrency(this.order.cart[2].totalOther) }}
                        </td>
                    </tr>
                </table>


            </div>
            <div class="col-md-12 row">
                <p class="font-weight-bold col-md-3"><u>TỔNG CỘNG</u>:</p>
                <p class="col-md-9">{{ formatCurrency(this.order.total) }}</p>
            </div>
            <div class="p-3 " v-if="this.order && this.order.surcharges && this.order.surcharges.length > 0">
                <b>PHỤ THU</b>
                <ul class="p-3">
                    <li v-for="(surcharge, index) in this.order.surcharges" :key="index">
                        {{ surcharge.key }}: {{ surcharge.value }}
                    </li>
                </ul>

            </div>
            <div class="p-3" v-if="this.order && this.order.deposit != 0">
                <b>Đã thanh toán trước: </b> {{ formatCurrency(this.order.deposit) }}

            </div>
            <div class="p-3" v-if="this.order && this.order.deposit == 0">
                <b> <u>Chưa thanh toán trước</u> </b>

            </div>

        </div>
    </div>
    <div class="row container">
        <div class="col-md-12 text-right">
            <button @click="downloadPDF" class="btn btn-primary">Tải xuống <i class="fa-solid fa-download"></i></button>
        </div>
    </div>
    <hr><br>
</template>
<script>
import orderService from "../../services/order.service";
import infoService from "../../services/info.service";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { saveAs } from "file-saver";
import html2pdf from 'html2pdf.js';
export default {
    components: {

    },
    data() {

        return {
            // orderId: "",
            order: {},
            info: {}


        };
    },
    methods: {
        async downloadPDF() {
            const content = this.$refs.billContent;
            const options = {
                margin: 10,
                filename: `hoadon_${this.order._id}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };
            const pdf = await html2pdf().from(content).set(options).save();

        },
        async retrieveInfo() {
            try {
                this.info = await infoService.info();

            } catch (error) {
                console.log(error);
            }
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
        formatDate(date) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            const formatter = new Intl.DateTimeFormat('vi-VN', options);
            return formatter.format(date);
        },
    },
    created() {
        this.retrieveInfo();
        this.getOrder();
    }
}
</script>