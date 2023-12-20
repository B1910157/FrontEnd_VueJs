<template>
    <div class="container">
        <v-combobox v-model="this.year" label="Năm" :items="yearOptions"></v-combobox>
        <canvas class=" bg-white" id="combinedLineChart" width="300" height="100"></canvas>
        <v-row class="pt-3">
            <v-col cols="3">
                <v-card style="height: 100px;" color="primary" dark>
                    <v-card-title class="text-h5">
                        Tổng đơn <i class="fa-regular fa-star"></i> <br> {{ this.orders.length }} đơn
                    </v-card-title>

                </v-card>
            </v-col>

            <v-col cols="3">
                <v-card style="height: 100px;" color="success" dark>
                    <v-card-title class="text-h5">
                        Thành công <i class="fa-solid fa-check"></i> <br> {{ this.successOrder.length }} đơn
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col cols="3">
                <v-card style="height: 100px;" color="warning" dark>
                    <v-card-title class="text-h5">
                        Chờ xử lý <i class="fa-regular fa-clock"></i> <br> {{ this.waitOrder.length }} đơn
                    </v-card-title>

                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card style="height: 100px;" color="error" dark>
                    <v-card-title class="text-h6">
                        Không thành công <i class="fa-solid fa-exclamation"></i> <br>{{ this.failOrder.length }} đơn
                    </v-card-title>

                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import { VBtn, VCombobox, VCard, VList, VSlider, VListItem, VRow, VCol, VImg, VCardTitle, VCardSubtitle, VCardActions, VCardText, VCardItem, VIcon } from "vuetify/lib/components/index.mjs";
import Chart from 'chart.js/auto';
import orderService from "../services/order.service";
export default {
    components: {
        VCombobox,
        VBtn,
        VCard,
        VImg,
        VCardSubtitle,
        VCardTitle,
        VCardActions,
        VCardText,
        VCardItem,
        VIcon,
        VRow,
        VCol,
        VListItem,
        VSlider,
        VList,


    },
    data() {
        return {
            dataOrder: [],
            dataOrderSuccess: [],
            year: 2023,
            chart: null,
            orders: [],
            successOrder: [],
            waitOrder: [],
            failOrder: []
        };
    },
    computed: {
        yearOptions() {
            const currentYear = new Date().getFullYear();
            const startYear = 2020; // Bắt đầu từ năm 2000 hoặc năm mong muốn
            const years = [];
            for (let i = currentYear; i >= startYear; i--) {
                years.push(i);
            }

            return years;
        },

    },
    watch: {
        year: {
            deep: true,
            handler() {
                this.start();

            },
        },
    },
    methods: {
        async retrieveOrders() {
            try {

                this.orders = await orderService.findAll();
                this.successOrder = this.orders.filter(order => order.status === 1);
                this.waitOrder = this.orders.filter(order => order.status === 0);
                this.failOrder = this.orders.filter(order => order.status != 0 && order.status != 1);
            } catch (error) {
                console.log(error);
            }
        },
        async getOrdersByMonth() {
            try {

                const orders = await orderService.findOrdersByMonth();
                this.dataOrder = orders.filter(order => order._id.year === this.year);

                // this.createChart();
                const order2 = await orderService.findOrdersSuccess();
                // console.log("data success1", this.dataOrderSuccess);
                this.dataOrderSuccess = order2.filter(order => order._id.year === this.year);
                this.createChart();

            } catch (error) {

            }
        },

        start() {
            console.log("year 1 nè", this.year);
            this.getOrdersByMonth();
            // this.getOrdersSuccess();

        },
        createChart() {
            if (this.chart) {
                this.chart.destroy();
            }
            console.log("year CARTES nè", this.year);
            const lineChartCanvas = document.getElementById('combinedLineChart');

            let orderData = Array(12).fill(0);
            let orderDataSuccess = Array(12).fill(0);

            for (const order of this.dataOrder) {
                const monthIndex = order._id.month - 1;
                orderData[monthIndex] = order.count;
            }

            for (const order of this.dataOrderSuccess) {
                const monthIndex = order._id.month - 1;
                orderDataSuccess[monthIndex] = order.count;
            }
            console.log("data success", orderDataSuccess)

            this.chart = new Chart(lineChartCanvas, {
                type: 'line',
                data: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: 'Số lượt đặt tiệc',
                            data: orderData, // Thay data mẫu với dữ liệu từ this.dataOrder
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: false,
                        },
                        {
                            label: 'Số lượng đơn thành công',
                            data: orderDataSuccess, // Số lượng hóa đơn từ dữ liệu mẫu
                            borderColor: 'green',
                            borderWidth: 1,
                            fill: false,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },
    },
    created() {
        this.retrieveOrders();
        this.start();
    },


}
</script>
<style scoped></style>