
<template>
    <div class="container">
        <div class="scrollable-list">
            <v-card-text>
                <table class="table ">
                    <template v-for="(foods, categoryId) in sortedFoodByCategory" :key="categoryId">
                        <tr v-if="foods.length > 0" :key="categoryId">
                            <th>{{ getCategoryName(categoryId) }}</th>
                            <table class="table ">
                                <tr v-for="food in foods" :key="food.foodId">

                                    <td class="d-none d-md-block" style="width: 60px;">
                                        <v-img :src="getImage(food)" cover height="30px" width="30px"></v-img>
                                    </td>
                                    <td style="width: 100px;">
                                        {{
                                            food.food_name
                                        }}
                                    </td>

                                    <td style="width: 90px;">
                                        {{ formatCurrency(food.price) }}
                                    </td>
                                    <td style="width: 30px;">
                                        <span v-if="this.isEditing == true" @click="removeFoodInMenu(food._id)"
                                            class="mt-2 badge badge-danger" style="font-size: 16px;">
                                            <i class="fas fa-trash"></i> </span>
                                    </td>
                                </tr>
                            </table>
                        </tr>
                    </template>
                </table>

            </v-card-text>
        </div>
        <div class="action">
            <v-card-actions>
                <div v-if="this.isEditing == false" class="row">
                    <div class="col-6">
                        <span @click="editMenu()" class="badge badge-warning" style="font-size: 16px;">
                            <i class="fas fa-edit"></i> </span>
                    </div>
                    <div class="col-6 ">
                        <div v-if="menu.status == 0">
                            <span @click="publishMenu1(menu._id)" class=" badge badge-success" style="font-size: 16px;">
                                <i class="fa fa-power-off" aria-hidden="true"></i> </span>
                        </div>
                        <div v-else-if="menu.status == 1">
                            <span @click="hiddenMenu1(menu._id)" class=" badge badge-danger" style="font-size: 16px;">
                                <i class="fa fa-power-off" aria-hidden="true"></i> </span>

                        </div>
                    </div>



                </div>

                <div v-else-if="this.isEditing == true">
                    <span @click="addFoodToMenu()" class="mt-3 badge badge-primary" style="font-size: 16px;">
                        <i class="fas fa-add"></i> </span>

                    <span @click="delMenu(this.menu._id)" class="mt-3 ml-3 badge badge-danger" style="font-size: 16px;">
                        <i class="fas fa-trash"></i> </span>

                    <span @click="saveMenu()" class="mt-3 ml-3 badge badge-danger" style="font-size: 16px;">
                        <i class="fas fa-close"></i> </span>
                </div>
            </v-card-actions>
            <!-- {{ console.log(sortedFoodByCategory) }} -->
        </div>
    </div>
</template>
<script>

import { VBtn, VImg, VCardText, VCardActions } from "vuetify/lib/components/index.mjs";
import MenuService from "../../services/menu.service";
import foodCategoryService from "../../services/foodCategory.service";
import { useConfirm } from "primevue/useconfirm";


export default {
    components: {
        VCardText,
        VImg,
        VBtn,
        VCardActions,

    },
    emits: ["submit:menuUpdate", "saveAddFood", "removeFoodInMenu", "delMenu", "publishMenu", "hiddenMenu"],
    props: {
        menu: []
    },
    computed: {
        sortedFoodByCategory() {
            const sortedFoods = {};
            const sortedCategories = this.categories.slice().sort((a, b) => a.position - b.position);

            sortedCategories.forEach(category => {
                sortedFoods[category._id] = [];
            });


            this.menu.list.forEach(food => {
                const categoryId = food.food_category;

                if (sortedFoods[categoryId]) {
                    sortedFoods[categoryId].push(food);
                }
            });

            return sortedFoods;
        },
    },
    data() {

        return {
            // menuLocal: this.foodList,
            isEditing: false,
            categories: [],

        };
    },
    emits: ["addFood"],
    methods: {
        getCategoryName(categoryId) {
            const category = this.categories.find(cat => cat._id === categoryId);
            return category ? category.food_category : "Unknown Category";
        },
        editMenu() {
            this.isEditing = true;

        },
        saveMenu() {
            this.isEditing = false;
            this.$emit("saveAddFood");

        },
        delMenu(menuId) {
            if (confirm("Bạn muốn menu này?")) {
                try {
                    this.$emit("delMenu", menuId);
                    this.isEditing = false;
                } catch (error) {
                    console.log(error);
                }
            }


        },
        publishMenu1(menuId) {
            if (confirm("Bạn muốn hiển thị menu này trên website?")) {
                try {
                    this.$emit("publishMenu", menuId);

                } catch (error) {
                    console.log(error);
                }

            }

        },
        hiddenMenu1(menuId) {
            if (confirm("Bạn muốn ẩn menu này trên website?")) {
                try {
                    this.$emit("hiddenMenu", menuId);

                } catch (error) {
                    console.log(error);
                }

            }



        },



        async getCategory() {
            try {
                this.categories = await foodCategoryService.getAll();
                this.categories.forEach(category => {
                    switch (category._id) {
                        case '64c77355547b60b327d40aa0': //khai vị
                            category.position = 1;
                            break;
                        case '64c77349547b60b327d40a9f': // món chính
                            category.position = 2;
                            break;
                        case '64c77364547b60b327d40aa1': //lẩu
                            category.position = 3;
                            break;
                        case '64c0a81c55b96a29607b7f1d':
                            category.position = 4; //tráng miệng
                            break;
                        // Các loại món ăn khác và gán vị trí tương ứng
                        default:
                            category.position = 5; // Điều chỉnh vị trí cho các loại món ăn khác
                            break;
                    }
                });

                console.log("category nè", this.categories);
            } catch (error) {

            }

        },
        async removeFoodInMenu(foodId) {
            if (confirm("Bạn muốn xóa món này khỏi menu?")) {
                try {
                    await MenuService.removeFoodInMenu(this.menu._id, foodId);
                    this.$emit("removeFoodInMenu");
                } catch (error) {
                    console.log(error);
                }
            }


        },
        addFoodToMenu() {
            const menu_id = this.menu._id;

            this.$emit("addFood", menu_id);
        },
        getImage(food) {
            return `http://localhost:3000/${food.image}`;
        },

        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },


    },
    created() {
        this.getCategory();

    },
    mounted() {


    }
};
</script>
<style scoped>
.scrollable-list {
    max-height: 370px;

    overflow-y: auto;
}

.action {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
</style>