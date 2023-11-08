<script>

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
        feedbacks: { type: Array, default: [] },

    },
    computed: {
        formattedFeedback() {
            return this.feedbacks.map((feedback) => {
                const actions = [];

                return {
                    ...feedback,
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
            { title: 'Email', align: 'end', key: 'email', },
            { title: 'Số điện thoại', align: 'end', key: 'phone', },
            // { title: 'Địa chỉ', align: 'end', key: 'address', },
            { title: 'Nội dung', align: 'end', key: 'content', },
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
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="formattedFeedback" class="elevation-1"
        item-key="_id">

    </v-data-table>
    <br><br>
</template>
<style></style>