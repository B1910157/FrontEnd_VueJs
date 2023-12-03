<template>
    <Form @submit="submitRegister" :validation-schema="RegisterFormSchema">
        <div class="form-columns">
            <div class="form-column">
                <div class="form-group">
                    <label for="service_name" class="font-weight-bold">Tên dịch vụ <b class="text-danger">*</b></label>
                    <Field name="service_name" type="text" class="form-control" v-model="RegisterLocal.service_name" />

                    <ErrorMessage name="service_name" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="email" class="font-weight-bold">Email <b class="text-danger">*</b></label>
                    <Field name="email" type="text" class="form-control" v-model="RegisterLocal.email" />

                    <ErrorMessage name="email" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="phone" class="font-weight-bold">Số điện thoại <b class="text-danger">*</b></label>
                    <Field name="phone" type="text" class="form-control" v-model="RegisterLocal.phone" />

                    <ErrorMessage name="phone" class="error-feedback" />
                </div>
            </div>
            <div class="form-column">
                <div class="form-group">
                    <label class="font-weight-bold" for="province">Tỉnh/Thành phố <b class="text-danger">*</b></label>
                    <Field as="select" name="province" class="form-control" v-model="areaLocal.province">
                        <!-- <option value="" disabled selected>Chọn tỉnh/thành phố</option> -->
                        <option v-for="province in provinces" :value="province.code">{{ province.name }}</option>
                    </Field>
                    <ErrorMessage name="province" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label class="font-weight-bold" for="district">Quận/Huyện <b class="text-danger">*</b></label>
                    <Field as="select" name="district" class="form-control" v-model="areaLocal.district">
                        <!-- <option value="" disabled selected>Chọn quận/huyện</option> -->
                        <option v-for="district in districts" :value="district.code">{{ district.name }}</option>
                    </Field>
                    <ErrorMessage name="district" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="ward">Xã/Phường/Thị Trấn <b class="text-danger">*</b></label>
                    <Field as="select" name="ward" class="form-control" v-model="areaLocal.ward">
                        <!-- <option value="" disabled selected>Chọn Xã/Phường/Thị Trấn</option> -->
                        <option v-for="ward in wards" :value="ward.name">{{ ward.name }}</option>
                    </Field>
                    <ErrorMessage name="ward" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="address" class="font-weight-bold">Địa chỉ <b class="text-danger">*</b></label>
                    <Field as="textarea" name="address" class="form-control" v-model="RegisterLocal.address_detail" />

                    <ErrorMessage name="address" class="error-feedback" />
                </div>
            </div>
        </div>
        <p><i class="text-danger">{{ this.message }}</i></p>
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
    props: {
        message: ''
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
            address: yup.string()
                .required("Vui lòng cung cấp địa chỉ")
            ,
            province: yup.string()
                .required("Vui lòng chọn tỉnh/thành phố")
            ,
            district: yup.string()
                .required("Vui lòng chọn quận/huyện")
            ,
            ward: yup.string()
                .required("Vui lòng chọn phường/xã/thị trấn")
            ,
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

                const rs = await getProvincesOpenAPI.getProvince(this.areaLocal.province);
                this.districts = rs.districts;
                this.RegisterLocal.provinceName = rs.name;


            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        },
        async getWard() {
            try {
                this.areaLocal.ward = "";
                // this.wards = await ProvinceService.getWards(this.areaLocal.district.code, this.wardName);
                const rs = await getProvincesOpenAPI.getDistrict(this.areaLocal.district);
                this.wards = rs.wards;
                this.RegisterLocal.districtName = rs.name;


            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        },
        async getWardName() {
            try {
                this.RegisterLocal.wardName = await this.areaLocal.ward;

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

.form-columns {
    display: flex;
}

.form-column {
    flex: 1;
    margin-right: 20px;
    /* Khoảng cách giữa 2 cột */
}
</style>
  