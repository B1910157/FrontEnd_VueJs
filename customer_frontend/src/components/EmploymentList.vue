<script>

import { VImg, VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VExpansionPanelText } from "vuetify/lib/components/index.mjs";

import { isAfter, parseISO } from 'date-fns';
export default {
    components: {
        VExpansionPanels,
        VExpansionPanel,
        VExpansionPanelText,
        VExpansionPanelTitle,
        VImg
    },
    data() {
        return {
            currentPage: 1,
            employmentsPerPage: 5,
        };
    },
    props: {
        employments: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },

    methods: {

        getImage(food) {
            return `http://localhost:3000/${food.image}`;
        },
        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
            return formattedDate;
        },

        // Chuyển đến trang trước
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        // Chuyển đến trang sau
        nextPage() {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
            }
        },


    },
    computed: {
        // Tính toán số trang dựa trên số đơn hàng và đơn hàng trên mỗi trang
        totalPage() {
            return Math.ceil(this.employments.length / this.ordersPerPage);
        },
        // Lọc và hiển thị danh sách đơn hàng trên trang hiện tại
        displayedEmployments() {
            const startIndex = (this.currentPage - 1) * this.employmentsPerPage;
            const endIndex = startIndex + this.employmentsPerPage;
            return this.employments.slice(startIndex, endIndex);
        },
    },

};

</script>
<template>
    <div class="row">
        <!-- <div class="col-md-3 border d-none d-md-block">
            <img style="max-width: 100%; height: auto;"
                src="https://45cm.s3.ap-southeast-1.amazonaws.com/images-ch/cong-viec/viec-lam/15/109537296/600/bace3ff89e97d645a34d82ddb8fd7667-2841022943753837794.jpg"
                alt="">
            <hr>
            <img style="max-width: 100%; height: auto;"
                src="https://htdn.vhu.edu.vn/Temp/ArticleImage/59ce1554-f8b3-412f-b9d6-0c3caf1e5e20.jpg" alt="">
            <hr>
            <img src="https://t4.ftcdn.net/jpg/05/62/78/85/360_F_562788544_gBBydDZ7jt9eYjTmsXhsXVzPjL2yQfsg.jpg" alt=""
                style="max-width: 100%; height: auto;">
        </div> -->
        <div class="col-md-12">
            <div class="row " v-for="employ of employments" :key="employ.id">
                <div class="p-2  col-md-8">
                    <div class="employment-card">
                        <h2>{{ employ.title }}</h2>
                        <b>Mô tả:</b>
                        <div v-html="employ.description" class="text-justify"></div>
                        <b>Yêu cầu:</b>
                        <div v-html="employ.requirement" class="text-justify"></div>
                        <div><b>Lương:</b> {{ employ.wage }}</div>
                        <div><b>Số lượng:</b> {{ employ.slot }}</div>
                        <div><b>Địa điểm:</b> {{ employ.area }}</div>
                        <div><b>Hạn tuyển dụng:</b> {{ employ.deadline }}</div>
                    </div>

                </div>

                <div class="p-2 col-md-4">
                    <v-img :src="getImage(employ)" cover class="rounded" height="269px"></v-img>
                    <div><i>Nhà hàng:</i> {{ employ.service_name }}</div>
                    <div><i>Số điện thoại:</i> {{ employ.phone }}</div>
                    <div><i>Email:</i> {{ employ.email }}</div>
                    <hr>
                </div>

            </div>

        </div>


    </div>
</template>
  
  
<style scoped></style>