
<template>
    <div class="container">
        <div class="scrollable-list">
            <v-card-text>
                <table class="table">
                    <tr v-for="(food, i) in this.menu.list" :key="food.foodId">
                        <td class="d-none d-md-block">
                            <v-img :src="getImage(food)" cover height="30px" width="30px"></v-img>
                        </td>
                        <td>
                            {{
                                food.food_name
                            }}
                        </td>
                        <td>
                            {{ formatCurrency(food.price) }}
                        </td>
                        <td>
                            <span v-if="this.isEditing == true" @click="removeFoodInMenu(food._id)"
                                class="mt-2 badge badge-danger" style="font-size: 16px;">
                                <i class="fas fa-trash"></i> </span>
                        </td>
                    </tr>
                    <!-- <tr class="text-right">
                        <td colspan="4">
                            Tổng: {{ formatCurrency(this.menu.total) }}
                        </td>
                    </tr> -->
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
        </div>
    </div>
</template>
<script>

import { VBtn, VImg, VCardText, VCardActions } from "vuetify/lib/components/index.mjs";
import MenuService from "../../services/menu.service";
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
    data() {

        return {
            // menuLocal: this.foodList,
            isEditing: false,
        };
    },
    emits: ["addFood"],
    methods: {
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
    mounted() {


    }
};
</script>
<style scoped>
.scrollable-list {
    max-height: 370px;
    /* Điều chỉnh chiều cao tối đa ở đây */
    overflow-y: auto;
}

.action {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
</style>