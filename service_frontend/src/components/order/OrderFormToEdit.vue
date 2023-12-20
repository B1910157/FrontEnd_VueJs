<template>
    <div class=" full-background p-2"  v-if="this.order.cart[0].menu.length > 0">
        <div class="row ">
            <div class="col-md-2"></div>
            <div class="col-md-8 col-12 my-3">
                <div class="card">
                    <div class="card-body">
                        <div>
                            <h5 class="text-center">Thực đơn</h5>
                            <table class="table ">
                                <template v-for="(foods, categoryId) in sortedFoodByCategory" :key="categoryId">
                                    <tr v-if="foods.length > 0" :key="categoryId">
                                        <th>{{ getCategoryName(categoryId) }}</th>
                                        <table class="table ">
                                            <tr v-for="(item, index) in foods" :key="index">
                                                <td style="width: 25%;">{{ item.food_name }} </td>
                                                <td style="width: 25%;"><v-img :src="getImage(item)" cover
                                                        style="width: 90px; height: 70px;"></v-img>
                                                </td>
                                                <td style="width: 25%;">{{ item.price }}</td>
                                                <td style="width: 25%;" v-if="this.isEditing == true">
                                                    <button class="btn btn-danger" @click="removeFoodInOrder(item._id)"> <i
                                                            class="fa fa-trash"></i></button>
                                                </td>
                                            </tr>

                                        </table>
                                    </tr>

                                </template>
                                <tr>
                                    <td class="text-center" colspan="4">
                                        Tổng tiền Menu: {{ formatCurrency(this.order.cart[0].totalMenu) }}
                                    </td>
                                </tr>
                            </table>



                            <!-- <table class="table text-center">
                                <thead>
                                    <th>Tên món</th>
                                    <th>Hình ảnh</th>
                                    <th>Giá</th>
                                    <th v-if="this.isEditing == true">Thao tác</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in this.order.cart[0].menu" :key="index">
                                        <td>{{ item.food_name }}</td>
                                        <td><v-img :src="getImage(item)" cover style="width: 90px; height: 70px;"></v-img>
                                        </td>
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
                            </table> -->
                            <div v-if="this.isEditing == true" class="row text-right">
                                <button @click="addFoodToMenu()" class="mb-4  btn btn-primary offset-md-11">
                                    <i class="fas fa-add"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
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
                                                <div style="display: flex; align-items: center;">
                                                    <input class="input-order" type="number" name="quantity"
                                                        v-model="item.quantity" min="1"
                                                        style="width: 80px; margin-right: 5px;">
                                                    /{{ item.unit }}
                                                </div>

                                            </td>
                                            <td v-if="this.isEditing == false">

                                                {{ item.quantity + " " + item.unit }}
                                            </td>
                                            <td>{{ item.price }}</td>

                                            <td v-if="this.isEditing == true">
                                                <button class="btn btn-warning"
                                                    @click="updateDrink(item._id, item.quantity)">
                                                    <i class="fa fa-pencil"></i>
                                                </button>
                                                <button class="btn btn-danger " @click="removeDrinkInOrder(item._id)">
                                                    <i class="fa fa-trash"></i>
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
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">

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
                                        <td><v-img :src="getImage(item)" cover style="height: 70px; width: 90px;"></v-img>
                                        </td>
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
                    </div>
                </div>

            </div>
            <!-- <div class="col-6">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScDjAIzji-MCXnfLhrkcfRdb9XaRD7CCImR8qwP3wQ6SUiURo3YcxYy5rV7xSTyPs3VX4&usqp=CAU"
                    class="rounded float-start" cover alt="...">
            </div> -->

        </div>

        <div class="row">
            <div class="offset-md-11">
                <span
                    v-if="this.order && (this.order.status != 2 && this.order.status != 3) && this.isEditing == false && isCurrentDateGreaterThanEventDate()"
                    @click="editOrder()" class="mt-2 btn btn-warning">
                    <i class="fas fa-edit"></i> </span>
                <div v-else-if="this.isEditing == true">
                    <span @click="saveOrder()" class="mt-2 btn btn-danger">
                        <i class="fas fa-close"></i> </span>
                </div>

            </div>
            <div class="col-12">
                <div class="text-danger border" v-if="!isCurrentDateGreaterThanEventDate()">
                    Hết thời gian chỉnh sửa (Chỉnh sửa trước ngày diễn ra 2 ngày )
                </div>
            </div>
        </div>
    </div>
    <hr>



    <br> <br>
</template>
<script>

import { VImg } from "vuetify/lib/components/index.mjs";
import foodCategoryService from "../../services/foodCategory.service";
import { toast } from 'vue3-toastify';
export default {
    components: {
        VImg

    },
    props: {
        order: {},

    },
    data() {
        return {

            isEditing: false,
            categories: []
        };
    },
    emits: ["openListFood", "openListOther", "openListDrink", "removeFoodInOrder", "updateDrink"],
    methods: {
        getCategoryName(categoryId) {
            const category = this.categories.find(cat => cat._id === categoryId);
            return category ? category.food_category : "Unknown Category";
        },
        async getCategory() {
            try {
                this.categories = await foodCategoryService.getAll();

                this.categories.forEach(category => {
                    switch (category._id) {
                        case '64c77355547b60b327d40aa0': //khai vị
                            category.position = 1;
                            break;
                        case '64c77349547b60b327d40a9f': // món chính
                            category.position = 2;
                            break;
                        case '64c77364547b60b327d40aa1': //lẩu
                            category.position = 3;
                            break;
                        case '64c0a81c55b96a29607b7f1d':
                            category.position = 4; //tráng miệng
                            break;

                        default:
                            category.position = 5;
                            break;
                    }
                });


            } catch (error) {

            }

        },
        isCurrentDateGreaterThanEventDate() {
            // Lấy ngày hiện tại
            // console.log("HELOO")
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
            return currentDate < futureDate;
        },
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



    },
    computed: {
        sortedFoodByCategory() {
            const sortedFoods = {};
            const sortedCategories = this.categories.slice().sort((a, b) => a.position - b.position);
            // Tạo object rỗng cho mỗi danh mục thức ăn
            sortedCategories.forEach(category => {
                sortedFoods[category._id] = [];
            });

            // Phân loại các món ăn vào từng danh mục thức ăn
            this.order.cart[0].menu.forEach(food => {
                const categoryId = food.food_category;

                if (sortedFoods[categoryId]) {
                    sortedFoods[categoryId].push(food);
                }
            });

            return sortedFoods;
        },
    },
    created() {
        this.getCategory();
    }
};

</script>
<style>
.input-order {
    border: solid 1px black;

    margin-right: 10px;
    padding-left: 10px;

}

.full-background {
    background-image: url('https://m.media-amazon.com/images/I/91AOPv2q-NL.jpg');

    background-position: center;

    background-repeat: repeat;

}
</style>
