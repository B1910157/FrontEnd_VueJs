
<template>
    <div class="row container text-center">
        <div class="col-md-6 col-12">

            <div class="card shadow-lg">
                <div class="card-body">
                    <h2>Menu</h2>
                    <table class="table table-bordered text-center">
                        <thead>
                            <th width="20%">Hình ảnh</th>
                            <th>Tên món</th>
                            <th>Giá</th>
                            <th>Thao tác</th>
                        </thead>
                        <tbody
                            v-if="(!this.Auth && localCart.items[0].menu.length == 0) || (this.Auth && this.cartData.items[0].menu.length == 0)">
                            <tr>
                                <td colspan="4"><u><i>Trống</i></u></td>
                            </tr>
                        </tbody>
                        <tbody v-if="this.Auth">
                            <tr v-for="(item, index) in this.cartData.items[0].menu" :key="index">
                                <td> <img :src="getImage(item)" alt="" class="w-100 h-100"></td>
                                <td>{{ item.food_name }}</td>
                                <td>{{ formatCurrency(item.price) }}</td>
                                <td>
                                    <button class="btn btn-danger" @click="removeFoodInCartReal(item.service_id, item._id)">
                                        <i class="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    Tổng tiền Menu: {{ formatCurrency(this.cartData.items[0].totalMenu) }}
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if="!this.Auth">
                            <tr v-for="(item, index) in this.localCart.items[0].menu" :key="index">
                                <td> <img :src="getImage(item)" alt="" class="w-100 h-100"></td>
                                <td>{{ item.food_name }}</td>
                                <td>{{ item.price }}</td>
                                <td>
                                    <button class="btn btn-danger" @click="removeFoodInLocalCart(item._id)"> <i
                                            class="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    Tổng tiền Menu: {{ formatCurrency(this.localCart.items[0].totalMenu) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">

                <div class="col-md-6 form-group">
                    <label for="tray_quantity" class="text-left"><i class="fa-solid fa-tablet"></i> Số lượng bàn</label>
                    <Field name="tray_quantity" type="number" class="form-control" v-model="orderLocal.tray_quantity" />
                    <ErrorMessage name="tray_quantity" class="error-feedback" />
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="total_temp" class="text-left"><i class="fa-solid fa-dollar-sign"></i> Tổng tiền tạm tính
                        </label>

                        <div class="font-weight-bold text-left pt-2">
                            <i class="font-weight-bold ">{{
                                formatCurrency(((this.orderLocal.cart.items[0].totalMenu) *
                                    (this.orderLocal.tray_quantity)) +
                                    (this.orderLocal.cart.items[1].totalDrink + (this.orderLocal.cart.items[2].totalOther)))
                            }}
                            </i>
                        </div>


                    </div>
                </div>
            </div>

        </div>


        <div class="col-md-6 col-12">
            <div class="card shadow-lg">
                <div class="card-body" style="font-size: 14px;">
                    <h2>Đồ uống</h2>
                    <div>
                        <table class="table table-bordered text-center">
                            <thead>
                                <th width="20%">Hình ảnh</th>
                                <th>Tên món</th>
                                <th style="width: 25%;">Số lượng</th>
                                <th>Giá</th>
                                <th style="width: 20%;">Thao tác</th>
                            </thead>
                            <tbody
                                v-if="(!this.Auth && localCart.items[1].drink.length == 0) || (this.Auth && this.cartData.items[1].drink.length == 0)">
                                <tr>
                                    <td colspan="5">
                                        <u><i>Trống</i></u>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-if="this.Auth">
                                <tr v-for="(item, index) in this.cartData.items[1].drink" :key="index">
                                    <td> <img :src="getImage(item)" alt="" class="w-100 h-100"></td>
                                    <td>{{ item.drink_name }}</td>
                                    <td>
                                        <input type="number" name="quantity" v-model="item.quantity" min="1"
                                            class="input-small">
                                        /{{ item.unit }}
                                    </td>
                                    <td>{{ formatCurrency(item.price) }}</td>

                                    <td>
                                        <button class="btn btn-warning"
                                            @click="updateDrink(item.service_id, item._id, item.quantity)">
                                            <i class="fa fa-pencil"></i>
                                        </button>
                                        <button class="btn btn-danger mt-2"
                                            @click="deleteDrinkReal(item.service_id, item._id)">
                                            <i class="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="5">
                                        Tổng tiền Đồ uống: {{ formatCurrency(this.cartData.items[1].totalDrink) }}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-if="!this.Auth && localCart.items[1].drink.length != 0">
                                <tr v-for="(item, index) in this.localCart.items[1].drink" :key="index">
                                    <td> <img :src="getImage(item)" alt="" class="w-100 h-100"></td>
                                    <td>{{ item.drink_name }}</td>
                                    <td>
                                        <input type="number" name="quantity" v-model="item.quantity" min="1"
                                            class="input-small">
                                        /{{ item.unit }}
                                    </td>
                                    <td>{{ item.price }}</td>
                                    <td><button class="btn btn-warning mr-1"
                                            @click="updateDrinkLocalCart(this.localCart.service_id, item, item.quantity)">
                                            <i class="fa fa-pencil"></i>
                                        </button>
                                        <button class="btn btn-danger" @click="removeDrinkInLocalCart(item._id)"> <i
                                                class="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="5">
                                        Tổng tiền Đồ uống: {{ formatCurrency(this.localCart.items[1].totalDrink) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </div>

        <div class="mt-2 col-md-12"
            v-if="(!this.Auth && localCart.items[2].other.length != 0) || (this.Auth && this.cartData.items[2].other.length > 0)">
            <div>
                <div class="card">
                    <div class="card-body">
                        <h2>Khác</h2>
                        <table class="table table-bordered text-center">
                            <thead>
                                <th width="20%">Hình ảnh</th>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>Mô tả</th>
                                <th>Thao tác</th>
                            </thead>
                            <tbody v-if="this.Auth">
                                <tr v-for="(item, index) in this.cartData.items[2].other" :key="index">
                                    <td> <img :src="getImage(item)" alt="" class="w-100 h-100"></td>
                                    <td>{{ item.other_name }}</td>
                                    <td>{{ formatCurrency(item.price) }}</td>
                                    <td>{{ item.description }}</td>
                                    <td>
                                        <button class="btn btn-danger" @click="removeOtherInLocalCart(item._id)"> <i
                                                class="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        Tổng tiền Khác: {{ formatCurrency(this.cartData.items[2].totalOther) }}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-if="!this.Auth">
                                <tr v-for="(item, index) in this.localCart.items[2].other" :key="index">
                                    <td> <img :src="getImage(item)" alt="" class="w-100 h-100"></td>
                                    <td>{{ item.other_name }}</td>
                                    <td>{{ formatCurrency(item.price) }}</td>
                                    <td>
                                        <button class="btn btn-danger" @click="removeOtherInLocalCart(item._id)"> <i
                                                class="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        Tổng tiền Khác: {{ formatCurrency(this.localCart.items[2].totalOther) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>

        <br>
        <hr>

        <div class="container text-start">
            <h2 class=" text-center">Thông tin</h2>
            <Form @submit="submitOrder" :validation-schema="orderFormSchema">
                <div class="row">
                    <div class=" col-6">
                        <Field name="cart" type="hidden" class="form-control" v-model="orderLocal.cart" />

                        <div class="form-group">
                            <label for="fullname"><i class="fa-solid fa-user"></i> Họ tên</label>
                            <Field name="fullname" type="text" class="form-control" v-model="orderLocal.fullname" />
                            <ErrorMessage name="fullname" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="phone"><i class="fa-solid fa-phone"></i> Số điện thoại</label>
                            <Field name="phone" type="text" class="form-control" v-model="orderLocal.phone" />
                            <ErrorMessage name="phone" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="email"><i class="fa-solid fa-envelope"></i> Email</label>
                            <Field name="email" type="text" class="form-control" v-model="orderLocal.email" />
                            <ErrorMessage name="email" class="error-feedback" />
                        </div>
                        <div class="form-group" hidden>
                            <label for="tray_quantity"><i class="fa-solid fa-tablet"></i> Số lượng bàn</label>
                            <Field name="tray_quantity" type="number" class="form-control"
                                v-model="orderLocal.tray_quantity" />
                            <ErrorMessage name="tray_quantity" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="event_date"><i class="fa-solid fa-calendar-check"></i> Ngày diễn ra</label>
                            <Field name="event_date" type="date" class="form-control" v-model="orderLocal.event_date" />
                            <ErrorMessage name="event_date" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="event_time"><i class="fa-solid fa-clock"></i> Giờ diễn ra</label>
                            <Field name="event_time" type="time" class="form-control" v-model="orderLocal.event_time" />
                            <ErrorMessage name="event_time" class="error-feedback" />
                        </div>
                        <div class="form-group" hidden>
                            <label for="total_temp" class=""> </label>

                            <div class="font-weight-bold"><i class="fa-solid fa-dollar-sign"></i> Tổng tiền tạm tính: <i
                                    class="font-weight-bold">{{
                                        formatCurrency(((this.orderLocal.cart.items[0].totalMenu) *
                                            (this.orderLocal.tray_quantity)) +
                                            (this.orderLocal.cart.items[1].totalDrink + (this.orderLocal.cart.items[2].totalOther)))
                                    }}
                                </i>
                            </div>
                            <hr>

                        </div>


                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="province" class="font-weight-bold"><i class="fa-solid fa-location-dot"></i>
                                Tỉnh/Thành phố</label>
                            <select name="province" class="form-control" v-model="areaLocal.province">
                                <!-- <option value="" disabled selected>Chọn tỉnh/thành phố</option> -->
                                <option v-for="province in provinces" :value="province">{{ province.name }}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="district" class="font-weight-bold"><i class="fa-solid fa-location-dot"></i>
                                Quận/Huyện</label>
                            <select name="district" class="form-control" v-model="areaLocal.district">
                                <!-- <option value="" disabled selected>Chọn quận/huyện</option> -->
                                <option v-for="district in districts" :value="district">{{ district.name }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="ward" class="font-weight-bold"><i class="fa-solid fa-location-dot"></i>
                                Xã/Phường/Thị Trấn</label>
                            <select name="ward" class="form-control" v-model="areaLocal.ward">
                                <!-- <option value="" disabled selected>Chọn Xã/Phường/Thị Trấn</option> -->
                                <option v-for="ward in wards" :value="ward">{{ ward.name }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="address_book" class="font-weight-bold"><i class="fa-solid fa-location-dot"></i> Địa
                                chỉ </label>
                            <textarea name="address_book" class="form-control" placeholder="Địa chỉ..."
                                v-model="orderLocal.address_book"></textarea>
                            <ErrorMessage name="address_book" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="note" class="font-weight-bold"><i class="fa-solid fa-bookmark"></i> Ghi chú </label>
                            <textarea name="note" class="form-control" placeholder="Ghi chú..."
                                v-model="orderLocal.note"></textarea>
                            <ErrorMessage name="note" class="error-feedback" />
                        </div>


                        <!-- <div class="form-group">
                        <label class="font-weight-bold"> Thanh toán </label>
                        <div class="row">
                            <div class="col-6 row">
                                <div class="col-6 ">
                                    <input class="" type="radio" name="percentPayment" value="0.2"
                                        v-model="orderLocal.percentPayment" />
                                    <label class=""> 20%</label>
                                </div>
                                <div class="col-6">
                                    <input type="radio" name="percentPayment" value="1"
                                        v-model="orderLocal.percentPayment" />
                                    <label> 100%</label>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    </div>

                    <!-- <div class="form-group col-12">
                    <label class="font-weight-bold"> Phương thức thanh toán </label>
                    <div>
                        <input type="radio" id="paymentVnPay" name="payment" value="vnpay" v-model="orderLocal.payment" />
                        <label for="paymentVnPay">Thanh toán qua VN Pay</label>
                    </div>
                    <div>
                        <input type="radio" id="paymentPayLater" name="payment" value="paylater"
                            v-model="orderLocal.payment" />
                        <label for="paymentPayLater">Thanh toán trực tiếp</label>
                    </div>
                </div> -->
                    <!-- {{ console.log(orderLocal.payment) }} -->

                </div>
                <div class="form-group text-center col-12">
                    <button type="submit" class="btn btn-primary"> <i class="fa-regular fa-paper-plane"></i> Đặt
                        tiệc</button>
                </div>
            </Form>
        </div>

    </div>
</template>

<script >
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapState, mapMutations, mapActions } from "vuex";
import MenuService from "../services/menu.service";
import ProvinceService from "../services/getProvinces";
import getProvincesOpenAPI from "../services/getProvincesOpenAPI";
import infoService from "../services/info.service";
import { object } from "yup";
import { VBtn, VSelect } from "vuetify/lib/components/index.mjs";
import { useToast } from 'vue-toast-notification';
import { toast } from 'vue3-toastify';


import moment from 'moment';
import 'moment/locale/vi';

export default {
    components: {
        VBtn,
        VSelect,
        Form,
        Field,
        ErrorMessage,

    },
    emits: ["submit:order"],

    data() {
        const orderFormSchema = yup.object().shape({


            fullname: yup.string()
                .required("Vui lòng điền họ và tên của bạn")
            ,

            email: yup.string()
                .email("Email không hợp lệ")
                .required("Vui lòng nhập email"),
            // address_book: yup.string()
            //     .required("Vui lòng cung cấp địa chỉ")
            // ,
            phone: yup.string()
                .matches(/^\d{10}$/, "Số điện thoại không hợp lệ")
                .required("Vui lòng nhập số điện thoại"),
            event_date: yup.date()
                .typeError("Vui lòng chọn ngày diễn ra")
                .test('is-greater-than-now', 'Vui lòng đặt trước 3 ngày', function (value) {
                    if (!value) return true;
                    const currentDate = moment();
                    const selectedDate = moment(value, 'MM/DD/YYYY');
                    const minDate = moment(currentDate).add(3, 'days');
                    return selectedDate.isAfter(minDate);
                })
                .required("Vui lòng chọn ngày diễn ra")
            ,
            tray_quantity: yup.number()
                .typeError("Vui lòng nhập số lượng bàn")
                .min(5, "Chỉ phục vụ từ 5 bàn")
                .required("Vui lòng nhập số lượng bàn"),

            event_time: yup.string()
                .typeError("Vui lòng  chọn giờ diễn ra")
                .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Giờ diễn ra không hợp lệ")
                .required("Vui lòng chọn giờ diễn ra"),
            // province: yup.string()
            // .typeError("Vui lòng chọn tỉnh thành")
            // .required("Vui lòng chọn tỉnh thành"),
            // address_book: yup.string()
            //     .typeError("Vui lòng cung cấp địa chỉ")
            //     .required("Vui lòng cung cấp địa chỉ"),
        });
        return {
            cartOrder: {},
            info: object,
            provinces: [],
            districts: [],
            wards: [],

            //name truyen vao 
            provinceName: "",
            districtName: "",
            wardName: "",
            // hamlet: "",

            orderLocal: {
                event_date: "",
                event_time: "",
                tray_quantity: 5,
                cart: this.cartOrder,
                note: "",
                fullname: "",
                phone: "",
                email: "",
                user_id: null,
                provinceName: "",
                districtName: "",
                wardName: "",
                address_book: "",
                // percentPayment: 0.2
                // payment: "vnpay"
            },
            areaLocal: {
                province: "",
                district: "",
                ward: ""
            },

            orderFormSchema,

        };
    },


    computed: {
        ...mapState(["Auth", "cartFood", "cartDrink", "cartOther", "localCart", "cartData"]),

    },

    created() {
        if (!this.Auth) {
            this.getLocalCart();

        } else if (this.Auth) {
            this.getCart();
            this.getDrinkInCart();
            this.getItemsInDrinkCart();
            this.getOtherInCart();
        }
        this.getCartToOrder();
        this.retrieveInfo();


    },
    watch: {
        'areaLocal.province': {
            handler: 'getDistrict',
            deep: true,
        },
        'areaLocal.district': {
            handler: 'getWard',
            deep: true,
        },
        'areaLocal.ward': {
            handler: 'getWardName',
            deep: true,
        },
    },
    mounted() {
        this.getProvince();
    },

    methods: {
        checkMenuInOrderToast() {
            toast.error('Vui lòng chọn món trước khi đặt', { autoClose: 1000 });
        },
        // checkMenuInOrderToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Vui lòng chọn món trước khi đặt',
        //         type: 'error', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 3000, // Thời gian hiển thị (milliseconds)
        //     });
        // },


        async getProvince() {
            try {
                // this.provinces = await ProvinceService.getProvinces(this.provinceName);
                this.provinces = await getProvincesOpenAPI.getAllProvinces();

            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        },
        async getDistrict() {
            try {

                this.areaLocal.district = "";
                // this.districts = await ProvinceService.getDistricts(this.areaLocal.province.code, this.districtName);

                const rs = await getProvincesOpenAPI.getProvince(this.areaLocal.province.code);
                this.districts = rs.districts;
                this.orderLocal.provinceName = await this.areaLocal.province.name;


            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        },
        async getWard() {
            try {
                this.areaLocal.ward = "";
                // this.wards = await ProvinceService.getWards(this.areaLocal.district.code, this.wardName);
                const rs = await getProvincesOpenAPI.getDistrict(this.areaLocal.district.code);
                this.wards = rs.wards;
                this.orderLocal.districtName = await this.areaLocal.district.name;


            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        },
        async getWardName() {
            try {
                this.orderLocal.wardName = await this.areaLocal.ward.name;

            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        },

        async retrieveInfo() {
            try {
                if (this.Auth) {
                    this.info = await infoService.info();
                    this.orderLocal.fullname = this.info.fullname;
                    this.orderLocal.email = this.info.email;
                    this.orderLocal.phone = this.info.phone;
                    this.orderLocal.user_id = this.info._id;
                } else {
                    this.info = null;
                }

            } catch (error) {
                console.log(error);
            }
        },
        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },
        async getCartToOrder() {
            if (!this.Auth) {
                // this.cartOrder = await this.getLocalCart();
                this.cartOrder = this.localCart;

            } else if (this.Auth) {
                this.cartOrder = this.cartData;
            }

            this.orderLocal.cart = this.cartOrder;

        },

        submitOrder() {
            if ((!this.Auth && this.localCart.items[0].menu.length > 0) || (this.Auth && this.cartData.items[0].menu.length > 0)) {
                this.$emit("submit:order", this.orderLocal);
            } else {
                this.checkMenuInOrderToast();
            }


        },
        getImage(item) {
            return `http://localhost:3000/${item.image}`;
        },
        ...mapActions(['getCart', 'getLocalCart', 'removeFoodInCart', 'removeOtherInCart', 'getDrinkInCart', 'getItemsInDrinkCart', 'getOtherInCart']),
        ...mapActions(['addDrinkToCartReal', 'addDrinkToLocalCart']),


        async updateDrink(service_id, drinkId, quantity) {
            await this.addDrinkToCartReal({ service_id, drinkId, quantity });
            this.editDrinkSuccessToast();
        },
        async deleteDrinkReal(service_id, drinkId) {
            try {
                if (confirm("Xác nhận xóa?")) {
                    await MenuService.deleteDrink(service_id, drinkId);
                    this.getItemsInDrinkCart();
                    this.removeSuccessToast();
                }

            } catch (error) {

                console.log(error);
            }

        },
        async removeFoodInCartReal(service_id, foodId) {
            await this.removeFoodInCart({ service_id, foodId });
            this.removeSuccessToast();
        },
        async removeOtherInCartReal(service_id, otherId) {
            await this.removeOtherInCart({ service_id, otherId });
            this.removeSuccessToast();
        },
        calculateTotal(localCart) {
            let totalMenu = 0;
            for (const item of localCart.items[0].menu) {
                totalMenu += item.price;
            }
            return totalMenu;
        },
        calculateOtherTotal(localCart) {
            let totalOther = 0;
            for (const item of localCart.items[2].other) {
                totalOther += item.price;
            }
            return totalOther;
        },
        calculateDrinkTotal(localCart) {
            let totalDrink = 0;
            for (const item of localCart.items[1].drink) {
                totalDrink += item.price * item.quantity;
            }
            return totalDrink;
        },


        removeFoodInLocalCart(foodId) {
            if (window.confirm('Bạn có chắc chắn muốn xóa món này khỏi menu?')) {
                const updatedMenu = this.localCart.items[0].menu.filter((food) => food._id !== foodId);
                this.localCart.items[0].menu = updatedMenu;
                this.localCart.items[0].totalMenu = this.calculateTotal(this.localCart);
                localStorage.setItem('localCart', JSON.stringify(this.localCart));
                this.removeSuccessToast();
            }
        },
        removeOtherInLocalCart(otherId) {
            if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ khác này?')) {
                const updatedMenu = this.localCart.items[2].other.filter((other) => other._id !== otherId);
                this.localCart.items[2].other = updatedMenu;
                this.localCart.items[2].totalOther = this.calculateOtherTotal(this.localCart);
                localStorage.setItem('localCart', JSON.stringify(this.localCart));
                this.removeSuccessToast();
            }
        },
        removeDrinkInLocalCart(drinkId) {
            if (window.confirm('Bạn có chắc chắn muốn xóa món này khỏi menu?')) {
                const updatedMenu = this.localCart.items[1].drink.filter((drink) => drink._id !== drinkId);
                this.localCart.items[1].drink = updatedMenu;
                this.localCart.items[1].totalDrink = this.calculateDrinkTotal(this.localCart);
                localStorage.setItem('localCart', JSON.stringify(this.localCart));
                this.removeSuccessToast();
            }
        },

        async updateDrinkLocalCart(service_id, drinkObject, quantity) {

            await this.addDrinkToLocalCart({ service_id, drinkObject, quantity });
            this.editDrinkSuccessToast();
        },

        editDrinkSuccessToast() {
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        },
        removeSuccessToast() {
            toast.success('Xóa thành công', { autoClose: 1000 });
        },

    },


};
</script>
<style scoped>
@import "@/assets/form.css";

.input-small {
    width: 55px;
    text-align: center;
    border: solid 1px black;
}
</style>
