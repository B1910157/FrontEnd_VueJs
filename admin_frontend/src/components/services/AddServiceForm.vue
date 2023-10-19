<template>
    <!-- Form sử dụng thư viện VeeValidate để hiển thị validation error message và emit event khi submit -->
    <Form @submit="submitRegister" :validation-schema="RegisterFormSchema">
        <div class="form-group">
            <label for="service_name" class="font-weight-bold">Tên dịch vụ</label>
            <Field name="service_name" type="text" class="form-control" v-model="RegisterLocal.service_name" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="service_name" class="error-feedback" />
        </div>
        <!-- Tạo ra input field cho tên -->
        <div class="form-group">
            <label for="email" class="font-weight-bold">Email</label>
            <Field name="email" type="text" class="form-control" v-model="RegisterLocal.email" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="email" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="phone" class="font-weight-bold">Số điện thoại</label>
            <Field name="phone" type="text" class="form-control" v-model="RegisterLocal.phone" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="province">Tỉnh/Thành phố</label>
            <select name="province" class="form-control" v-model="areaLocal.province">
                <!-- <option value="" disabled selected>Chọn tỉnh/thành phố</option> -->
                <option v-for="province in provinces" :value="province">{{ province.name }}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="district">Quận/Huyện</label>
            <select name="district" class="form-control" v-model="areaLocal.district">
                <!-- <option value="" disabled selected>Chọn quận/huyện</option> -->
                <option v-for="district in districts" :value="district">{{ district.name }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="ward">Xã/Phường/Thị Trấn</label>
            <select name="ward" class="form-control" v-model="areaLocal.ward">
                <!-- <option value="" disabled selected>Chọn Xã/Phường/Thị Trấn</option> -->
                <option v-for="ward in wards" :value="ward">{{ ward.name }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="address" class="font-weight-bold">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="RegisterLocal.address_detail" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <!-- Tạo ra input field cho password -->

        <!-- Tạo ra input field cho passwordConfirmation -->

        <!-- Tạo ra nút submit form -->
        <div class="form-group">
            <button class="btn btn-primary">Thêm</button>
        </div>
    </Form>
</template>
  
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import getProvincesOpenAPI from "../../services/getProvincesOpenAPI";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:register"],
    data() {
        const RegisterFormSchema = yup.object().shape({


            service_name: yup.string()
                .required("Vui lòng điền tên dịch vụ")
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

        });
        return {

            provinces: [],
            districts: [],
            wards: [],

            //name truyen vao 
            provinceName: "",
            districtName: "",
            wardName: "",
            // hamlet: "",

            RegisterLocal: {
                service_name: "",
                phone: "",
                email: "",

                provinceName: "",
                districtName: "",
                wardName: "",
                address_detail: "",
                // percentPayment: 0.2
                // payment: "vnpay"
            },
            areaLocal: {
                province: "",
                district: "",
                ward: ""
            },

            RegisterFormSchema,

        };
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
        submitRegister() {
            this.$emit("submit:register", this.RegisterLocal);
        },
    },
};
</script>
  
<style scoped>
@import "@/assets/form.css";
</style>
  