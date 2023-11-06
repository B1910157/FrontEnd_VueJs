<template>
    <div class="container">
        <div class="row ml-3 mb-3">
            <h4 class="col-5 title-in-page">
                Danh sách nhà hàng
                <i class="fa fa-book icon" aria-hidden="true"></i>
            </h4>
            <div>
                <button class="btn btn-primary" @click="this.isAdd = true">Thêm</button>
            </div>
        </div>
        <div class="container">

            <ServiceList v-if="filleredservicecount > 0" :services="filteredservice" @hiddenService="hiddenService"
                @showService="showService" />
            <p v-else>Không có dịch vụ nào.</p>
        </div>
        <v-dialog v-model="this.isAdd" max-width="1000px">

            <v-btn color="danger" @click="this.isAdd = false" icon="fa fa-close" class="ml-auto mb-2"><i
                    class="fa fa-close"></i></v-btn>
            <div class="p-3 bg-white rounded-lg">
                <AddServiceForm class="scrollable-list ml-3 bg-white" @submit:register="addService"
                    :message="this.message" />
            </div>

        </v-dialog>

    </div>
</template>
<script>
import ServiceList from "@/components/services/ServiceList.vue";
import { VBtn, VDialog } from "vuetify/lib/components/index.mjs";
import serviceService from "../../services/managerService.service";
import AddServiceForm from "../../components/services/AddServiceForm.vue";
import adminService from "../../services/user.service";
// import OrderGetItemService from "../services/orderGetItem.service"

// import { EventBus } from './event-bus';

export default {
    components: {
        ServiceList,
        VDialog,
        VBtn,
        AddServiceForm
    },
    data() {
        return {
            services: [],
            isAdd: false,
            message: ""
            // ordersUnconfirm: [],
            // showUnconfirmed: false,
        };
    },

    computed: {

        // Trả về các foood có chứa thông tin cần tìm kiếm.
        // filteredorder() {
        //     return this.orders;

        // },
        filteredservice() {
            // if (this.showUnconfirmed) {
            //     return this.ordersUnconfirm;
            // } else {

            // }
            return this.services;
        },
        // filteredorderUnconfirm() {
        //     return this.ordersUnconfirm;

        // },
        filleredservicecount() {
            return this.filteredservice.length;
        },

    },
    methods: {
        async hiddenService(serviceId, status) {
            const data = {
                serviceId: serviceId,
                status: status
            };
            const rs = await serviceService.updateStatus(data);
            this.refreshList();
            // console.log("hidden", rs);
        },
        async showService(serviceId, status) {
            const data = {
                serviceId: serviceId,
                status: status
            };
            const rs = await serviceService.updateStatus(data);
            this.refreshList();
            // console.log("show", rs);
        },
        async addService(data) {
            const rs = await adminService.adminCreateService(data);
            if (rs.status == 400) {
                this.message = rs.message;
            } else {
                this.message = '';
            }
        },
        async retrieveServices() {
            try {
                this.services = await serviceService.findAll();

            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveServices();
        },
        // acceptEvent() {
        //     this.refreshList();
        //     // this.refreshListUnconfirm();
        // },
        // cancelEvent() {
        //     this.refreshList();
        //     // this.refreshListUnconfirm();
        // },

        // async retrieveOrdersUnconfirm() {
        //     try {
        //         // this.ordersUnconfirm = await orderService.getOrder();
        //         // console.log(this.ordersUnconfirm);
        //         console.log("hi")
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },

        // refreshListUnconfirm() {
        //     this.retrieveOrdersUnconfirm();
        // },


    },
    mounted() {
        this.refreshList();
        // this.refreshListUnconfirm();

    },

};
</script>
<style scoped>
.scrollable-list {
    max-height: 400px;
    /* Thiết lập chiều cao cố định */
    overflow-y: auto;
    /* Cho phép thanh cuộn nếu nội dung vượt quá chiều cao */
}

.page {
    text-align: left;
    max-width: 750px;
}
</style>