<script>

import serviceService from '../../services/service.service';
import { VDataTable } from "vuetify/labs/VDataTable";
import { VBtn, VIcon, VDialog, VBadge, } from "vuetify/lib/components/index.mjs";
// import ReasonCancelForm from './ReasonCancelForm.vue';
export default {
    components: {
        VDataTable,
        VBtn,
        VIcon,
        VDialog,
        VBadge
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
                const statusText = [];
                if (service.status === 0) {
                    statusText.push({
                        text: 'Không hoạt động',
                    });
                }
                else if (service.status === 1) {
                    statusText.push({
                        text: 'Đang hoạt động',
                    });
                }


                // Thêm các hành động dựa trên trạng thái
                if (service.status === 0) {
                    actions.push({
                        text: 'Hiện',
                        action: () => this.showConfirm(service._id, service.status),
                    });

                }
                else if (service.status === 1) {
                    actions.push({
                        text: 'Ẩn',

                        action: () => this.showConfirmCancel(service._id, service.status),
                    });

                }
                else if (service.status === 3) {
                    actions.push({
                        text: 'Duyệt',
                        action: () => this.acceptService(service._id, service.status),
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
                    ...service,
                    actions,
                    details,
                    statusText,
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
            // { title: 'Địa chỉ', align: 'end', key: 'address', },
            { title: 'Email', align: 'end', key: 'email', },
            // {
            //     title: 'Ngày tạo',
            //     align: 'end',
            //     key: 'updateAt',

            // },
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
            {
                title: 'Thống kê',
                align: 'end',
                key: 'details',

            },


        ],
        itemsPerPage: 5,
        // isOpenDialogReasonCancel: false,
        isServiceId: '',

    }),
    emits: ["hiddenService", "showService", "acceptService"],
    methods: {
        getStatusClass(status) {
            // Set different classes based on status value
            return status === 1 ? 'text-success' : status === 3 ? 'text-primary' : 'text-danger';
        },
        getStatusText(status) {
            // Set different text content based on status value
            return status === 1 ? 'Đang hoạt động' : status === 3 ? 'Mới' : 'Không hoạt động';
        },

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
        async acceptService(serviceId, status) {
            if (confirm("Bạn có chắc chắn muốn duyệt dịch vụ này?")) {
                try {
                    // const rs = await orderService.accept(orderId);

                    this.$emit("acceptService", serviceId, status);
                    // if (rs) {
                    //     this.$emit('accept', this.services)

                    // }
                } catch (error) {
                    console.log(error);
                }
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
            if (confirm("Bạn có chắc chắn muốn hiện dịch vụ này?")) {
                this.accept(serviceId, status);
            }
        },
        showConfirmCancel(serviceId, status) {
            if (confirm("Bạn có chắc chắn muốn ẩn dịch vụ này?")) {

                this.cancel(serviceId, status);
            }
        },
        showDetails(serviceId) {
            console.log("GO TO DETAIL ORDER WITH ID: ", serviceId)
            this.$router.push({
                name: "detailService",
                params: {
                    service_id: serviceId,
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

            <v-btn :class="[
                'badge',
                item.status === 1 ? 'btn-success' : item.status === 3 ? 'btn-primary' : 'btn-danger'
            ]" @click="item.actions[0].action">
                {{ item.actions[0].text }}
            </v-btn>

        </template>
        <template v-slot:item.statusText="{ item }">

            <!-- <span :class="item.status === 1 ? 'text-success' : 'text-danger'">
                {{ item.statusText[0].text }}
            </span> -->
            <span :class="getStatusClass(item.status)">
                {{ getStatusText(item.status) }}
            </span>
        </template>
        <template v-slot:item.details="{ item }">
            <v-btn @click="item.details.action">
                Thống kê
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
.badge {
    padding: 6px 8px;
    border-radius: 12px;
    font-size: 0.875rem;
    line-height: 1.25rem;
}

.btn-green {
    background-color: green;
    color: white;
}

.btn-red {
    background-color: red;
    color: white;
}

.btn i.fa-eye {
    color: #007BFF;
}


.btn:hover i.fa-eye {
    color: #0056b3;
}
</style>