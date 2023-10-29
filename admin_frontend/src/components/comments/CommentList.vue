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
        comments: { type: Array, default: [] },

    },
    computed: {
        formattedComments() {
            return this.comments.map((cmt) => {
                const actions = [];
                // const details = {
                //     text: 'Chi tiết',
                //     action: () => this.showDetails(service._id),
                // };
                const statusText = [];
                if (cmt.status === 0) {
                    statusText.push({
                        text: 'đã ẩn',
                    });
                }
                else if (cmt.status === 1) {
                    statusText.push({
                        text: 'đang hiển thị',
                    });
                }

                // Thêm các hành động dựa trên trạng thái
                if (cmt.status === 0) {
                    actions.push({
                        text: 'Hiển thị',
                        action: () => this.showConfirm(cmt._id, cmt.status),
                    });

                }
                else if (cmt.status === 1) {
                    actions.push({
                        text: 'Ẩn',
                        action: () => this.showConfirmCancel(cmt._id, cmt.status),
                    });

                }
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
                    ...cmt,
                    actions,
                    // details,
                    statusText,
                    createAt: this.formatDate(cmt.createAt),
                };
            });
        },

    },

    data: () => ({
        headers: [
            {
                title: 'Ngày tạo',
                align: 'start',
                key: 'createAt',

            },
            {
                title: 'Khách hàng',
                align: 'end',
                sortable: false,
                key: 'fullname',

            },
            {
                title: 'Nhà hàng',
                align: 'end',
                sortable: false,
                key: 'service_name',

            },
            {
                title: 'Nội dung',
                align: 'end',
                sortable: false,
                key: 'comment',

            },


            {
                title: 'Thao tác',
                align: 'end',
                key: 'actions',

            },

            {
                title: 'Trạng thái',
                align: 'end',
                key: 'statusText',

            },
            // {
            //     title: 'Chi tiết',
            //     align: 'end',
            //     key: 'details',

            // },


        ],
        itemsPerPage: 5,
        // isOpenDialogReasonCancel: false,
        isServiceId: '',

    }),
    emits: ["hiddenService", "showService"],
    methods: {


        async accept(serviceId, status) {
            try {
                // const rs = await orderService.accept(orderId);

                this.$emit("showService", serviceId, status);
                // if (rs) {
                //     this.$emit('accept', this.services)

                // }
            } catch (error) {
                console.log(error);
            }
        },
        async cancel(serviceId, status) {

            try {
                // const rs = await orderService.cancel(orderId);

                this.$emit("hiddenService", serviceId, status);
                // if (rs) {
                //     this.$emit('cancel', this.orders)
                // }
            } catch (error) {
                console.log(error);
            }
        },

        showConfirm(serviceId, status) {
            if (confirm("Bạn có chắc chắn muốn hiện bình luận này?")) {
                this.accept(serviceId, status);
            }
        },
        showConfirmCancel(serviceId, status) {
            if (confirm("Bạn có chắc chắn muốn ẩn bình luận này?")) {

                this.cancel(serviceId, status);
            }
        },
        // showDetails(serviceId) {

        //     this.$router.push({
        //         name: "detailService",
        //         params: {
        //             serviceId: serviceId,
        //         },

        //     });

        // },
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
        }
    }
};

</script>
<template>
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="formattedComments" class="elevation-1"
        item-key="_id">

        <template v-slot:item.actions="{ item }">

            <v-btn :class="item.status === 1 ? 'btn-green' : 'btn-red'" @click="item.actions[0].action">
                {{ item.actions[0].text }}
            </v-btn>
        </template>
        <template v-slot:item.statusText="{ item }">
            <span :class="item.status === 1 ? 'text-success' : 'text-danger'">
                {{ item.statusText[0].text }}
            </span>
        </template>


    </v-data-table>
    <br><br>
    <!-- <v-dialog v-model="this.isOpenDialogReasonCancel" max-width="800px">

        <v-btn color="danger" @click="isOpenDialogReasonCancel = false" icon="fa fa-close" class="ml-auto mb-3"><i
                class="fa fa-close"></i></v-btn>

        <div>
            <ReasonCancelForm @submit:reason="submitReasonCancel" />
        </div>
      
    </v-dialog> -->
</template>
<style>
.btn-green {
    background-color: #28a745;

    color: white;

}

.btn-red {
    background-color: #dc3545;

    color: white;

}


.btn i.fa-eye {
    color: #007BFF;
}


.btn:hover i.fa-eye {
    color: #0056b3;
}
</style>