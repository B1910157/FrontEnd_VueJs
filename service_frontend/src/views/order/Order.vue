<template>
    <div class="container">
        <div class="row ml-3 mb-3">
            <h4 class="col-5 title-in-page">
                Danh sách đơn đặt tiệc
                <i class="fa fa-book icon" aria-hidden="true"></i>
            </h4>

        </div>
        <div class="container">
            <div class="row mb-3">
                <div class="col-4">
                    <label class="font-weight-bold" for="filterDate">Ngày diễn ra: &nbsp;</label>
                    <input class="border rounded-lg p-1" type="date" id="filterDate" v-model="filterDate"
                        @input="filterOrders" />

                </div>
                <div class="col-2">
                    <button class="btn btn-primary" @click="retrieveOrders()"> <i class="fa-solid fa-repeat"></i></button>
                </div>

            </div>

            <OrderList :orders="this.orders" @accept="acceptEvent" @cancel="cancelEvent" />
            <!-- <p v-else class="text-center">Không có đơn đặt tiệc nào.</p> -->
        </div>

    </div>
</template>
<script>
import OrderList from "@/components/order/OrderList1.vue";
import orderService from "../../services/order.service";
// import OrderGetItemService from "../services/orderGetItem.service"

// import { EventBus } from './event-bus';

export default {
    components: {
        OrderList,
    },
    data() {
        return {
            orders: [],
            ordersUnconfirm: [],
            showUnconfirmed: false,
            filterDate: "",

        };
    },

    computed: {

        // Trả về các foood có chứa thông tin cần tìm kiếm.
        // filteredorder() {
        //     return this.orders;

        // },
        // filteredorder() {
        //     // if (this.showUnconfirmed) {
        //     //     return this.ordersUnconfirm;
        //     // } else {

        //     // }
        //     return this.orders;
        // },
        filteredorder() {
            if (this.filterDate) {
                return this.orders.filter((order) => {
                    // Chỉ hiển thị các đơn đặt tiệc có ngày trùng với filterDate
                    return order.event_date === this.filterDate; // Điều này cần điều chỉnh tùy vào cấu trúc dữ liệu của bạn
                });
            } else {
                // this.orders = await orderService.findAll();
                return this.orders; // Nếu không có ngày được chọn, hiển thị tất cả đơn đặt tiệc

            }
        },
        // filteredorderUnconfirm() {
        //     return this.ordersUnconfirm;

        // },
        filleredordercount() {
            return this.filteredorder.length;
        },

    },
    methods: {
        async retrieveOrders() {
            try {

                this.orders = await orderService.findAll();
                this.filterDate = ""

            } catch (error) {
                console.log(error);
            }
        },
        async filterOrders() {

            const date = {
                date: this.filterDate
            };
            console.log("date nè", this.filterDate)
            if (this.filterDate) {
                console.log("CÓ DATE")
                this.isFiltering = true;
                this.orders = await orderService.findOrdersByDate(date);
            } else {
                if (this.isFiltering) { // Kiểm tra xem bạn đang trong chế độ lọc không
                    this.retrieveAllOrders(); // Nếu có, lấy tất cả các đơn hàng
                }
            }

        },
        refreshList() {
            this.retrieveOrders();
        },
        acceptEvent() {
            this.refreshList();
            // this.refreshListUnconfirm();
        },
        cancelEvent() {
            this.refreshList();
            // this.refreshListUnconfirm();
        },

        async retrieveOrdersUnconfirm() {
            try {
                // this.ordersUnconfirm = await orderService.getOrder();
                // console.log(this.ordersUnconfirm);
                console.log("hi")
            } catch (error) {
                console.log(error);
            }
        },

        refreshListUnconfirm() {
            this.retrieveOrdersUnconfirm();
        },


    },
    mounted() {
        this.refreshList();
        // this.refreshListUnconfirm();

    },

};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>