<template>
    <div class="col-12 row text-left p-3 bg-light">
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
                            <button>Đã chọn 1 dịch vụ khác</button>
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
                            <button>Đã chọn 1 dịch vụ khác</button>
                        </div>
                    </div>
                </v-card-actions>
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
            <div v-for="(food, index) in filteredFoods" :key="index" class="col-2 my-2">
                <v-card class="mx-auto">
                    <v-img :src="getImage(food)" cover height="100px"></v-img>
                    <v-card-title>
                        {{ food.food_name }}
                    </v-card-title>

                    <v-card-subtitle>
                        {{ formatCurrency(food.price) }}
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn color="orange-lighten-2" variant="tonal" v-if="checkChooseService()" @click="this.Auth ? addFoodToCartReal(service._id, food._id)
                            : addFoodToLocalCartReal(service._id, food)">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
        <hr>
        <div v-if="drinkOfService.length != 0">

            <div class="row justify-content-start container">
                <div class="col-12 text-center">ĐỒ UỐNG CỦA DỊCH VỤ</div>
                <div v-for="(other, index) in drinkOfService" :key="index" class="col-3 my-2">
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
        <hr>
        <div v-if="otherOfService.length > 0">
            <div class="row justify-content-start container">
                <div class="col-12 text-center">KHÁC</div>
                <div v-for="(other, index) in otherOfService" :key="index" class="col-3 my-2">
                    <v-card class="mx-auto">
                        <v-img :src="getImage(other)" cover height="100px"></v-img>
                        <v-card-title>
                            {{ other.other_name }}
                        </v-card-title>

                        <v-card-subtitle>
                            {{ formatCurrency(other.price) }}
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-btn color="orange-lighten-2" variant="tonal" v-if="checkChooseService()" @click="this.Auth ? addOtherToCartReal(service._id, other._id)
                                : addOtherToLocalCartReal(service._id, other)">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </div>
        </div>
        <hr>

        <div v-if="menuOfService.length > 0">
            <div class="row container">
                <div class="col-12 text-center">MENU CỦA DỊCH VỤ</div>
                <div v-for="(menu, index1) in menuOfService" :key="index1" class="col-4 mb-3">
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
                            <v-btn variant="tonal" color="orange-lighten-2" v-if="checkChooseService()" @click="this.Auth ? addMenuToCartReal(service._id, menu._id)
                                : addMenuToLocalCartReal(service._id, menu.list)">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AddDrinkToCart from '@/components/AddDrinkToCart.vue';
import { VBtn, VCard, VImg, VCardTitle, VCardSubtitle, VCardActions, VCardText } from "vuetify/lib/components/index.mjs";
import InputSearch from './InputSearch.vue';
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
        InputSearch
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


    },
    data() {
        return {
            cartReal: [],
            localCart: {},
            searchText: ""

        };
    },
    computed: {
        ...mapState(['Auth']),
        filteredFoods() {
            if (!this.searchText) {
                // Nếu searchText rỗng, hiển thị tất cả các món ăn
                return this.foodOfService;
            }
            // Lọc các món ăn dựa trên searchText
            return this.foodOfService.filter((food) =>
                food.food_name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },

    },
    methods: {

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


            }


        },
        async addOtherToCartReal(service_id, otherId) {
            if (this.Auth) {
                await this.addOtherToMenuCart({ service_id, otherId });
            }

        },
        async addMenuToCartReal(service_id, menuId) {
            if (this.Auth) {
                await this.addMenuToCart({ service_id, menuId });
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
        },

        async addOtherToLocalCartReal(service_id, otherObject) {
            await this.addOtherToLocalCart({ service_id, otherObject });
        },

        async addMenuToLocalCartReal(service_id, menuObject) {
            await this.addMenuToLocalCart({ service_id, menuObject });
        },

    },
    created() {
        this.getMenuCart();

    },
};
</script>
<style scoped>
.menu-list {
    max-height: 350px;
    height: 350px;

    overflow-y: auto;

}

.action {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
</style>