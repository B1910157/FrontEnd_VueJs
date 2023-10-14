
<template>
    <Form @submit="submitFood" :validation-schema="foodFormSchema" enctype="multipart/form-data">
        <div class="form-group">
            <label class="font-weight-bold" for="food_name">Tên món </label>
            <Field name="food_name" type="text" class="form-control" v-model="foodLocal.food_name" />
            <ErrorMessage name="food_name" class="error-feedback" />
        </div>

        <div class="form-group ">
            <label class="font-weight-bold" for="category">Phân loại</label>
            <Field v-slot="{ value }" name="category" as="select" class="form-select custom-select "
                v-model="foodLocal.food_category">
                <option value="" disabled>--Chọn--</option>
                <option v-for="category in categories" :key="category" :value="category._id"
                    :selected="value && value.includes(category)">{{ category.food_category }}</option>
            </Field>
            <ErrorMessage name="category" class="error-feedback" />
        </div>
        <div class="form-group">
            <label class="font-weight-bold" for="price">Giá </label>
            <Field name="price" type="text" class="form-control" v-model="foodLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>

        <!-- Todo nhé -->
        <div>
            <div v-if="this.food.image && !editImage && foodLocal._id">
                <img :src="getImage(this.food)" alt="" class="w-25 h-25">
                <button class="ml-3 btn btn-primary" @click="toggleEditImage">Thay đổi ảnh</button>
            </div>
            <div class="form-group" v-else-if="this.food.image && editImage">
                <label class="font-weight-bold" for="image">Hình ảnh </label>
                <Field name="image" type="file" class="form-control" v-model="foodLocal.image"
                    @change="handleImageChange" />
                <ErrorMessage name="image" class="error-feedback" />
                <button class="mt-2 btn btn-danger" @click="toggleEditImage">Hủy</button>
            </div>

            <div class="form-group" v-else>
                <label class="font-weight-bold" for="image">Hình ảnh </label>
                <Field name="image" type="file" class="form-control" v-model="foodLocal.image"
                    @change="handleImageChange" />
                <ErrorMessage name="image" class="error-feedback" />
            </div>
        </div>
        <div class="form-group mt-3">
            <button type="submit" class="btn btn-primary">Lưu</button>
            <!-- <button v-if="foodLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteFood">
                Xóa
            </button> -->
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import FoodCategory from "../../services/foodCategory.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:food", "delete:food"],
    props: {
        food: { type: Object, required: true }
    },
    data() {
        const foodFormSchema = yup.object().shape({
            food_name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            category: yup
                .string()
                .required("Loại món không được rỗng"),

            price: yup.string()

                .required("Vui lòng nhập giá")



        });
        return {
            editImage: false,
            foodLocal: this.food,
            foodFormSchema,
            categories: [],
        };
    },
    methods: {
        toggleEditImage() {
            this.editImage = !this.editImage;
        },
        async getCategory() {
            try {
                this.categories = await FoodCategory.getAll();
                console.log(this.categories)
            } catch (error) {
                console.log(error);
            }


        },
        submitFood() {
            if (this.editImage) {
                // Call API to update image
            }
            const formData = new FormData();
            formData.append("food_name", this.foodLocal.food_name);
            formData.append("food_category", this.foodLocal.food_category);
            formData.append("price", this.foodLocal.price);
            if (this.foodLocal.image) {
                formData.append("image", this.foodLocal.image);
            }
            this.$emit("submit:food", formData);



        },
        // deleteFood() {
        //     this.$emit("delete:food", this.foodLocal.id);
        // },
        handleImageChange(event) {
            this.foodLocal.image = event.target.files[0];
            console.log('Selected image:', this.foodLocal.image);
        },
        getImage(food) {
            return `http://localhost:3000/${food.image}`;
        },

    },
    mounted() {
        this.getCategory();
        // this.hasEmptyArraySubDescription();
    }
};
</script>
<style scoped>
@import "@/assets/form.css";

.custom-select {
    width: 100%;
    /* Độ rộng mong muốn */
    /* Thêm các thuộc tính khác tùy theo nhu cầu của bạn */
}
</style>