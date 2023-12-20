<template>
    <div class="row ml-3 mb-3">
        <h4 class="col-5 title-in-page">
            Danh sách menu
            <i class="fa fa-book icon" aria-hidden="true"></i>
        </h4>
        <!-- <div class="col-7 row text-left">

            <div class="ml-5 p-2 rounded-lg btn btn-success" @click="addMenu">
                <i class="fas fa-plus "></i> Thêm
            </div>


        </div> -->
        <div class="col-7 row text-right ">
            <div class="col-12">
                <button class="btn btn-primary" @click="addMenu">
                    <i class="fas fa-plus"></i> Thêm
                </button>
            </div>
        </div>
    </div>
    <div>

        <v-dialog v-model="this.addNewMenu" max-width="800px">
            <v-btn color="danger" @click="addNewMenu = false" icon="fa fa-close" class="ml-auto"><i
                    class="fa fa-close"></i></v-btn>

            <addMenu @submit:addNewMenu="addNewMenuReal" />

        </v-dialog>

    </div>
    <div class="row container">
        <div class="col-md-12 ml-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="col-md-12">
            <MenuList v-if="filteredMenuCount > 0" :menus="filteredMenu" @addFoodSuccess="addFoodSuccess"
                @removeFoodInMenu="removeFoodInMenu" @delMenu="delMenu" @publishMenu="publishMenu"
                @hiddenMenu="hiddenMenu" />
            <p v-else class="ml-3">Không có menu nào.</p>

        </div>

    </div>
</template>
<script>
import { VBtn, VDialog, VImg } from "vuetify/lib/components/index.mjs";

import MenuList from "@/components/menu/MenuList.vue";
import addMenu from "@/components/menu/addMenu.vue";
import MenuService from "@/services/menu.service";
import { useToast } from 'vue-toast-notification';
import { toast } from 'vue3-toastify';

import InputSearch from "../../components/InputSearch.vue";

export default {
    components: {
        MenuList,
        VDialog,
        VBtn,
        VImg,
        addMenu,
        InputSearch
    },
    data() {
        return {
            menus: [],
            activeIndex: -1,
            addNewMenu: false,
            searchText: "",
        };
    },

    computed: {
        menuString() {
            return this.menus.map((menu) => {
                const { menu_name } = menu;
                return [menu_name].join("").toLowerCase();
            });
        },

        filteredMenu() {
            const searchTextLower = this.searchText.toLowerCase();
            if (!this.searchText) return this.menus;
            return this.menus.filter((_menu, index) =>
                this.menuString[index].includes(searchTextLower)
            );
        },
        filteredMenuCount() {
            return this.filteredMenu.length;
        },


    },

    methods: {
        removeSuccessToast() {
            toast.success('Xóa thành công', { autoClose: 1000 });
        },
        // removeSuccessToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Xóa thành công!',
        //         type: 'success',
        //         position: 'top-right',
        //         duration: 3000,
        //     });
        // },
        addSuccessToast() {
            toast.success('Thêm thành công', { autoClose: 1000 });
        },
        // addSuccessToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Thêm thành công!',
        //         type: 'success',
        //         position: 'top-right',
        //         duration: 3000,
        //     });
        // },
        async retrieveMenus() {
            try {
                this.menus = await MenuService.getAll();

                // this.menus = (await MenuService.getAll()).map((menu, index) => {
                //     menu.key = index;
                //     return menu;
                // });

            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveMenus();

        },
        async publishMenu(menuId) {
            console.log("id 3", menuId)
            console.log("menus", this.menus)

            await MenuService.publishMenu(menuId);

            this.retrieveMenus();

        },
        async hiddenMenu(menuId) {
            console.log("menus", this.menus)
            await MenuService.hiddenMenu(menuId);
            await this.retrieveMenus();

        },
        async delMenu(menuId) {
            try {
                await MenuService.delete(menuId);
                // this.menus = await MenuService.getAll();
                await this.retrieveMenus();
                this.removeSuccessToast();

            } catch (error) {
                console.log(error);
            }

        },
        addMenu() {
            this.addNewMenu = true;

        },
        addFoodSuccess() {
            this.refreshList();
            this.addSuccessToast();


        },
        async addNewMenuReal(data) {

            await MenuService.create(data);
            this.addNewMenu = false;
            // this.refreshList();
            await this.retrieveMenus();
            // this.menus = await MenuService.getAll();

        },
        removeFoodInMenu() {
            this.refreshList();
            this.removeSuccessToast();
        }


    },
    mounted() {
        this.refreshList();

    },

};
</script>
<style scoped></style>