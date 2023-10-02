
<template>
    <Form @submit="submitOther" :validation-schema="otherFormSchema" enctype="multipart/form-data">
        <div class="form-group">
            <label for="other_name">Tên </label>
            <Field name="other_name" type="text" class="form-control" v-model="otherLocal.other_name" />
            <ErrorMessage name="other_name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Giá </label>
            <Field name="price" type="text" class="form-control" v-model="otherLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description" class="font-weight-bold">Mô tả </label>
            <textarea name="description" class="form-control" placeholder="Mô tả..."
                v-model="otherLocal.description"></textarea>
            <ErrorMessage name="description" class="error-feedback" />
        </div>

        <!-- Todo nhé -->
        <div>
            <div v-if="this.other.image && !editImage && otherLocal._id">
                <img :src="getImage(this.other)" alt="" class="w-25 h-25">
                <button @click="toggleEditImage">Thay đổi ảnh</button>
            </div>
            <div class="form-group" v-else-if="this.other.image && editImage">
                <label for="image">Hình ảnh </label>
                <Field name="image" type="file" class="form-control" v-model="otherLocal.image"
                    @change="handleImageChange" />
                <ErrorMessage name="image" class="error-feedback" />
                <button @click="toggleEditImage">Hủy</button>
            </div>

            <div class="form-group" v-else>
                <label for="image">Hình ảnh </label>
                <Field name="image" type="file" class="form-control" v-model="otherLocal.image"
                    @change="handleImageChange" />
                <ErrorMessage name="image" class="error-feedback" />
            </div>

        </div>




        <div class="form-group">
            <!-- <button class="btn btn-primary">Lưu</button> -->
            <button type="submit" class="btn btn-primary">Submit</button>
            <button v-if="otherLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteOther">
                Xóa
            </button>
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
    emits: ["submit:other", "delete:other"],
    props: {
        other: { type: Object, required: true }
    },
    data() {
        const otherFormSchema = yup.object().shape({
            other_name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
            ,
            price: yup.string()

                .required("Vui lòng nhập giá")



        });
        return {
            editImage: false,
            otherLocal: this.other,
            otherFormSchema,

        };
    },
    methods: {
        toggleEditImage() {
            this.editImage = !this.editImage;
        },

        submitOther() {
            if (this.editImage) {
                // Call API to update image
            }
            const formData = new FormData();
            formData.append("other_name", this.otherLocal.other_name);
            formData.append("description", this.otherLocal.description);
            formData.append("price", this.otherLocal.price);
            if (this.otherLocal.image) {
                formData.append("image", this.otherLocal.image);
            }


            console.log(this.otherLocal)
            // console.log("form data", (formData));
            // console.log("Selected image:", this.otherLocal.image);
            this.$emit("submit:other", formData);



        },
        deleteOther() {
            this.$emit("delete:other", this.otherLocal.id);
        },
        handleImageChange(event) {
            this.otherLocal.image = event.target.files[0];
            console.log('Selected image:', this.otherLocal.image);
        },
        getImage(other) {
            return `http://localhost:3000/${other.image}`;
        },

    },
    mounted() {

        // this.hasEmptyArraySubDescription();
    }
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>