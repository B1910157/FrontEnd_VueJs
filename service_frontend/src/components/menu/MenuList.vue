<script>
import { VBtn, VIcon, VTextField, VDialog, VCard, VImg, VCardTitle, VCardSubtitle, VCardActions, VCardText } from "vuetify/lib/components/index.mjs";
import MenuNameForm from "./MenuNameForm.vue";
import MenuService from "../../services/menu.service";
import FoodService from "../../services/food.service";
import FoodInMenuForm from "./FoodInMenuForm.vue";
import ListFoodToAdd from "./ListFoodToAdd.vue";
import { useToast } from 'vue-toast-notification';



export default {
    components: {
        VBtn,
        VCard,
        VImg,
        VCardSubtitle,
        VCardTitle,
        VCardActions,
        VCardText,
        MenuNameForm,
        FoodInMenuForm,
        ListFoodToAdd,
        VDialog,
        VIcon,
        VTextField

    },
    data() {
        return {
            // isEditing: false,
            // isEditNameMenu: false,
            listFood: [],
            idMenuToAdd: "",
            showListFood: false,
            searchText: "",
        };
    },
    emits: ["addFoodSuccess", "removeFoodInMenu", "delMenu"],
    props: {
        menus: { type: Array, default: [] },
        // activeIndex: { type: Number, default: -1 },
        // updateNameMenu: Function
    },
    computed: {
        filteredList() {
            return this.listFood.filter((food) =>
                food.food_name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
    },

    methods: {
        updateSuccessToast() {
            const VueToast = useToast();
            VueToast.open({
                message: 'Cập nhật thành công!',
                type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
                position: 'top-right', // Vị trí hiển thị toast
                duration: 5000, // Thời gian hiển thị (milliseconds)
            });
        },


        async updateNameMenu1(menu_id, data) {
            try {
                await MenuService.updateMenuName(menu_id, data);
                this.updateSuccessToast();

            } catch (error) {
                console.log(error);
            }
        },
        async openAddFood(menu_id) {
            try {
                this.showListFood = true;
                this.listFood = await MenuService.getFoodNotInMenu(menu_id);

                this.idMenuToAdd = menu_id;
            } catch (error) {
                console.log(error);
            }
        },
        async getFoodNotInMenu() {
            try {
                this.listFood = await MenuService.getFoodNotInMenu(this.idMenuToAdd);

            } catch (error) {
                console.log(error);
            }
        },

        async addFoodToMenu(foodId) {
            await MenuService.addFoodToMenu(this.idMenuToAdd, foodId);
            this.getFoodNotInMenu();
            this.$emit("addFoodSuccess");
        },
        saveAddFood() {
            this.showListFood = false;

        },
        removeFoodInMenu() {
            this.$emit("removeFoodInMenu");
            this.getFoodNotInMenu();

        },
        delMenu(menuId) {

            this.$emit("delMenu", menuId);
        }
    },

};

</script>
<template>
    <div class="row justify-content-start container">
        <div v-for="(menu, index1) in menus" :key="menu._id" class="col-6 mt-3">
            <v-card class="mx-auto" style="height: 550px;">
                <v-card-title class="text-center">
                    <div>
                        <MenuNameForm :menuName="menu" @submit:menuNameUpdate="updateNameMenu1" />
                    </div>
                </v-card-title>

                <FoodInMenuForm :menu="menu" @addFood="openAddFood" @saveAddFood="saveAddFood"
                    @removeFoodInMenu="removeFoodInMenu" @delMenu="delMenu" />


            </v-card>
        </div>
    </div>
    <div>
        <v-dialog v-model="this.showListFood" max-width="800px">

            <v-btn color="danger" @click="showListFood = false" icon="fa fa-close" class="ml-auto"></v-btn>
            <v-text-field v-model="searchText" label="Tìm kiếm món ăn" outlined class="bg-white ml-3"></v-text-field>
            <div class="scrollable-list">
                <ListFoodToAdd :foodNotInMenu="filteredList" @addFoodToMenu="addFoodToMenu" />
            </div>
            <!-- <ListFoodToAdd :foodNotInMenu="this.listFood" @addFoodToMenu="addFoodToMenu" /> -->
        </v-dialog>


    </div>
</template>
<style>
.scrollable-list {
    max-height: 400px;
    /* Thiết lập chiều cao cố định */
    overflow-y: auto;
    /* Cho phép thanh cuộn nếu nội dung vượt quá chiều cao */
}
</style>
