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
        services: { type: Array, default: [] },

    },
    computed: {
        formattedServices() {
            return this.services.map((service) => {
                const actions = [];
                const details = {
                    text: 'Chi tiết',
                    action: () => this.showDetails(service._id),
                };

                // Thêm các hành động dựa trên trạng thái
                if (service.status === 0) {
                    actions.push({
                        text: 'Duyệt',

                        action: () => this.showConfirm(service._id),
                    });
                    actions.push({
                        text: 'Hủy',

                        action: () => this.showConfirmCancel(service._id),
                    });
                }
                else if (service.status === 1) {
                    actions.push({
                        text: 'Đơn đã duyệt',

                    });

                }
                else if (service.status === 2) {
                    actions.push({
                        text: 'Bạn đã hủy đơn',
                    });
                }
                // else if (order.status === 3) {
                //     actions.push({
                //         text: 'Khách hàng đã hủy đơn',
                //     });
                // }

                return {
                    ...service,
                    actions,
                    details,
                    createAt: this.formatDate(service.updateAt),
                };
            });
        },

    },

    data: () => ({
        headers: [
            {
                title: 'Dịch vụ',
                align: 'start',
                sortable: false,
                key: 'service_name',

            },
            // { title: 'Email', align: 'end', key: 'email', },
            { title: 'Số điện thoại', align: 'end', key: 'phone', },
            { title: 'Địa chỉ', align: 'end', key: 'address', },
            { title: 'Email', align: 'end', key: 'email', },
            {
                title: 'Ngày tạo',
                align: 'end',
                key: 'updateAt',

            },
            {
                title: 'Thao tác',
                align: 'end',
                key: 'actions',

            },

            {
                title: 'Chi tiết',
                align: 'end',
                key: 'details',

            },


        ],
        itemsPerPage: 5,
        // isOpenDialogReasonCancel: false,
        isOrderId: '',

    }),
    methods: {

        toggleMenu(index) {
            this.services[index].showMenu = !this.services[index].showMenu;
        },
        async accept(orderId) {
            // try {
            //     const rs = await orderService.accept(orderId);
            //     if (rs) {
            //         this.$emit('accept', this.orders)

            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        },
        async cancel(orderId, reason) {
            // const reasonReal = {
            //     reason
            // };
            // try {
            //     const rs = await orderService.cancel(orderId, reasonReal);
            //     if (rs) {
            //         this.$emit('cancel', this.orders)
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        },
        // submitReasonCancel(reason) {
        //     this.isOpenDialogReasonCancel = false;
        //     // console.log("Reason", reason, this.isOrderId)
        //     this.cancel(this.isOrderId, reason);
        // },
        showConfirm(orderId) {
            if (confirm("Bạn có chắc chắn muốn duyệt đơn này?")) {
                // this.accept(orderId);
            }
        },
        showConfirmCancel(orderId) {
            if (confirm("Bạn có chắc chắn muốn hủy đơn này?")) {
                // this.isOpenDialogReasonCancel = true;
                // this.isOrderId = orderId;
                // console.log("orderId", this.isOrderId)
                // this.cancel(orderId);
            }
        },
        showDetails(serviceId) {
            console.log("GO TO DETAIL ORDER WITH ID: ", serviceId)
            this.$router.push({
                name: "detailService",
                params: {
                    serviceId: serviceId,
                },

            });

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
        }
    }
};

</script>
<template>
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="formattedServices" class="elevation-1"
        item-key="_id">
        <template v-slot:item.actions="{ item }">
            <!-- {{ item }} -->
            <div v-for="(action, index) in item.actions" :key="index" @click="action.action" class="m-2">
                <v-btn :class="{
                    'btn-green': action.text === 'Duyệt', 'btn-red':
                        action.text === 'Hủy',
                }" class="" style="width: 50px;" v-if="action.text == 'Duyệt' || action.text == 'Hủy'">{{ action.text
}}</v-btn>
                <p class="text-success" v-else-if="action.text == 'Đơn đã duyệt'">{{ action.text }}</p>
                <p class="text-danger" v-else-if="action.text == 'Bạn đã hủy đơn'">{{ action.text }}</p>
                <p class="text-danger" v-else-if="action.text == 'Khách hàng đã hủy đơn'">{{ action.text }}</p>

            </div>
        </template>
        <template v-slot:item.details="{ item }">
            <v-btn @click="item.details.action">
                {{ item.details.text }}
            </v-btn>
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