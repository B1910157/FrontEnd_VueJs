<template>
    <div v-if="this.order.cart[0].menu.length > 0">
        <div>
            <h5 class="text-center">Thực đơn</h5>
            <table class="table table-bordered ">
                <thead>
                    <th>Tên món</th>
                    <th>Hình ảnh</th>
                    <th>Giá</th>
                    <th v-if="this.isEditing == true">Thao tác</th>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in this.order.cart[0].menu" :key="index">
                        <td>{{ item.food_name }}</td>
                        <td><v-img :src="getImage(item)" cover height="100px"></v-img></td>
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
            <div v-if="this.isEditing == true" class="row text-right">
                <button @click="addFoodToMenu()" class="mb-4  btn btn-primary offset-md-11">
                    <i class="fas fa-add"></i> </button>
            </div>
        </div>
    </div>
    <hr>
    <h5 class="text-center">Đồ uống</h5>
    <div v-if="this.order.cart[1].drink.length > 0">

        <div>
            <table class="table table-bordered text-center">
                <thead>
                    <th>Tên</th>
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

                        <td v-if="this.isEditing == true">
                            <button class="btn btn-warning" @click="updateDrink(item._id, item.quantity)">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger ml-2" @click="removeDrinkInOrder(item._id)"> <i
                                    class="fa fa-trash"></i>
                            </button>
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

    </div>
    <div v-else class="text-center">
        <br>
        <p> <i>Không có</i></p>

    </div>
    <div v-if="this.isEditing == true" class="row text-right">
        <button @click="addDinkToMenu()" class="mb-4  btn btn-primary offset-md-11">
            <i class="fas fa-add"></i> </button>
    </div>
    <hr>
    <h5 class="text-center">Khác</h5>
    <div v-if="this.order.cart[2].other.length > 0">

        <table class="table table-bordered text-center">
            <thead>
                <th>Tên</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th v-if="this.isEditing == true">Thao tác</th>
            </thead>
            <tbody>
                <tr v-for="(  item, index  ) in   this.order.cart[2].other  " :key="index">

                    <td>{{ item.other_name }}</td>
                    <td><v-img :src="getImage(item)" cover height="100px"></v-img></td>
                    <td>{{ item.price }}</td>
                    <td v-if="this.isEditing == true">
                        <button class="btn btn-danger" @click="removeOtherInOrder(item._id)">
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

    </div>
    <div v-else class="text-center">
        <br>
        <p> <i>Không có</i></p>

    </div>
    <div v-if="this.isEditing == true" class="row text-right">
        <button @click="addOtherToMenu()" class="mb-4 btn btn-primary  offset-md-11">
            <i class="fas fa-add"></i> </button>
    </div>
    <div class="row">
        <div class="offset-md-11">
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

import { VImg } from "vuetify/lib/components/index.mjs";

export default {
    components: {
        VImg

    },
    props: {
        order: {},

    },
    data() {
        return {

            isEditing: false
        };
    },
    emits: ["openListFood", "openListOther", "openListDrink", "removeFoodInOrder", "updateDrink"],
    methods: {

        getImage(food) {
            return `http://localhost:3000/${food.image}`;
        },
        updateDrink(drinkId, quantity) {
            this.$emit("updateDrink", drinkId, quantity);
        },
        addFoodToMenu() {
            this.$emit("openListFood");

        },
        addDinkToMenu() {
            this.$emit("openListDrink");
        },
        addOtherToMenu() {
            this.$emit("openListOther");
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
        removeOtherInOrder(otherId) {
            this.$emit("removeOtherInOrder", otherId);

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
<style>
input {
    border: solid 1px black;
    width: 60px;
    margin-right: 10px;
    padding-left: 10px;
    text-align: center;
}
</style>
