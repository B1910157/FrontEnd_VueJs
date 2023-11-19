<script>

import orderService from '../../services/order.service';
import OrderFormToEdit from "@/components/order/OrderFormToEdit.vue";
import { VBtn, VIcon, VTextField, VDialog, VCard, VImg, VCardTitle, VCardSubtitle, VCardActions, VCardText } from "vuetify/lib/components/index.mjs";
import ListFood from "@/components/order/ListFood.vue"
import ListDrink from "@/components/order/ListDrink.vue"
import ListOther from "@/components/order/ListOther.vue";
import ReasonCancelForm from '../../components/order/ReasonCancelForm.vue';
import EditInfoParty from '../../components/order/EditInfoParty.vue';
import Surcharges from '../../components/order/Surcharges.vue';
import { toast } from 'vue3-toastify';
import html2pdf from 'html2pdf.js';

export default {
    components: {
        OrderFormToEdit,
        VBtn,
        VDialog,
        VTextField,
        ListFood,
        ListDrink,
        ListOther,
        ReasonCancelForm,
        EditInfoParty,
        Surcharges

    },
    data() {
        return {
            foods: [],
            drinks: [],
            other: [],
            searchText: "",
            order: {},
            isEditing: false,
            isEditInfo: false,
            isOpenFoods: false,
            isOpenOther: false,
            isOpenDrinks: false,
            isAddSurcharges: false,
            isOpenDialogReasonCancel: false,
            hoaDon: {
                // Dữ liệu hóa đơn cần in
                thongTin: 'Thông tin hóa đơn...',
                // Thêm các dữ liệu cần in khác tương ứng
            },
            openBill: false,

        };
    },
    computed: {
        filteredListFood() {
            return this.foods.filter((food) =>
                food.food_name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
        filteredListDrink() {
            return this.drinks.filter((drink) =>
                drink.drink_name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
        filteredListOther() {
            return this.other.filter((other) =>
                other.other_name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
    },
    watch: {
        '$route.params.orderId': {
            immediate: true,
            handler() {
                let orderId_real = '';
                if (this.$route.params.orderId) {
                    orderId_real = this.$route.params.orderId;
                    this.findOne(orderId_real);
                }

            }
        },
    },
    created() {
        this.findOne(this.$route.params.orderId);
    },
    methods: {

        addSurcharges() {
            console.log("addd");
            this.isAddSurcharges = true;
        },
        cancelSuccessToast() {
            toast.success('Hủy thành công', { autoClose: 1000 });
        },
        acceptSuccessToast() {
            toast.success('Xác nhận thành công', { autoClose: 1000 });
        },
        updateSuccessToast() {
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        },
        reSendSuccessToast() {
            toast.success('Xác nhận lại đơn hàng thành công', { autoClose: 1000 });
        },
        addSuccessToast() {
            toast.success('Thêm thành công', { autoClose: 1000 });
        },
        removeSuccessToast() {
            toast.success('Xóa thành công', { autoClose: 1000 });
        },
        //FOOD
        async getFoodNotInOrder() {
            try {
                this.foods = await orderService.getFoodNotInOrder(this.order._id);
            } catch (error) {

            }

        },

        async openListFood() {

            try {
                this.isOpenFoods = true;
                this.foods = await orderService.getFoodNotInOrder(this.order._id);

            } catch (error) {
                console.log(error);
            }

        },
        async removeFoodInOrder(foodId) {
            if (confirm("Bạn muốn xóa món này khỏi menu?")) {
                try {

                    await orderService.removeFoodInOrder(this.order._id, foodId);
                    this.removeSuccessToast();
                    this.findOne(this.$route.params.orderId);
                } catch (error) {
                    console.log(error);
                }
            }


        },
        //DRINK
        async getDrinkNotInOrder() {
            try {
                this.drinks = await orderService.getDrinkNotInOrder(this.order._id);
            } catch (error) {

            }
        },
        async openListDrink() {
            try {
                this.isOpenDrinks = true;
                this.drinks = await orderService.getDrinkNotInOrder(this.order._id);

            } catch (error) {
                console.log(error);
            }

        },

        async removeDrinkInOrder(drinkId) {
            if (confirm("Bạn muốn đồ uống này khỏi đơn hàng?")) {
                try {

                    await orderService.removeDrinkInOrder(this.order._id, drinkId);
                    this.removeSuccessToast();
                    this.findOne(this.$route.params.orderId);
                } catch (error) {
                    console.log(error);
                }
            }

        },
        async updateDrink(drinkId, quantity) {
            const data = {
                drinkId,
                quantity,
            };
            await orderService.addOrUpdateDrink(this.order._id, data);
            this.updateSuccessToast();
            this.findOne(this.$route.params.orderId);

        },
        async addFoodToMenuReal(foodId) {
            await orderService.addFoodToCartInOrder(this.order._id, foodId);
            this.addSuccessToast();
            this.getFoodNotInOrder();
            this.findOne(this.$route.params.orderId);
        },
        async addOtherToMenuReal(otherId) {
            await orderService.addOtherToCartInOrder(this.order._id, otherId);
            this.addSuccessToast();
            this.getOtherNotInOrder();
            this.findOne(this.$route.params.orderId);
        },
        async addDrinkToMenuReal(drinkId, quantity) {

            const data = {
                drinkId,
                quantity,
            };

            await orderService.addOrUpdateDrink(this.order._id, data);
            this.addSuccessToast();
            this.getDrinkNotInOrder();
            this.findOne(this.$route.params.orderId);
        },
        //OTHER
        async getOtherNotInOrder() {
            try {
                this.other = await orderService.getOtherNotInOrder(this.order._id);
            } catch (error) {

            }

        },
        async openListOther() {
            try {
                this.isOpenOther = true;
                this.other = await orderService.getOtherNotInOrder(this.order._id);

            } catch (error) {
                console.log(error);
            }

        },
        async removeOtherInOrder(otherId) {
            if (confirm("Bạn muốn xóa món này khỏi menu?")) {
                try {
                    await orderService.removeOtherInOrder(this.order._id, otherId);
                    this.removeSuccessToast();
                    this.findOne(this.$route.params.orderId);
                } catch (error) {
                    console.log(error);
                }
            }


        },
        async findOne(orderId) {
            this.order = await orderService.findOneOrder(orderId);
        }
        ,
        toggleMenu(index) {
            this.orders[index].showMenu = !this.orders[index].showMenu;
        },
        async accept(orderId) {
            try {
                const rs = await orderService.accept(orderId);
                if (rs) {
                    this.$emit('accept', this.orders);
                    this.acceptSuccessToast()
                    this.findOne(this.$route.params.orderId);
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
                    this.$emit('cancel', this.orders);
                    // this.cancelSuccessToast();
                    this.findOne(this.$route.params.orderId);
                }
            } catch (error) {
                console.log(error);
            }
        },
        showConfirm(orderId) {
            if (confirm("Bạn có chắc chắn muốn duyệt đơn này?")) {
                this.accept(orderId);
                this.findOne(this.$route.params.orderId);

            }
        },
        submitReasonCancel(reason) {
            this.isOpenDialogReasonCancel = false;
            // console.log("Reason", reason, this.order._id)
            this.cancel(this.order._id, reason);
        },
        showConfirmCancel(orderId) {
            if (confirm("Bạn có chắc chắn muốn hủy đơn này?")) {
                this.isOpenDialogReasonCancel = true;
                // this.cancel(orderId);
                // this.findOne(this.$route.params.orderId);
            }
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
        },
        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },
        editInfoParty() {
            console.log("EDIT INFO PARTY");
            this.isEditInfo = true;
        },
        saveInfoParty() {
            console.log("SAVE INFO PARTY");
        },
        async updateInfoParty(data) {
            const dataUpdate = {
                fullname: data.fullname,
                address: data.address,
                type_party: data.type_party,
                email: data.email,
                event_date: data.event_date,
                event_time: data.event_time,
                phone: data.phone,
                tray_quantity: data.tray_quantity,
                total: ((data.cart[0].totalMenu) *
                    (data.tray_quantity)) +
                    (data.cart[1].totalDrink + (data.cart[2].totalOther)),
                surcharges: data.surcharges
            }

            const rs = await orderService.updateInfoParty(this.order._id, dataUpdate);
            this.updateSuccessToast();
            this.findOne(this.$route.params.orderId);
            this.isEditInfo = false;
        },
        isCurrentDateGreaterThanEventDate() {
            // Lấy ngày hiện tại
            if (this.order && this.order.event_date) {
                const eventDate = this.order.event_date;

                const currentDate = new Date();

                // Chuyển định dạng ngày từ YYYY-MM-DD sang MM/DD/YYYY
                const eventDateParts = eventDate.split("-");
                const formattedEventDate = `${eventDateParts[1]}/${eventDateParts[2]}/${eventDateParts[0]}`;

                // Tạo một đối tượng ngày từ eventDate
                const eventDateObj = new Date(formattedEventDate);

                // Tính toán ngày trong tương lai (ngày eventDate + 2 ngày)
                const futureDate = new Date(eventDateObj);
                futureDate.setDate(futureDate.getDate() - 2);
                // console.log("1234 check time", currentDate + "aloooo " + futureDate)
                // So sánh ngày hiện tại với ngày trong tương lai
                // if (currentDate < futureDate) {
                //     console.log("TRUE");
                // }
                return currentDate < futureDate;
            }

        },
        async submitSurcharges(data) {

            const surcharges = {
                surcharges: data.surcharges,
                orderId: data._id
            };
            // console.log("DATA", surcharges);
            const rs = await orderService.addSurcharges(surcharges);
            this.updateSuccessToast();
            this.isAddSurcharges = false;
        },
        async reSendMail(orderId) {
            try {
                if (confirm("Xác nhận lại đơn đặt tiệc này?")) {
                    await orderService.reSendMail(orderId);
                    this.reSendSuccessToast();
                    this.findOne(this.$route.params.orderId);
                }

            } catch (error) {
                console.log(error)
            }
        },
        bill() {
            this.$router.push({ name: 'bill' });
        },

        async exportPDF() {
            console.log("EXPORT PDF");
            const content = this.$refs.hoaDonContent;
            const options = {
                margin: 10,
                filename: 'hoadon.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };
            // Sử dụng html2pdf để tạo và tải file PDF
            const pdf = await html2pdf().from(content).set(options).save();


            // Tải file PDF
            // pdf.save();
        }

    }
};

</script>

<template>
    <v-dialog v-model="openBill" max-width="800px">
        <v-btn color="danger" @click="openBill = false" icon="fa fa-close" class="ml-auto mb-3">
            <i class="fa fa-close"></i>
        </v-btn>

        <div class="bg-white rounded-lg scrollable-bill" ref="hoaDonContent">
            <!-- Nội dung hóa đơn sẽ được hiển thị ở đây -->
            <p>{{ hoaDon.thongTin }}</p>
            <h4>Thực đơn</h4>
            <p>{{ this.order.cart[0].menu }}</p>

            <!-- Thêm các dữ liệu cần in khác tương ứng -->
        </div>

        <v-btn @click="exportPDF" color="primary">Xuất hóa đơn</v-btn>
    </v-dialog>
    <div class="row container ml-4">
        <div v-if="order.status == 1" class="col-12 text-right mr-3">
            <button @click="bill" class="btn btn-primary">Xuất hóa đơn <i class="fa-solid fa-file-pdf"></i></button>

        </div>
        <div v-if="!isCurrentDateGreaterThanEventDate() && order.status == 0" class="col-12 mb-3 mt-3">
            <div class="text-danger">
                Đơn quá thời hạn
            </div>
        </div>

        <div v-else class="col-12 mb-3 mt-3">

            <div class="" v-if="order.status == 0">
                <button class="badge badge-success" @click="showConfirm(order._id)">Duyệt</button>
                <button class="badge badge-danger  ml-2" @click="showConfirmCancel(order._id)">Hủy</button>
            </div>
            <div class="badge badge-success" v-if="order.status == 1">
                Đã duyệt <i class="fa-solid fa-check"></i>
            </div>
            <div class="badge badge-danger" v-if="order.status == 2">
                Bạn đã hủy <i class="fa-solid fa-xmark"></i>
            </div>
            <div class="badge badge-danger" v-if="order.status == 3">
                Khách hàng đã hủy <i class="fa-solid fa-xmark"></i>
            </div>
            <div @click="reSendMail(order._id)" class="ml-2 badge badge-success"
                v-if="order.status == 1 && order.statusUpdate == 1">
                Gửi xác nhận lại <i class="fa-solid fa-repeat"></i>
            </div>

        </div>
        <div class="col-md-12">
            <div v-if="this.isEditInfo == false" style="display: flex; justify-content: space-between;">
                <div style="flex: 1;">
                    <table class="table custom-height-table">
                        <tbody>
                            <tr>
                                <th>Họ tên: &nbsp;</th>
                                <td>{{ order.fullname }}</td>
                            </tr>
                            <tr>
                                <th>Email: &nbsp;</th>
                                <td>{{ order.email }}</td>
                            </tr>
                            <tr>
                                <th>Số điện thoại: &nbsp;</th>
                                <td>{{ order.phone }}</td>
                            </tr>
                            <tr>
                                <th>Tổng tiền: &nbsp;</th>
                                <td>{{ formatCurrency(order.total) }}</td>
                            </tr>

                            <tr>
                                <th>Ghi chú: &nbsp;</th>
                                <td style="max-height: 50px; overflow-y: auto;">{{ order.note }}</td>
                            </tr>
                            <tr v-if="order.surcharges && order.surcharges.length > 0">
                                <th>Phụ thu:</th>
                                <td>
                                    <ul>
                                        <li v-for="(surcharge, index) in order.surcharges" :key="index">
                                            {{ surcharge.key }}: {{ surcharge.value }}
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style="flex: 1;">
                    <table class="table custom-height-table">

                        <tbody>
                            <tr>
                                <th>Địa chỉ tiệc: &nbsp;</th>
                                <td>{{ order.address }}</td>
                            </tr>
                            <tr>
                                <th>Ngày diễn ra: &nbsp;</th>
                                <td>{{ order.event_date + " Vào lúc: " + order.event_time }}</td>
                            </tr>
                            <tr>
                                <th>Ngày thực hiện: &nbsp;</th>
                                <td>{{ formatDate(order.createAt) }}</td>
                            </tr>
                            <tr v-if="order.type_party">
                                <th>Loại tiệc: &nbsp;</th>
                                <td>{{ order.type_party }}</td>
                            </tr>
                            <tr>
                                <th>Số lượng bàn: &nbsp;</th>
                                <td>{{ order.tray_quantity }}</td>
                            </tr>
                            <tr v-if="order.status == 1">
                                <th>Trạng thái thanh toán &nbsp;</th>
                                <td v-if="order.statusPayment == 1 && order.paymentMethod == 'vnpay'">
                                    <div class="badge badge-success">Đã thanh toán qua VN PAY</div>
                                </td>
                                <td v-if="order.statusPayment == 1 && order.paymentMethod == 'stripe'">
                                    <div class="badge badge-success">Đã thanh toán qua Stripe</div>
                                </td>
                                <td v-if="order.statusPayment == 1 && order.paymentMethod == 'paylater'">
                                    <div class="badge badge-success">Thanh toán trực tiếp</div>
                                </td>
                                <td v-else-if="order.statusPayment == 0">
                                    <div class="badge badge-danger"> Chưa thanh toán</div>
                                </td>
                            </tr>

                            <tr>
                                <th v-if="order.paymentMethod == 'vnpay' || order.paymentMethod == 'stripe'">Số tiền đã
                                    thanh toán: &nbsp;</th>
                                <td v-if="order.statusPayment == 1">
                                    {{ formatCurrency(order.deposit) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <div>Tổng tiền: {{ order.total }}</div>
                    <div>Cọc: {{ order.deposit }}</div>
                    <div>Hình thức: {{ order.paymentMethod }}</div> -->
                </div>
            </div>

            <div v-if="this.isEditInfo == true" class="text-left">
                <EditInfoParty :order="this.order" @submit:order="updateInfoParty" />
            </div>



            <div v-if="this.isAddSurcharges == true" class="text-left">
                <Surcharges :order="this.order" @submit:surcharges="submitSurcharges" />
            </div>




            <div class="row">
                <!-- <div class="col-md-6 p-5">
                    <span v-if="this.isAddSurcharges == false && isCurrentDateGreaterThanEventDate()"
                        @click="addSurcharges()" class="mt-2 btn btn-primary">
                        <i class="fas fa-edit"></i> Thêm phụ thu </span>
                </div> -->
                <div class="col-md-6"></div>
                <div class="col-md-6 text-right p-5">

                    <!-- thay vì check trạng thái đơn thì Check ngày -->
                    <span v-if="this.isEditInfo == false && isCurrentDateGreaterThanEventDate()" @click="editInfoParty()"
                        class="mt-2 btn btn-warning">
                        <i class="fas fa-edit"></i> </span>
                    <!-- <div v-else-if="this.isEditInfo == true">
                        <span @click="saveInfoParty()" class="mt-2 btn btn-primary">
                            <i class="fas fa-save"></i> </span>
                    </div> -->

                </div>
                <div class="col-12">
                    <div class="text-danger" v-if="!isCurrentDateGreaterThanEventDate()">
                        Hết thời gian chỉnh sửa (Chỉnh sửa trước ngày diễn ra 2 ngày )
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-12">
            <hr>
            <div v-if="order.cart">
                <OrderFormToEdit :order="order" @updateDrink="updateDrink" @openListFood="openListFood"
                    @removeFoodInOrder="removeFoodInOrder" @removeDrinkInOrder="removeDrinkInOrder"
                    @removeOtherInOrder="removeOtherInOrder" @openListDrink="openListDrink"
                    @openListOther="openListOther" />
            </div>
        </div>

    </div>
    <v-dialog v-model="this.isOpenDialogReasonCancel" max-width="800px">

        <v-btn color="danger" @click="isOpenDialogReasonCancel = false" icon="fa fa-close" class="ml-auto mb-3"><i
                class="fa fa-close"></i></v-btn>

        <div>
            <ReasonCancelForm @submit:reason="submitReasonCancel" />
        </div>
        <!-- <ListFoodToAdd :foodNotInMenu="this.listFood" @addFoodToMenu="addFoodToMenu" /> -->
    </v-dialog>
    <v-dialog v-model="this.isOpenFoods" max-width="800px">
        <v-btn color="danger" @click="this.isOpenFoods = false" icon="fa fa-close" class="ml-auto mb-2"><i
                class="fa fa-close"></i></v-btn>
        <v-text-field v-model="searchText" label="Tìm kiếm..." outlined class="bg-white ml-3"></v-text-field>
        <div class="scrollable-list bg-white ml-3">
            <ListFood :foodNotInMenu="filteredListFood" @addFoodToMenu="addFoodToMenuReal" />
        </div>
    </v-dialog>
    <v-dialog v-model="this.isOpenDrinks" max-width="800px">
        <v-btn color="danger" @click="this.isOpenDrinks = false" icon="fa fa-close" class="ml-auto"><i
                class="fa fa-close"></i></v-btn>
        <v-text-field v-model="searchText" label="Tìm kiếm..." outlined class="bg-white ml-3"></v-text-field>
        <div class="scrollable-list bg-white ml-3">
            <ListDrink :drinkNotInMenu="filteredListDrink" @addDrinkToMenu="addDrinkToMenuReal" />
        </div>
    </v-dialog>
    <v-dialog v-model="this.isOpenOther" max-width="800px">
        <v-btn color="danger" @click="this.isOpenOther = false" icon="fa fa-close" class="ml-auto"><i
                class="fa fa-close"></i></v-btn>
        <v-text-field v-model="searchText" label="Tìm kiếm..." outlined class="bg-white ml-3"></v-text-field>
        <div class="scrollable-list bg-white ml-3">
            <ListOther :otherNotInMenu="filteredListOther" @addOtherToMenu="addOtherToMenuReal" />
        </div>
    </v-dialog>
</template>
<style scoped>
.scrollable-list {
    max-height: 400px;
    /* Thiết lập chiều cao cố định */
    overflow-y: auto;
    /* Cho phép thanh cuộn nếu nội dung vượt quá chiều cao */
}

.scrollable-bill {
    height: 430px;
    max-height: 430px;
    overflow-y: auto;
}

.custom-height-table tbody tr th,
.custom-height-table tbody tr td {
    height: 73px;
}

.custom-height-table tbody tr th {
    width: 150px;
}
</style>