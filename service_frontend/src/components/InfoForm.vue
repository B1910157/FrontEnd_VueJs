<template>
    <Form @submit="submitUpdate" :validation-schema="userFormSchema">
        <div class="form-group">
            <label for="service_name">Tên dịch vụ</label>
            <Field name="service_name" type="text" class="form-control" v-model="info.service_name" />
            <ErrorMessage name="service_name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="info.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="info.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="info.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="support_area">Khu vực hỗ trợ</label>
            <Field name="support_area" type="text" class="form-control" v-model="info.support_area" />
            <ErrorMessage name="support_area" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="support_party_type">Loại tiệc phục vụ</label>
            <Field name="support_party_type" type="text" class="form-control" v-model="info.support_party_type" />
            <ErrorMessage name="support_party_type" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>

        </div>
    </Form>
</template>


<script>
import { array, object } from 'yup';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        info: { type: object, default: [] },
    },
    emits: ["updateInfo"],
    // emits: ["update:activeIndex"],

    data() {
        const userFormSchema = yup.object().shape({
            service_name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            support_area: yup
                .string()
                .required("Không được để trống.")
            ,
            support_party_type: yup
                .string()
                .required("Không được để trống.")
            ,
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // info để liên kết với các input trên form
            // userLocal: this.info,
            userFormSchema,
        };
    },
    methods: {
        submitUpdate() {
            this.$emit("updateInfo", this.info);
        },
        // updateActiveIndex(index) {
        //     this.$emit("update:activeIndex", index);
        // }
    },
};

</script>

<style scoped>
@import "@/assets/form.css";
</style>