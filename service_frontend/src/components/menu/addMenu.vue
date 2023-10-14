
<template>
    <Form @submit="submitAddMenu" :validation-schema="menuNameFormSchema" enctype="multipart/form-data">


        <div class="form-group ">
            <h2 class="text-white text-center col-12 title-in-page">Thêm menu mới</h2>
            <Field name="menu_name" type="text" class="form-control" v-model="this.menuNameLocal.menu_name"
                placeholder="Nhập vào tên menu" />
            <ErrorMessage name="menu_name" class="error-feedback" />
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-primary offset-md-11 ">Thêm</button>

        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:addNewMenu"],

    data() {
        const menuNameFormSchema = yup.object().shape({
            menu_name: yup
                .string()
                .required("Tên phải có giá trị.")

        });
        return {
            menuNameLocal: {},
            menuNameFormSchema,

        };
    },
    methods: {

        submitAddMenu() {
            const formData = new FormData();
            formData.append("menu_name", this.menuNameLocal.menu_name);
            this.$emit("submit:addNewMenu", formData);

        },
    },

};
</script>
<style scoped>
@import "@/assets/form.css";
</style>