
<template>
    <Form @submit="submitDrink" :validation-schema="drinkFormSchema" enctype="multipart/form-data">
        <div class="form-group">
            <label class="font-weight-bold" for="drink_name">Tên món </label>
            <Field name="drink_name" type="text" class="form-control" v-model="drinkLocal.drink_name" />
            <ErrorMessage name="drink_name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label class="font-weight-bold" for="price">Giá </label>
            <Field name="price" type="text" class="form-control" v-model="drinkLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label class="font-weight-bold" for="unit">Đơn vị tính </label>
            <Field name="unit" type="text" class="form-control" v-model="drinkLocal.unit" />
            <ErrorMessage name="unit" class="error-feedback" />
        </div>

        <!-- Todo nhé -->
        <div>
            <div v-if="this.drink.image && !editImage && drinkLocal._id">
                <img :src="getImage(this.drink)" alt="" class="w-25 h-25">
                <button class="ml-3 btn btn-primary" @click="toggleEditImage">Thay đổi ảnh</button>
            </div>
            <div class="form-group" v-else-if="this.drink.image && editImage">
                <label class="font-weight-bold" for="image">Hình ảnh </label>
                <Field name="image" type="file" class="form-control" v-model="drinkLocal.image"
                    @change="handleImageChange" />
                <ErrorMessage name="image" class="error-feedback" />
                <button class="mt-2 btn btn-danger" @click="toggleEditImage">Hủy</button>
            </div>

            <div class="form-group" v-else>
                <label class="font-weight-bold" for="image">Hình ảnh </label>
                <Field name="image" type="file" class="form-control" v-model="drinkLocal.image"
                    @change="handleImageChange" />
                <ErrorMessage name="image" class="error-feedback" />
            </div>
        </div>
        <div class="form-group mt-3">

            <button type="submit" class="btn btn-primary">Lưu</button>

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
    emits: ["submit:drink", "delete:drink"],
    props: {
        drink: { type: Object, required: true }
    },
    data() {
        const drinkFormSchema = yup.object().shape({
            drink_name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),

            price: yup.string()

                .required("Vui lòng nhập giá"),
            unit: yup.string()

                .required("Vui lòng nhập đơn vị tính")



        });
        return {
            editImage: false,
            drinkLocal: this.drink,
            drinkFormSchema,

        };
    },
    methods: {
        toggleEditImage() {
            this.editImage = !this.editImage;
        },

        submitDrink() {
            if (this.editImage) {
                // Call API to update image
            }
            const formData = new FormData();
            formData.append("drink_name", this.drinkLocal.drink_name);
            formData.append("unit", this.drinkLocal.unit);
            formData.append("price", this.drinkLocal.price);
            if (this.drinkLocal.image) {
                formData.append("image", this.drinkLocal.image);
            }

            this.$emit("submit:drink", formData);



        },
        // deleteDrink() {
        //     this.$emit("delete:drink", this.drinkLocal.id);
        // },
        handleImageChange(event) {
            this.drinkLocal.image = event.target.files[0];
            console.log('Selected image:', this.drinkLocal.image);
        },
        getImage(drink) {
            return `http://localhost:3000/${drink.image}`;
        },

    },

};
</script>
<style scoped>
@import "@/assets/form.css";
</style>