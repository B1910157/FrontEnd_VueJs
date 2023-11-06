<template>
    <div class="container">
        <div class="row ml-3 mb-3">
            <h4 class="col-5 title-in-page">
                Danh sách khách hàng
                <i class="fa fa-book icon" aria-hidden="true"></i>
            </h4>
        </div>
        <div class="container">

            <UserList v-if="filleredusercount > 0" :users="filtereduser" />
            <p v-else>Không có khách hàng nào.</p>
        </div>


    </div>
</template>
<script>
import UserList from "@/components/users/UserList.vue";
import { VBtn, VDialog } from "vuetify/lib/components/index.mjs";


import adminService from "../../services/user.service";
import managerServiceService from "../../services/managerService.service";
// import OrderGetItemService from "../services/orderGetItem.service"

// import { EventBus } from './event-bus';

export default {
    components: {
        UserList,
        VDialog,
        VBtn,

    },
    data() {
        return {
            users: [],

            message: ""

        };
    },

    computed: {

        // Trả về các foood có chứa thông tin cần tìm kiếm.
        // filteredorder() {
        //     return this.orders;

        // },
        filtereduser() {
            // if (this.showUnconfirmed) {
            //     return this.ordersUnconfirm;
            // } else {

            // }
            return this.users;
        },
        // filteredorderUnconfirm() {
        //     return this.ordersUnconfirm;

        // },
        filleredusercount() {
            return this.filtereduser.length;
        },

    },
    methods: {

        async retrieveUsers() {
            try {
                this.users = await managerServiceService.countUser();
                console.log(this.users)
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveUsers();
        },

    },
    mounted() {
        this.refreshList();


    },

};
</script>
<style scoped></style>