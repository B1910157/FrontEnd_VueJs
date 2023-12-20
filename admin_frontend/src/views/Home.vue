<template>
    <div class="container">

        <v-combobox v-model="this.year" label="Năm" :items="yearOptions"></v-combobox>
        <canvas class="bg-white" id="combinedLineChart" width="200" height="50"></canvas>
        <v-row class="pt-3">
            <v-col cols="4">
                <v-card style="height: 100px;" color="primary" dark>
                    <v-card-title class="text-h5">
                        Người dùng: {{ userCount }} <i class="fa-solid fa-users"></i>
                    </v-card-title>
                    <!-- <v-card-actions>
                        <v-btn color="white">Chi tiết</v-btn>
                    </v-card-actions> -->
                </v-card>
            </v-col>

            <v-col cols="4">
                <v-card style="height: 100px;" color="success" dark>
                    <v-card-title class="text-h5">
                        Nhà hàng: {{ serviceCount }} <i class="fa-solid fa-house-chimney-user"></i>
                    </v-card-title>
                    <!-- <v-card-actions>
                        <v-btn color="white">Chi tiết</v-btn>
                    </v-card-actions> -->
                </v-card>
            </v-col>

            <v-col cols="4">
                <v-card style="height: 100px;" color="warning" dark>
                    <v-card-title class="text-h5">Số tiền giao dịch <i class="fa-solid fa-sack-dollar"></i></v-card-title>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-card-title v-on="on" class="text-h5">
                                {{ formatCurrency(truncatedAmount) }}
                            </v-card-title>
                        </template>
                        <span>{{ formatCurrency(totalTransactionAmount) }}</span>
                    </v-tooltip>

                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import { VBtn, VTooltip, VCombobox, VCard, VList, VSlider, VListItem, VRow, VCol, VImg, VCardTitle, VCardSubtitle, VCardActions, VCardText, VCardItem, VIcon } from "vuetify/lib/components/index.mjs";
import Chart from 'chart.js/auto';
// import orderService from "../services/order.service";
import managerServiceService from "../services/managerService.service";
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
        VTooltip


    },
    data() {
        return {
            dataOrder: [],
            dataOrderSuccess: [],
            year: 2023,
            chart: null,
            userCount: 5,
            serviceCount: 1,
            totalTransactionAmount: 10000000,
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
        truncatedAmount() {
            const maxLength = 10; // Set your desired length
            return this.totalTransactionAmount.toString().length > maxLength
                ? this.totalTransactionAmount.toString().substring(0, maxLength) + "..."
                : this.totalTransactionAmount;
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
        async countUser() {
            try {
                const users = await managerServiceService.countUser();
                if (users) {
                    this.userCount = users.length;
                }

            } catch (error) {

            }
        },
        async totalDeposit() {
            try {
                const orders = await managerServiceService.totalDeposit();
                if (orders) {
                    for (const order of orders) {
                        // Check if the order has a 'deposit' property
                        const deposit = order.deposit !== undefined ? order.deposit : 0;
                        // Accumulate the deposit to the total
                        this.totalTransactionAmount += deposit;
                    }
                }

            } catch (error) {

            }
        },
        async countService() {
            try {
                const services = await managerServiceService.countService();
                if (services) {
                    this.serviceCount = services.length;
                }

            } catch (error) {

            }
        },
        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },
        async getOrdersByMonth() {
            try {

                const orders = await managerServiceService.findOrdersByMonthOfAllService();
                this.dataOrder = orders.filter(order => order._id.year === this.year);

                // this.createChart();
                const order2 = await managerServiceService.findOrdersSuccessOfAllService();
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
        this.start();
        this.countUser();
        this.countService();
        this.totalDeposit();
    },


}
</script>
<style scoped></style>