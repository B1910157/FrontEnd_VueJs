
<template>
    <Form @submit="submitUpdateNameMenu" :validation-schema="menuNameFormSchema" enctype="multipart/form-data">

        <div class="form-group">

            <span v-if="this.isEditNameMenu == false">{{ this.menuName.menu_name }}</span>
            <Field v-else-if="this.isEditNameMenu == true" name="menu_name" type="text" class="form-control"
                v-model="this.menuName.menu_name" />

            <ErrorMessage name="menu_name" class="error-feedback" />
        </div>
        <div class="form-group">

            <button v-if="this.isEditNameMenu == true" type="submit" class="mt-2 badge badge-success"><i
                    class="fas fa-save"></i></button>
            <span v-if="this.isEditNameMenu == false" @click="editNameMenu()" class="mt-2 badge badge-warning">
                <i class="fas fa-edit"></i> </span>
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
    emits: ["submit:menuNameUpdate"],
    props: {
        menuName: { type: Object, required: true }
    },
    data() {
        const menuNameFormSchema = yup.object().shape({
            menu_name: yup
                .string()
            // .required("Tên phải có giá trị.")
        });
        return {
            menuNameLocal: this.menuName,
            menuNameFormSchema,
            isEditNameMenu: false,
        };
    },
    methods: {
        editNameMenu() {
            this.isEditNameMenu = true;

        },
        submitUpdateNameMenu() {
            const menu_id = this.menuName._id;
            const formData = new FormData();
            formData.append("menu_name", this.menuName.menu_name);

            this.$emit("submit:menuNameUpdate", menu_id, formData);
            this.isEditNameMenu = false;
        },
    },
    mounted() {


    }
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>