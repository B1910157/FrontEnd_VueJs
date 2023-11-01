<template>
    <div class="container">
        <div>

            <h3 class="text-center my-3">
                <i class="fa-solid fa-clock-rotate-left"></i> Lịch sử
            </h3>
            <div class="row mb-3">
                <div class="col-4">
                    <label class="font-weight-bold" for="filterDate">Ngày diễn ra: &nbsp;</label>
                    <input class="border rounded-lg p-1" type="date" id="filterDate" v-model="filterDate" />

                </div>
                <div class="col-2 text-right">
                    <button class="btn btn-primary" @click="retrieveOrders()">Tất cả <i
                            class="fa-solid fa-list"></i></button>
                </div>

            </div>
            <HistoryOrderList v-if="filleredordercount > 0" :orders="filteredorder" @cancel="cancelEvent" />
            <p v-else>Bạn chưa có đơn nào.</p>
        </div>

    </div>
</template>
<script>
import HistoryOrderList from "@/components/HistoryOrderList.vue";
import orderService from "../services/order.service";

export default {
    components: {
        HistoryOrderList,
    },
    data() {
        return {
            orders: [],
            filterDate: "",


        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng foood thành chuỗi để tiện cho tìm kiếm.
        // orderString() {
        //     return this.orders.map((order) => {

        //         const { order_date, event_order, address_book } = order;
        //         return [order_date, event_order, address_book].join("");
        //     });
        // },
        // Trả về các foood có chứa thông tin cần tìm kiếm.


        // filteredorder() {
        //     return this.orders;

        // },
        filteredorder() {
            if (this.filterDate) {
                return this.orders.filter((order) => {
                    // Filter orders based on the selected date
                    return order.event_date === this.filterDate; // Modify this as per your data structure
                });
            } else {
                return this.orders; // If no date is selected, show all orders
            }
        },

        filleredordercount() {
            return this.filteredorder.length;
        },

    },
    methods: {
        async retrieveOrders() {
            try {
                this.orders = await orderService.historyOrder();
                this.filterDate = "";
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveOrders();
            this.activeIndex = -1;
        },
        cancelEvent() {
            this.refreshList();
        }


    },
    mounted() {
        this.refreshList();

    },

};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>