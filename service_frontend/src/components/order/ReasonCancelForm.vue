
<template>
    <Form class="bg-white rounded-lg pb-3" @submit="submitReasonCancel" :validation-schema="reasonFormSchema">
        <h4 class="text-primary text-center mb-5 pt-3">HỦY ĐƠN ĐẶT TIỆC</h4>
        <div class="form-group d-flex align-items-center">
            <div class="ml-1 input-group row">
                <div class="col-12">
                    <!-- <Field name="reason" type="text" class=" form-control" v-model="this.reason" /> -->
                    <!-- <ckeditor :editor="editor" v-model="this.reason" /> -->
                    <textarea style="height: 150px;" name="reason" class="form-control" placeholder="Nhập lý do ..."
                        v-model="this.reason"></textarea>
                    <!-- {{ this.reason }} -->
                </div>
            </div>

        </div>
        <div class="d-flex justify-content-end align-items-end mr-3">
            <button type="submit" class="btn btn-success"><i class="fa fa-paper-plane" aria-hidden="true"></i> Gửi</button>
        </div>

        <ErrorMessage name="reason" class="error-feedback" />
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { toast } from 'vue3-toastify';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        ckeditor: CKEditor.component,
    },
    emits: ["submit:reason"],
    props: {
        // orderId: '',
        value: String,
    },
    data() {
        const reasonFormSchema = yup.object().shape({
            // reason: yup
            //     .string()
            //     .required("Vui lòng nhập nội dung.")
        });
        return {
            reason: '',
            reasonFormSchema,
            editorData: this.value,
            editor: ClassicEditor,

        };
    },
    methods: {
        cancelToast() {
            toast.success('Hủy thành công', { autoClose: 3000 });
        },
        submitReasonCancel() {
            // const formData = new FormData();
            // console.log("this.re")
            // formData.append("reason", this.reason);
            console.log("this.", this.reason)
            this.cancelToast()
            this.$emit("submit:reason", this.reason);

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