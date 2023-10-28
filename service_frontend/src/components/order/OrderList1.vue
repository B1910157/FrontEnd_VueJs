<script>

import orderService from '../../services/order.service';
import { VDataTable } from "vuetify/labs/VDataTable";
import { VBtn, VIcon, VDialog } from "vuetify/lib/components/index.mjs";
import ReasonCancelForm from './ReasonCancelForm.vue';
export default {
    components: {
        VDataTable,
        VBtn,
        VIcon,
        VDialog,
        ReasonCancelForm,
    },
    props: {
        orders: { type: Array, default: [] },

    },
    computed: {
        formattedOrders() {
            return this.orders.map((order) => {
                const actions = [];
                const details = {
                    text: 'Chi tiết',
                    action: () => this.showDetails(order._id),
                };

                // Thêm các hành động dựa trên trạng thái
                if (order.status === 0) {
                    actions.push({
                        text: 'Duyệt',

                        action: () => this.showConfirm(order._id),
                    });
                    actions.push({
                        text: 'Hủy',

                        action: () => this.showConfirmCancel(order._id),
                    });
                }
                else if (order.status === 1) {
                    actions.push({
                        text: 'Đơn đã duyệt',

                    });

                }
                else if (order.status === 2) {
                    actions.push({
                        text: 'Bạn đã hủy đơn',
                    });
                }
                else if (order.status === 3) {
                    actions.push({
                        text: 'Khách hàng đã hủy đơn',
                    });
                }

                return {
                    ...order,
                    actions,
                    details,
                    createAt: this.formatDate(order.createAt),
                };
            });
        },

    },

    data: () => ({
        headers: [
            {
                title: 'Khách hàng',
                align: 'start',
                sortable: false,
                key: 'fullname',

            },
            // { title: 'Email', align: 'end', key: 'email', },
            { title: 'Số điện thoại', align: 'end', key: 'phone', },
            { title: 'Địa chỉ tiệc', align: 'end', key: 'address', },
            { title: 'Ngày diễn ra', align: 'end', key: 'event_date', },
            {
                title: 'Ngày thực hiện',
                align: 'end',
                key: 'createAt',

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
        isOpenDialogReasonCancel: false,
        isOrderId: '',

    }),
    methods: {

        toggleMenu(index) {
            this.orders[index].showMenu = !this.orders[index].showMenu;
        },
        async accept(orderId) {
            try {
                const rs = await orderService.accept(orderId);
                if (rs) {
                    this.$emit('accept', this.orders)

                }
            } catch (error) {
                console.log(error);
            }
        },
        async cancel(orderId, reason) {
            const reasonReal = {
                reason
            };
            try {
                const rs = await orderService.cancel(orderId, reasonReal);
                if (rs) {
                    this.$emit('cancel', this.orders)
                }
            } catch (error) {
                console.log(error);
            }
        },
        submitReasonCancel(reason) {
            this.isOpenDialogReasonCancel = false;
            // console.log("Reason", reason, this.isOrderId)
            this.cancel(this.isOrderId, reason);
        },
        showConfirm(orderId) {
            if (confirm("Bạn có chắc chắn muốn duyệt đơn này?")) {
                this.accept(orderId);
            }
        },
        showConfirmCancel(orderId) {
            if (confirm("Bạn có chắc chắn muốn hủy đơn này?")) {
                this.isOpenDialogReasonCancel = true;
                this.isOrderId = orderId;
                // console.log("orderId", this.isOrderId)
                // this.cancel(orderId);
            }
        },
        showDetails(orderId) {
            console.log("GO TO DETAIL ORDER WITH ID: ", orderId)
            this.$router.push({
                name: "detailOrder",
                params: {
                    orderId: orderId,
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
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="formattedOrders" class="elevation-1"
        item-key="_id">
        <template v-slot:item.actions="{ item }">
            <div v-for="(action, index) in item.selectable.actions" :key="index" @click="action.action" class="m-2">
                <span :class="{
                    'badge badge-success': action.text === 'Duyệt', 'badge badge-danger':
                        action.text === 'Hủy',
                }" class="" style="width: 50px;" v-if="action.text == 'Duyệt' || action.text == 'Hủy'">{{
    action.text
}}</span>
                <p class="badge badge-success " v-else-if="action.text == 'Đơn đã duyệt'">{{
                    action.text }}</p>
                <p class="badge badge-danger" v-else-if="action.text == 'Bạn đã hủy đơn'">{{ action.text }}</p>
                <p class="badge badge-danger" v-else-if="action.text == 'Khách hàng đã hủy đơn'">{{ action.text }}</p>

            </div>
        </template>
        <template v-slot:item.details="{ item }">
            <v-btn @click="item.selectable.details.action">
                {{ item.selectable.details.text }}
            </v-btn>
        </template>

    </v-data-table>
    <br><br>
    <v-dialog v-model="this.isOpenDialogReasonCancel" max-width="800px">

        <v-btn color="danger" @click="isOpenDialogReasonCancel = false" icon="fa fa-close" class="ml-auto mb-3"><i
                class="fa fa-close"></i></v-btn>

        <div class="rounded-lg">
            <ReasonCancelForm @submit:reason="submitReasonCancel" />
        </div>
        <!-- <ListFoodToAdd :foodNotInMenu="this.listFood" @addFoodToMenu="addFoodToMenu" /> -->
    </v-dialog>
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