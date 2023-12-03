<template>
    <div class="contact" id="contact">
        <Form @submit="submitFeedBack" :validation-schema="feedbackFormSchema">
            <div class="row">
                <img class="col-md-12 col-12" style="height:280px; "
                    src="https://quantrinhahang.edu.vn/wp-content/uploads/2019/04/feedback-la-gi.jpg">
            </div>
            <div class="form-group">
                <label for="content" class="font-weight-bold">Nội dung góp ý của bạn</label>
                <textarea cols="30" rows="10" minlength="5" name="content" class="form-control w-100"
                    v-model="feedbackLocal.content" placeholder="Nhập nội dung góp ý..."></textarea>
                <ErrorMessage name="content" class="error-feedback" />
            </div>


            <div class="form-group">
                <button class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i> Gửi</button>
            </div>
        </Form>


    </div>
</template>


  
<script>
import * as yup from "yup";
import { Form, ErrorMessage } from "vee-validate";
import { toast } from 'vue3-toastify';
export default {
    components: {
        Form,
        ErrorMessage,
    },
    emits: ["submit:feedback"],
    data() {

        const feedbackFormSchema = yup.object().shape({
            content: yup.string()
            // .required("Nội dung góp ý không được để trống."),
        });

        return {
          
            feedbackLocal: {
                content: "",
            },
            feedbackFormSchema,
        };
    },
    methods: {
        feedBackSuccessToast() {
            toast.success('Gửi góp ý thành công', { autoClose: 1000 });
        },
        feedBackErrorToast() {
            toast.error('Vui lòng nhập nội dung', { autoClose: 1000 });
        },
        submitFeedBack() {

            if (this.feedbackLocal.content) {
                this.$emit("submit:feedback", this.feedbackLocal);
                this.feedBackSuccessToast();
                this.feedbackLocal = "";
            }
            else {
                this.feedBackErrorToast()
            }

        },
    },
};
</script>
  
<style scoped>
@import "@/assets/form.css";


.contact form {
    text-align: center;
    padding: 2rem;
    border: .1rem solid rgba(0, 0, 0, .3);
}

.contact form .inputBox {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.contact form .inputBox input,
.contact form textarea {
    padding: 1rem;
    /* font-size: 1.7rem; */
    background: #f7f7f7;
    text-transform: none;
    margin: 1rem 0;
    border: .1rem solid rgba(0, 0, 0, .3);
    width: 49%;
}

.contact form textarea {
    height: 10rem;
    resize: none;
    width: 100%;
}
</style>
  