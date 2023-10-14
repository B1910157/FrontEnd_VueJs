<template>
    <div class="container">
        <div class="row ml-3 mb-3">
            <h4 class="col-5 title-in-page">
                Danh sách đơn đặt tiệc
                <i class="fa fa-book icon" aria-hidden="true"></i>
            </h4>

        </div>
        <div class="container">

            <OrderList v-if="filleredordercount > 0" :orders="filteredorder" @accept="acceptEvent" @cancel="cancelEvent" />
            <p v-else>Bạn chưa có đơn đặt tiệc nào.</p>
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
        };
    },

    computed: {

        // Trả về các foood có chứa thông tin cần tìm kiếm.
        // filteredorder() {
        //     return this.orders;

        // },
        filteredorder() {
            // if (this.showUnconfirmed) {
            //     return this.ordersUnconfirm;
            // } else {

            // }
            return this.orders;
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

            } catch (error) {
                console.log(error);
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