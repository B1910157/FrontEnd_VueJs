<template>
    <div class="container">
        <div class="row ml-3 mb-3">
            <h4 class="col-5 text-secondary">
                Loại món
            </h4>
            <div class="col-7 row text-right">
                <div class="col-12">
                    <button class="btn btn-sm btn-primary" @click="this.isAdd = true">
                        <i class="fas fa-plus"></i> Thêm
                    </button>
                </div>
            </div>

        </div>

        <div class="container ">

            <FoodCategory :categories="filterCategories" @delete:cate="deleteCate" @edit:cate="editCate" />

        </div>

    </div>
    <v-dialog v-model="this.isAdd" max-width="800px">

        <v-btn color="danger" @click="isAdd = false" icon="fa fa-close" class="ml-auto mb-3"><i
                class="fa fa-close"></i></v-btn>

        <div class="rounded-lg">
            <addCateForm @submit:addCate="addCate" />
        </div>
        <!-- <ListFoodToAdd :foodNotInMenu="this.listFood" @addFoodToMenu="addFoodToMenu" /> -->
    </v-dialog>
</template>
<script>

import { VBtn, VDialog } from "vuetify/lib/components/index.mjs";

import FoodCategory from "@/components/category/FoodCategory.vue";
import categoryService from "../../services/categoryService.service";
import addCateForm from "./addCate.vue";
import adminService from "../../services/user.service";
import { toast } from 'vue3-toastify';

export default {
    components: {
        FoodCategory,
        VDialog,
        VBtn,
        addCateForm

    },
    data() {
        return {
            categories: [],
            isAdd: false


        };
    },

    computed: {


        filterCategories() {

            return this.categories;
        },



    },
    methods: {
        async addCate(data) {
            try {

                const data1 = {
                    food_category: data
                }
                const rs = await categoryService.create(data1);

                this.addSuccessToast();
                this.refreshList();
                this.isAdd = false;

            } catch (error) {
                console.log(error);
            }
        },
        delSuccessToast() {
            toast.success('Xóa thành công', { autoClose: 1000 });
        },
        editSuccessToast() {
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        },
        addSuccessToast() {
            toast.success('Thêm thành công', { autoClose: 1000 });
        },
        async deleteCate(id) {
            try {
                const rs = await categoryService.delete(id);
                this.delSuccessToast();
                this.refreshList();
            } catch (error) {

            }
        },
        async editCate(id, data) {
            try {
                await categoryService.update(id, data);
                this.editSuccessToast();
                this.refreshList();
            } catch (error) {

            }
        },

        async retrieveCategories() {
            try {
                this.categories = await categoryService.findAll();

            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveCategories();
        },

    },
    mounted() {
        this.refreshList();


    },

};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>