<template>
    <div class="col-12 row text-left p-2 container">
        <div class="col-6">
            <v-img :src="getImage(service)" cover class="rounded" height="269px"></v-img>
        </div>
        <div class="col-6">
            <v-card variant="tonal">
                <v-card-title>
                    {{ service.service_name }}
                </v-card-title>
                <v-card-text>
                    <strong>Email:</strong>
                    {{ service.email }} <br>
                    <strong>Địa chỉ:</strong>
                    {{ service.address }} <br>
                    <strong>Liên hệ:</strong>
                    {{ service.phone }} <br>
                    <strong>Khu vực hỗ trợ:</strong>
                    {{ service.support_area }} <br>
                    <strong>Loại tiệc hỗ trợ:</strong>
                    {{ service.support_party_type }} <br>
                </v-card-text>
                <v-card-actions>
                    <!-- TODO -->
                    <div v-if="this.Auth">
                        <div v-if="(!cart.service_id || cart.service_id == null)" class="bg-light">

                            <v-btn variant="tonal" @click="chooseService(this.service._id)" class="btn-success">Chọn dịch
                                vụ</v-btn>
                        </div>
                        <div v-else-if="cart.service_id == service._id" class="bg-light">
                            <v-btn @click="unChooseService()" variant="tonal" class="btn btn-danger">Hủy chọn</v-btn>
                        </div>
                        <div v-else-if="cart.service_id != service._id" class=" bg-light">
                            <button class="btn btn-primary" @click="chooseWithOtherService(this.service._id)">Đã chọn 1 dịch
                                vụ khác</button>
                        </div>


                    </div>

                    <div v-else-if="!this.Auth">
                        <div v-if="(this.localCart.service_id == null)" class="bg-light">
                            <!-- <button @click="chooseService(this.service._id)">Chọn (Chưa chọn dịch vụ nào)</button> -->
                            <v-btn variant="tonal" @click="chooseService(this.service._id)" class="btn-success">Chọn dịch
                                vụ</v-btn>
                        </div>
                        <div v-else-if="(this.localCart.service_id == service._id)" class="bg-light">
                            <!-- <button @click="unChooseService()">Bỏ chọn dịch vụ</button> -->
                            <v-btn @click="unChooseService()" variant="tonal" class="btn btn-danger">Hủy chọn</v-btn>
                        </div>
                        <div v-else-if="(this.localCart.service_id != service._id)" class="bg-light">
                            <button class="btn btn-primary" @click="chooseWithOtherService(this.service._id)"> Đã chọn 1
                                dịch vụ khác</button>
                        </div>
                    </div>



                    <!-- SAO ĐÁNH GIÁ -->


                </v-card-actions>
                <div class="ml-3">

                    <div class="row">
                        <p class="col-md-4 font-weight-bold">Đánh giá</p>
                        <div class="col-md-8 text-left rating">

                            <span :class="{ 'selected-star': index <= 4 }" v-for="index in [5, 4, 3, 2, 1]"
                                :key="index">&#9733;</span>
                        </div>
                    </div>


                </div>

            </v-card>
        </div>
    </div>
    <div class="container mt-2">
        <InputSearch v-model="searchText" />
    </div>

    <div>
        <hr>
        <div class="row justify-content-start container">
            <div class="col-12 text-center">MÓN ĂN CỦA DỊCH VỤ</div>

            <div class="col-12">
                <label for="categorySelect" class="mr-3 font-weight-bold"><i class="fa fa-filter" aria-hidden="true"></i>
                </label>
                <select class="w-25 custom-select" id="categorySelect" v-model="selectedCategory">
                    <option :value="null" disabled> Danh mục món ăn </option>
                    <option :value="null">Tất cả</option>
                    <option v-for="category in categories" :value="category._id">{{ category.food_category }}</option>
                </select>
            </div>
            <div v-if="paginatedFoods.length > 0" v-for="(food, index) in  paginatedFoods" :key="index" class="col-2 my-2">
                <v-card class="mx-auto">
                    <v-img :src="getImage(food)" cover height="100px"></v-img>
                    <v-card-title>
                        {{ food.food_name }}

                    </v-card-title>

                    <v-card-subtitle>
                        {{ formatCurrency(food.price) }}
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn color="blue" variant="tonal" v-if="checkChooseService()" @click="this.Auth ? addFoodToCartReal(service._id, food._id)
                            : addFoodToLocalCartReal(service._id, food)">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
            <div v-else class="col-12 text-center">
                <p class="text-secondary"><i class="fa fa-search" aria-hidden="true"></i> Không có kết quả</p>

            </div>
        </div>
        <div class="container row">
            <div class="col-12 text-center mt-3">
                <ul class="pagination">
                    <li class="page-item" v-for="page in totalPages" :key="page">
                        <a class="page-link" @click="setPage(page)" :class="{ 'current-page': currentPage === page }">{{
                            page }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <hr>
        <div v-if="drinkOfService.length != 0">

            <div class="row justify-content-start container">
                <div class="col-12 text-center">ĐỒ UỐNG CỦA DỊCH VỤ</div>
                <div v-for="(other, index) in paginatedDrink" :key="index" class="col-2 my-2">
                    <v-card class="mx-auto">
                        <v-img :src="getImage(other)" cover height="100px"></v-img>
                        <v-card-title>
                            {{ other.drink_name }}
                        </v-card-title>
                        <v-card-subtitle>
                            {{ formatCurrency(other.price) }}/{{ other.unit }}
                        </v-card-subtitle>
                        <v-card-actions>
                            <div v-if="checkChooseService()">
                                <AddDrinkToCart :drink="other" :service="this.service" @drinkAdded="onDrinkAdded" />
                            </div>
                        </v-card-actions>
                    </v-card>
                </div>
            </div>
        </div>
        <div class="container row">
            <div class="col-12 text-center mt-3">
                <ul class="pagination">
                    <li class="page-item" v-for="page in drinkTotalPages" :key="page">
                        <a class="page-link" @click="setDrinkPage(page)"
                            :class="{ 'current-page': drinkCurrentPage === page }">{{ page }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <hr>
        <div v-if="otherOfService.length > 0">
            <div class="row justify-content-start container">
                <div class="col-12 text-center">KHÁC</div>
                <div v-for="(other, index) in paginatedOther" :key="index" class="col-3 my-2">
                    <v-card class="mx-auto" style="height: 300px;">
                        <v-img :src="getImage(other)" cover height="100px"></v-img>
                        <v-card-title>
                            {{ other.other_name }}
                        </v-card-title>
                        <v-card-subtitle style="width: 230px; height: 100px;">
                            {{ formatCurrency(other.price) }}
                            <p class="description"> <b>Mô tả:</b> {{ limitDescription(other.description, 80) }}</p>
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-btn color="blue" variant="tonal" v-if="checkChooseService()" @click="this.Auth ? addOtherToCartReal(service._id, other._id)
                                : addOtherToLocalCartReal(service._id, other)">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </div>
        </div>
        <div class="container row">
            <div class="col-12 text-center mt-3">
                <ul class="pagination">
                    <li class="page-item" v-for="page in otherTotalPages" :key="page">
                        <a class="page-link" @click="setOtherPage(page)"
                            :class="{ 'current-page': otherCurrentPage === page }">{{ page }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <hr>

        <div v-if="menuOfService.length > 0">
            <div class="row justify-content-start container">
                <div class="col-12 text-center">MENU CỦA DỊCH VỤ</div>
                <div v-for="(menu, index1) in paginatedMenu" :key="index1" class="col-4 mb-3">
                    <v-card class="mx-auto" style="height: 100%;">
                        <v-card-title>
                            {{ menu.menu_name }}

                        </v-card-title>
                        <v-card-text class="menu-list">
                            <table class=" table">
                                <tr v-for="(food, i) in menu.list" :key="food.foodId">
                                    <td class="d-none d-md-block">
                                        <v-img :src="getImage(food)" cover height=" 30px" width="30px"></v-img>
                                    </td>
                                    <td>
                                        {{
                                            food.food_name
                                        }}
                                    </td>

                                    <td>
                                        {{ formatCurrency(food.price) }}
                                    </td>
                                </tr>

                            </table>

                        </v-card-text>
                        <v-card-actions class="action">
                            <v-btn variant="tonal" color="blue" v-if="checkChooseService()" @click="this.Auth ? addMenuToCartReal(service._id, menu._id)
                                : addMenuToLocalCartReal(service._id, menu.list)">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </div>
        </div>
        <div class="container row">
            <div class="col-12 text-center mt-3">
                <ul class="pagination">
                    <li class="page-item" v-for="page in menuTotalPages" :key="page">
                        <a class="page-link" @click="setMenuPage(page)"
                            :class="{ 'current-page': menuCurrentPage === page }">{{ page }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AddDrinkToCart from '@/components/AddDrinkToCart.vue';
import { VBtn, VCard, VImg, VSelect, VCardTitle, VCardSubtitle, VCardActions, VCardText } from "vuetify/lib/components/index.mjs";
import InputSearch from './InputSearch.vue';
import { useToast } from 'vue-toast-notification';
import foodCategory from "../services/food_category.service";
import { toast } from 'vue3-toastify';
export default {
    components: {
        AddDrinkToCart,
        VBtn,
        VCard,
        VImg,
        VCardSubtitle,
        VCardTitle,
        VCardActions,
        VCardText,
        InputSearch,
        VSelect
    },
    props: {
        service: { type: Object, required: true },
        menuOfService: {
            type: []

        },
        foodOfService: {
            type: []
        },
        drinkOfService: {
            type: []
        },
        otherOfService: {
            type: []
        },
        cart: {
            type: []
        },

        chooseService: Function,
        unChooseService: Function,
        chooseWithOtherService: Function


    },
    data() {
        return {
            cartReal: [],
            localCart: {},
            searchText: "",
            currentPage: 1, // Trang hiện tại
            pageSize: 12, // Kích thước trang
            otherCurrentPage: 1,
            otherPageSize: 8,
            menuCurrentPage: 1,
            menuPageSize: 3,
            drinkCurrentPage: 1,
            drinkPageSize: 12,
            selectedCategory: null,
            categories: []

        };
    },
    computed: {
        ...mapState(['Auth']),
        filteredFoods() {
            if (!this.searchText) {
                // Nếu không có searchText, hiển thị tất cả món ăn
                if (this.selectedCategory === null) {
                    return this.foodOfService;
                } else {
                    // Lọc món ăn dựa trên selectedCategory
                    return this.foodOfService.filter((food) => food.food_category === this.selectedCategory);
                }
            } else {
                // Lọc món ăn dựa trên searchText và selectedCategory (nếu có)
                const filteredBySearch = this.foodOfService.filter((food) =>
                    food.food_name.toLowerCase().includes(this.searchText.toLowerCase())
                );

                if (this.selectedCategory === null) {
                    return filteredBySearch;
                } else {
                    return filteredBySearch.filter((food) => food.food_category === this.selectedCategory);
                }
            }
        },
        // filteredFoods() {
        //     if (!this.searchText) {
        //         // Nếu searchText rỗng, hiển thị tất cả các món ăn
        //         return this.foodOfService;
        //     }
        //     // Lọc các món ăn dựa trên searchText
        //     return this.foodOfService.filter((food) =>
        //         food.food_name.toLowerCase().includes(this.searchText.toLowerCase())
        //     );
        // },
        paginatedOther() {
            const startIndex = (this.otherCurrentPage - 1) * this.otherPageSize;
            const endIndex = startIndex + this.otherPageSize;
            return this.otherOfService.slice(startIndex, endIndex);
        },
        otherTotalPages() {
            return Math.ceil(this.otherOfService.length / this.otherPageSize);
        },
        paginatedFoods() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.filteredFoods.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.filteredFoods.length / this.pageSize);
        },
        paginatedMenu() {
            const startIndex = (this.menuCurrentPage - 1) * this.menuPageSize;
            const endIndex = startIndex + this.menuPageSize;
            return this.menuOfService.slice(startIndex, endIndex);
        },
        menuTotalPages() {
            return Math.ceil(this.menuOfService.length / this.menuPageSize);
        },
        paginatedDrink() {
            const startIndex = (this.drinkCurrentPage - 1) * this.drinkPageSize;
            const endIndex = startIndex + this.drinkPageSize;
            return this.drinkOfService.slice(startIndex, endIndex);
        },
        drinkTotalPages() {
            return Math.ceil(this.drinkOfService.length / this.drinkPageSize);
        },


    },
    methods: {
        setMenuPage(page) {
            this.menuCurrentPage = page;
        },
        setDrinkPage(page) {
            this.drinkCurrentPage = page;
        },
        setOtherPage(page) {
            this.otherCurrentPage = page;
        },
        setPage(page) {
            this.currentPage = page;
        },
        limitDescription(description, limit) {
            console.log(description)
            if (description.length <= limit) {
                return description;
            }
            return description.slice(0, limit) + '...';
        },
        addSuccessToast() {
            toast.success('Thêm thành công', { autoClose: 1000 });
        },

        // addSuccessToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Thêm thành công!',
        //         type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 3000, // Thời gian hiển thị (milliseconds)
        //     });
        // },

        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },
        getImage(item) {
            return `http://localhost:3000/${item.image}`;
        },
        checkChooseService() {
            if (this.Auth && this.cart.service_id == this.service._id) {
                return true;

            } else if (!this.Auth) {
                const localCart = localStorage.getItem("localCart");
                if (localCart) {
                    this.localCart = JSON.parse(localCart);
                    if (this.localCart.service_id == this.service._id) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }


        },

        async addFoodToCartReal(service_id, foodId) {
            if (this.Auth) {
                await this.addFoodToMenuCart({ service_id, foodId });
                this.addSuccessToast();

            }
        },

        onDrinkAdded(quantity) {
            // console.log("Hello quanity", quantity)
            this.addSuccessToast();
        },
        async addOtherToCartReal(service_id, otherId) {
            if (this.Auth) {
                await this.addOtherToMenuCart({ service_id, otherId });
                this.addSuccessToast();
            }

        },
        async addMenuToCartReal(service_id, menuId) {
            if (this.Auth) {
                await this.addMenuToCart({ service_id, menuId });
                this.addSuccessToast();
            }


        },
        ...mapActions(['getCart', 'getLocalCart', 'addMenuToLocalCart',
            'addFoodToMenuCart', 'addMenuToCart', 'addOtherToMenuCart',
            'addFoodToLocalCart', 'addOtherToLocalCart']),
        async getMenuCart() {
            if (this.Auth) {
                this.cartReal = await this.getCart();
            }


        },



        async addFoodToLocalCartReal(service_id, foodObject) {
            await this.addFoodToLocalCart({ service_id, foodObject });
            this.addSuccessToast();
        },

        async addOtherToLocalCartReal(service_id, otherObject) {
            await this.addOtherToLocalCart({ service_id, otherObject });
            this.addSuccessToast();
        },

        async addMenuToLocalCartReal(service_id, menuObject) {
            await this.addMenuToLocalCart({ service_id, menuObject });
            this.addSuccessToast();
        },
        async getCategory() {
            this.categories = await foodCategory.getAll();
        }

    },
    created() {
        this.getMenuCart();
        this.getCategory();

    },
};
</script>
<style scoped>
.menu-list {
    max-height: 350px;
    height: 350px;

    overflow-y: auto;

}

.current-page {
    background-color: #007bff;
    /* Đặt màu nền cho trang hiện tại, ở đây là màu xanh dương */
    color: #fff;
    /* Đặt màu chữ cho trang hiện tại, ở đây là màu trắng */
}

.action {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.description {
    white-space: wrap;
}

.custom-select {
    border: 2px solid #333;
    /* Độ đậm của border */
    padding: 5px;
    /* Thêm padding để nội dung không bị che khuất bởi border */
    transition: border 0.3s ease;
    /* Hiệu ứng hover */
}

.custom-select:hover {
    border: 2px solid #007bff;
    /* Màu border khi hover */
}


.rating {
    unicode-bidi: bidi-override;
    direction: rtl;
}

.rating>span {
    display: inline-block;
    position: relative;
    width: 1.1em;
}

.rating>span:hover:before,
.rating>span:hover~span:before {
    content: "\2605";
    position: absolute;
}

.selected-star {
    color: gold;
    /* hoặc màu vàng khác tùy ý bạn chọn */
}
</style>