<template>
    <div v-if="this.order.cart[0].menu.length > 0">
        <h5>Thực đơn</h5>

        <table class="table table-bordered text-center">
            <thead>
                <th>Tên món</th>
                <th>Giá</th>
                <th v-if="this.isEditing == true">Thao tác</th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in this.order.cart[0].menu" :key="index">
                    <td>{{ item.food_name }}</td>
                    <td>{{ item.price }}</td>
                    <td v-if="this.isEditing == true">
                        <button class="btn btn-danger" @click="removeFoodInOrder(item._id)"> <i
                                class="fa fa-trash"></i></button>
                    </td>
                </tr>
                <tr>
                    <td>
                        Tổng tiền Menu: {{ formatCurrency(this.order.cart[0].totalMenu) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="this.isEditing == true" class="row mr-1">
            <button @click="addFoodToMenu()" class="mb-4  btn btn-primary offset-md-11">
                <i class="fas fa-add"></i> </button>
        </div>


    </div>

    <div v-if="this.order.cart[1].drink.length > 0">
        <h5>Đồ uống</h5>
        <div>
            <table class="table table-bordered text-center">
                <thead>
                    <th>Tên món</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th v-if="this.isEditing == true">Thao tác</th>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in   this.order.cart[1].drink  " :key="index">

                        <td>{{ item.drink_name }}</td>
                        <td v-if="this.isEditing == true">

                            <input type="number" name="quantity" v-model="item.quantity" min="1" class="input-small">
                            /{{ item.unit }}
                        </td>
                        <td v-if="this.isEditing == false">

                            {{ item.quantity + " " + item.unit }}
                        </td>
                        <td>{{ item.price }}</td>

                        <td v-if="this.isEditing == true"><button class="btn btn-warning"
                                @click="updateDrink(item._id, item.quantity)">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger" @click="removeDrinkInOrder(item._id)"> <i
                                    class="fa fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Tổng tiền Đồ uống: {{ formatCurrency(this.order.cart[1].totalDrink) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="this.isEditing == true" class="row mr-1">
            <button @click="addDinkToMenu()" class="mb-4  btn btn-primary offset-md-11">
                <i class="fas fa-add"></i> </button>
        </div>
    </div>

    <div v-if="this.order.cart[2].other.length > 0">
        <h5>Khác</h5>
        <table class="table table-bordered text-center">
            <thead>
                <th>Tên</th>
                <th>Giá</th>
                <th v-if="this.isEditing == true">Thao tác</th>
            </thead>
            <tbody>
                <tr v-for="(  item, index  ) in   this.order.cart[2].other  " :key="index">

                    <td>{{ item.other_name }}</td>
                    <td>{{ item.price }}</td>
                    <td v-if="this.isEditing == true">
                        <button class="btn btn-danger" @click="removeOtherInOrder(order._id, order.service_id, item._id)">
                            <i class="fa fa-trash"></i></button>
                    </td>
                </tr>
                <tr>
                    <td>
                        Tổng tiền Khác: {{ formatCurrency(this.order.cart[2].totalOther) }}
                    </td>
                </tr>
            </tbody>

        </table>
        <div v-if="this.isEditing == true" class="row mr-1">
            <button @click="addOtherToMenu()" class="mb-4  btn btn-primary offset-md-11">
                <i class="fas fa-add"></i> </button>
        </div>
    </div>
    <div class="row">
        <div class="offset-md-10">
            <span v-if="this.isEditing == false && order.status == 0" @click="editOrder()" class="mt-2 btn btn-warning">
                <i class="fas fa-edit"></i> </span>
            <div v-else-if="this.isEditing == true">
                <span @click="saveOrder()" class="mt-2 btn btn-danger">
                    <i class="fas fa-close"></i> </span>
            </div>
        </div>
    </div>
    <br> <br>
</template>
<script>

import orderService from '../../services/order.service';
export default {

    props: {
        order: {},

    },
    data() {
        return {

            isEditing: false
        };
    },
    emits: ["openListFood", "removeFoodInOrder", "updateDrink"],
    methods: {
        updateDrink(drinkId, quantity) {
            this.$emit("updateDrink", drinkId, quantity);
        },
        addFoodToMenu() {
            this.$emit("openListFood");

        },
        editOrder() {
            this.isEditing = true;


        },
        saveOrder() {
            this.isEditing = false;


        },
        removeFoodInOrder(foodId) {

            this.$emit("removeFoodInOrder", foodId);

        },
        removeDrinkInOrder(drinkId) {
            this.$emit("removeDrinkInOrder", drinkId);

        },
        removeOtherInOrder(orderId, service_id, otherId) {
            console.log("removeOther", service_id, orderId, otherId)

        },
        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
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
