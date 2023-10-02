<script>

import orderService from '../../services/order.service';
import OrderFormToEdit from "@/components/order/OrderFormToEdit.vue";
import { VBtn, VIcon, VTextField, VDialog, VCard, VImg, VCardTitle, VCardSubtitle, VCardActions, VCardText } from "vuetify/lib/components/index.mjs";
import ListFood from "@/components/order/ListFood.vue"
export default {
    components: {
        OrderFormToEdit,
        VBtn,
        VDialog,
        VTextField,
        ListFood

    },
    data() {
        return {
            foods: [],
            searchText: "",
            order: {},
            isEditing: false,
            isOpenFoods: false
        };
    },
    computed: {
        filteredListFood() {
            return this.foods.filter((food) =>
                food.food_name.toLowerCase().includes(this.searchText.toLowerCase())
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
                    this.findOne(this.$route.params.orderId);
                } catch (error) {
                    console.log(error);
                }
            }


        },
        async removeDrinkInOrder(drinkId) {
            if (confirm("Bạn muốn đồ uống này khỏi đơn hàng?")) {
                try {

                    await orderService.removeDrinkInOrder(this.order._id, drinkId);
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
            this.findOne(this.$route.params.orderId);

        },
        async addFoodToMenuReal(foodId) {
            await orderService.addFoodToCartInOrder(this.order._id, foodId);
            this.getFoodNotInOrder();
            this.findOne(this.$route.params.orderId);
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
                    this.$emit('accept', this.orders)

                }
            } catch (error) {
                console.log(error);
            }
        },
        async cancel(orderId) {

            try {
                const rs = await orderService.cancel(orderId);
                if (rs) {
                    this.$emit('cancel', this.orders)
                }
            } catch (error) {
                console.log(error);
            }
        },
        showConfirm(orderId) {
            if (confirm("Bạn có chắc chắn muốn duyệt đơn này?")) {
                this.accept(orderId);
            }
        },

        showConfirmCancel(orderId) {
            if (confirm("Bạn có chắc chắn muốn hủy đơn này?")) {
                this.cancel(orderId);
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
        }

    }
};

</script>

<template>
    <div class="row container ml-4">
        <div class="col-12 mb-3 mt-3">
            <div class="" v-if="order.status == 0">
                <button class="btn btn-success" @click="showConfirm(order._id)">Duyệt</button>
                <button class="btn btn-danger  ml-2" @click="showConfirmCancel(order._id)">Hủy</button>
            </div>
            <div class="text-success " v-if="order.status == 1">
                Đã duyệt
            </div>
            <div class="text-danger" v-if="order.status == 2">
                Bạn đã hủy
            </div>
            <div class="text-danger" v-if="order.status == 3">
                Khách hàng đã hủy
            </div>

        </div>
        <div class="col-md-5">
            <table class="table">
                <thead class="text-center">
                    <th colspan="5">Thông tin</th>

                </thead>
                <tbody>
                    <tr>
                        <th>Họ tên: &nbsp;</th>
                        <td> {{ order.fullname }}</td>
                    </tr>
                    <tr>
                        <th>Email: &nbsp;</th>
                        <td> {{ order.email }}</td>
                    </tr>
                    <tr>
                        <th>Số điện thoại: &nbsp;</th>
                        <td> {{ order.phone }}</td>
                    </tr>
                    <tr>
                        <th>Địa chỉ tiệc: &nbsp;</th>
                        <td> {{ order.address }}</td>
                    </tr>
                    <tr>
                        <th>Ngày diễn ra: &nbsp;</th>
                        <td> {{ order.event_date + " Vào lúc: " + order.event_time }}</td>
                    </tr>
                    <tr>
                        <th>Ngày thực hiện: &nbsp;</th>
                        <td> {{ formatDate(order.createAt) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-7">
            <div class="ml-3" v-if="order.cart">
                <OrderFormToEdit :order="order" @updateDrink="updateDrink" @openListFood="openListFood"
                    @removeFoodInOrder="removeFoodInOrder" @removeDrinkInOrder="removeDrinkInOrder" />
            </div>
        </div>

    </div>
    <v-dialog v-model="this.isOpenFoods" max-width="800px">

        <v-btn color="danger" @click="this.isOpenFoods = false" icon="fa fa-close" class="ml-auto"></v-btn>
        <v-text-field v-model="searchText" label="Tìm kiếm món ăn" outlined class="bg-white ml-3"></v-text-field>
        <div class="scrollable-list">
            <ListFood :foodNotInMenu="filteredListFood" @addFoodToMenu="addFoodToMenuReal" />
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
</style>