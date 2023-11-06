<script>

import serviceService from '../../services/service.service';
import { VDataTable } from "vuetify/labs/VDataTable";
import { VBtn, VIcon, VDialog } from "vuetify/lib/components/index.mjs";
// import ReasonCancelForm from './ReasonCancelForm.vue';
export default {
    components: {
        VDataTable,
        VBtn,
        VIcon,
        VDialog,
        // ReasonCancelForm,
    },
    props: {
        users: { type: Array, default: [] },

    },
    computed: {
        formattedUser() {
            return this.users.map((user) => {
                const actions = [];
                // const details = {
                //     text: 'Chi tiết',
                //     action: () => this.showDetails(user._id),
                // };
                // const statusText = [];
                // if (service.status === 0) {
                //     statusText.push({
                //         text: 'Chưa hoạt động',
                //     });
                // }
                // else if (service.status === 1) {
                //     statusText.push({
                //         text: 'Đang hoạt động',
                //     });
                // }

                // Thêm các hành động dựa trên trạng thái
                // if (user.status === 0) {
                //     actions.push({
                //         text: 'Hiển thị',
                //         action: () => this.showConfirm(service._id, service.status),
                //     });

                // }
                // else if (service.status === 1) {
                //     actions.push({
                //         text: 'Ẩn',

                //         action: () => this.showConfirmCancel(service._id, service.status),
                //     });

                // }
                // else if (service.status === 2) {
                //     actions.push({
                //         text: 'Đã ẩn',
                //     });
                // }
                // else if (order.status === 3) {
                //     actions.push({
                //         text: 'Khách hàng đã Hiển thị đơn',
                //     });
                // }

                return {
                    ...user,
                    // actions,
                    // details,
                    // statusText,
                    // createAt: this.formatDate(service.updateAt),
                };
            });
        },

    },

    data: () => ({
        headers: [
            {
                title: 'Người dùng',
                align: 'start',
                sortable: false,
                key: 'fullname',

            },
            // { title: 'Email', align: 'end', key: 'email', },
            { title: 'Số điện thoại', align: 'end', key: 'phone', },
            { title: 'Địa chỉ', align: 'end', key: 'address', },
            { title: 'Email', align: 'end', key: 'email', },
            // {
            //     title: 'Ngày tạo',
            //     align: 'end',
            //     key: 'updateAt',

            // },
            // {
            //     title: 'Thao tác',
            //     align: 'end',
            //     key: 'actions',

            // },

            // {
            //     title: 'Trạng thái',
            //     align: 'end',
            //     key: 'statusText',

            // },
            // {
            //     title: 'Chi tiết',
            //     align: 'end',
            //     key: 'details',

            // },


        ],
        itemsPerPage: 5,
        // isOpenDialogReasonCancel: false,
        // isServiceId: '',

    }),
    // emits: ["hiddenService", "showService"],
    methods: {



        // formatDate(dateString) {
        //     const date = new Date(dateString);
        //     const day = date.getDate();
        //     const month = date.getMonth() + 1;
        //     const year = date.getFullYear();
        //     const hours = date.getHours();
        //     const minutes = date.getMinutes();
        //     const seconds = date.getSeconds();
        //     const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        //     return formattedDate;
        // }
    }
};

</script>
<template>
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="formattedUser" class="elevation-1"
        item-key="_id">

    </v-data-table>
    <br><br>
</template>
<style></style>