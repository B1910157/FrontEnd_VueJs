<template>
    <Form @submit="submitChangePass" :validation-schema="userFormSchema">
        <div class="form-group">
            <label class="font-weight-bold" for="password_old">Mật khẩu cũ</label>
            <Field name="password_old" type="password" class="form-control" v-model="password_old" />
            <ErrorMessage name="password_old" class="error-feedback" />
        </div>
        <div class="form-group">
            <label class="font-weight-bold" for="password_new1">Mật khẩu mới</label>
            <Field name="password_new1" type="password" class="form-control" v-model="password_new1" />
            <ErrorMessage name="password_new1" class="error-feedback" />
        </div>
        <div class="form-group">
            <label class="font-weight-bold" for="password_new2">Nhập lại mật khẩu</label>
            <Field name="password_new2" type="password" class="form-control" v-model="password_new2" />
            <ErrorMessage name="password_new2" class="error-feedback" />
        </div>


        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>

        </div>
        <p class="text-danger">{{ this.message }}</p>
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
        message: ''
    },
    watch: {
        // password_old: {
        //     handler(newPasswordOld) {
        //         if (newPasswordOld === '') {
        //             this.message = '';
        //         }
        //     },
        //     deep: true,
        // },
        // message: {
        //     handler(newMess) {
        //         // Kiểm tra nếu `newMess` khác chuỗi trống thì không đặt lại `this.message`.
        //         if (newMess !== '') {
        //             this.message = newMess;
        //         }
        //     },
        //     deep: true,
        // },
    },
    emits: ["changePass"],
    // emits: ["update:activeIndex"],

    data() {
        const userFormSchema = yup.object().shape({
            password_old: yup
                .string()
                .required("Mật khẩu cũ không được trống."),
            password_new1: yup
                .string()
                .required("Mật khẩu không được trống.")
                .min(5, "Mật khẩu quá ngắn"),
            password_new2: yup
                .string()
                .required("Mật khẩu không được trống.")
                .oneOf([yup.ref("password_new1")], "Mật khẩu không trùng khớp"),



        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // info để liên kết với các input trên form
            // userLocal: this.info,
            userFormSchema,
            // message: ''
            // password_old,
            // password_new1,
            // password_new2
        };
    },
    methods: {
        submitChangePass() {
            this.$emit("changePass", this.password_old, this.password_new1);
        },

    },

};

</script>

<style scoped>
@import "@/assets/form.css";
</style>