
<template>
    <Form class="bg-white rounded-lg pb-3" @submit="submitAddCate" :validation-schema="cateFormSchema">
        <h4 class="text-primary text-center mb-5 pt-3">Loại món</h4>

        <div class="form-group d-flex align-items-center">
            <div class="ml-1 input-group row">
                <div class="col-12">
                    <Field name="cate" type="text" class=" form-control" v-model="this.category" />


                </div>
            </div>

        </div>
        <div class="d-flex justify-content-end align-items-end mr-3">
            <button type="submit" class="btn btn-success"><i class="fa fa-paper-plane" aria-hidden="true"></i> Gửi</button>
        </div>

        <ErrorMessage name="cate" class="error-feedback" />
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
    emits: ["submit:addCate"],

    data() {
        const cateFormSchema = yup.object().shape({
            cate: yup
                .string()
                .required("Vui lòng nhập loại món.")
        });
        return {

            cateFormSchema,
            category: ""


        };
    },
    methods: {

        submitAddCate() {
          
            this.$emit("submit:addCate", this.category);

        },
    },
    mounted() {


    }
};
</script>
<style scoped>
@import "@/assets/form.css";

.small-input {
    width: 150px;

}
</style>