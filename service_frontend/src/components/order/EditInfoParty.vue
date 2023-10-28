<template>
    <Form @submit="submitUpdateInfoParty" :validation-schema="orderFormSchema">
        <div class="row">
            <div class=" col-6">
                <div class="form-group">
                    <label for="fullname"><i class="fa-solid fa-user"></i> Họ tên</label>
                    <Field name="fullname" type="text" class="form-control text-left" v-model="orderLocal.fullname" />
                    <ErrorMessage name="fullname" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="phone"><i class="fa-solid fa-phone"></i> Số điện thoại</label>
                    <Field name="phone" type="text" class="form-control text-left" v-model="orderLocal.phone" />
                    <ErrorMessage name="phone" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="email"><i class="fa-solid fa-envelope"></i> Email</label>
                    <Field name="email" type="text" class="form-control text-left" v-model="orderLocal.email" />
                    <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="address_book" class="font-weight-bold"><i class="fa-solid fa-location-dot"></i> Địa
                        chỉ </label>
                    <textarea name="address_book" class="form-control text-left" placeholder="Địa chỉ..."
                        v-model="orderLocal.address"></textarea>
                    <ErrorMessage name="address_book" class="error-feedback" />
                </div>
                <div class="form-group">
                    <div class="form-group ml-3">
                        <label class="font-weight-bold">Phụ thu</label>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nội dung</th>
                                    <th>Giá tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(surcharges, index) in surcharges" :key="index">
                                    <td>
                                        <input type="text" class="form-control text-left" required
                                            v-model="surcharges.key" />
                                        <div v-if="!isValid(surcharges.key)" class="error-feedback">Chưa nhập nội dung.
                                        </div>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-left" required
                                            v-model="surcharges.value" />
                                        <div v-if="!isValid(surcharges.value)" class="error-feedback">Chưa nhập giá.</div>
                                    </td>
                                    <td>
                                        <button class="btn btn-danger" @click="confirmRemoveSurcharges(index)"><i
                                                class="fa-solid fa-x"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" @click="addSurcharges" class="btn btn-outline-primary m-1">Thêm phụ
                            thu</button>
                    </div>

                </div>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <label for="tray_quantity"><i class="fa-solid fa-tablet"></i> Số lượng bàn</label>
                    <Field name="tray_quantity" type="number" class="form-control text-left"
                        v-model="orderLocal.tray_quantity" />
                    <ErrorMessage name="tray_quantity" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="event_date"><i class="fa-solid fa-calendar-check"></i> Ngày diễn ra</label>
                    <Field name="event_date" type="date" class="form-control text-left" v-model="orderLocal.event_date" />
                    <ErrorMessage name="event_date" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="event_time"><i class="fa-solid fa-clock"></i> Giờ diễn ra</label>
                    <Field name="event_time" type="time" class="form-control text-left" v-model="orderLocal.event_time" />
                    <ErrorMessage name="event_time" class="error-feedback" />
                </div>
                <div class="form-group">
                    <!-- <label for="total_temp" class="text-left"><i class="fa-solid fa-dollar-sign"></i> Tổng tiền tạm tính
                    </label> -->
                    <div class="font-weight-bold text-left pt-3">
                        <i class="fa-solid fa-dollar-sign"></i> Tổng tiền tạm tính: <i class="font-weight-bold ">{{
                            formatCurrency(((this.orderLocal.cart[0].totalMenu) *
                                (this.orderLocal.tray_quantity)) +
                                (this.orderLocal.cart[1].totalDrink + (this.orderLocal.cart[2].totalOther)))
                        }}
                        </i>
                    </div>
                </div>


                <!-- <div class="form-group">
                    <label for="note" class="font-weight-bold"><i class="fa-solid fa-bookmark"></i> Ghi chú </label>
                    <textarea name="note" class="form-control" placeholder="Ghi chú..."
                        v-model="orderLocal.note"></textarea>
                    <ErrorMessage name="note" class="error-feedback" />
                </div> -->


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
            <button @click="this.shouldCallSubmit = true" type="submit" class="btn btn-primary"> <i class="fa fa-save"></i>
                Lưu
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import getProvincesOpenAPI from "../../services/getProvincesOpenAPI";
import { VBtn, VSelect } from "vuetify/lib/components/index.mjs";
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
    props: {
        order: {}
    },
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
                .min(5, "Chỉ phục vụ từ 10 bàn")
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
        const defaultSurcharge = {
            key: '',
            value: ''
        };
        return {

            // provinces: [],
            // districts: [],
            // wards: [],
            // provinceName: "",
            // districtName: "",
            // wardName: "",


            orderLocal: this.order,
            surcharges: (this.order && this.order.surcharges) ? this.order.surcharges : [defaultSurcharge],
            // areaLocal: {
            //     province: "",
            //     district: "",
            //     ward: ""
            // },
            shouldCallSubmit: false,

            orderFormSchema,

        };
    },




    // watch: {
    //     'areaLocal.province': {
    //         handler: 'getDistrict',
    //         deep: true,
    //     },
    //     'areaLocal.district': {
    //         handler: 'getWard',
    //         deep: true,
    //     },
    //     'areaLocal.ward': {
    //         handler: 'getWardName',
    //         deep: true,
    //     },
    // },
    // mounted() {
    //     this.getProvince();
    // },
    watch: {
        surcharges: {
            deep: true,
            handler() {
                this.hasEmptySurcharges;
                // this.errorSub = this.hasEmptySubDescriptions;
                // console.log(this.errorSub)
            },
        },
    },
    computed: {
        hasEmptySurcharges() {
            if (Array.isArray(this.surcharges) && this.surcharges.length > 0) {
                const check = this.surcharges.some((sub) => sub.key === '' || sub.value === '');
                console.log(check);
                return check;
            }
            return false;
        }
    },

    methods: {
        confirmRemoveSurcharges(index) {
            const result = window.confirm("Bạn có chắc chắn muốn xóa phụ thu này?");
            if (result) {
                this.removeSurcharges(index);
            }
        },

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
        addSurcharges() {
            this.surcharges.push({
                key: '',
                value: ''
            })
        },
        removeSurcharges(index) {
            this.surcharges.splice(index, 1);
        },
        isValid(value) {
            console.log("aloo tyep key", typeof value);
            if (typeof value === 'string') {
                return value.trim() !== '';
            } else {
                return false;
            }
        },

        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },

        submitUpdateInfoParty() {
            if (this.shouldCallSubmit) {
                if (!this.order.surcharges) {
                    this.order.surcharges = this.surcharges;
                }
                // console.log("orderlocal", this.orderLocal);
                this.$emit("submit:order", this.orderLocal);
            }
        },


    },
    created() {
        this.orderLocal = this.order;
    }
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
