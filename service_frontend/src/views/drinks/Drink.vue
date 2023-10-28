<template>
    <div class="row ml-3 mb-3">
        <h4 class="col-5 title-in-page">
            Danh sách đồ uống
            <i class="fa fa-book icon" aria-hidden="true"></i>
        </h4>
        <!-- <div class="col-7 row text-right">
            <div class="col-12">
                <button class="btn btn-sm btn-primary" @click="this.isAdd = true">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>

        </div> -->
    </div>
    <div class="row container">
        <div class="col-md-12 ml-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="col-md-12">
            <DrinkList @openForm="this.isAdd = true" @edit:drink="editDrink" :drinks="filteredDrink"
                @delete:drink="deleteDrink" />
            <p v-if="filteredDrinkCount == 0">Không có đồ uống nào.</p>
        </div>
    </div>

    <v-dialog v-model="this.isAdd" max-width="800px">

        <v-btn color="danger" @click="this.isAdd = false" icon="fa fa-close" class="ml-auto mb-2"><i
                class="fa fa-close"></i></v-btn>
        <div class="p-3 bg-white rounded-lg">
            <DrinkForm :drink="{}" @submit:drink="addDrink" />
        </div>

    </v-dialog>
    <v-dialog v-model="this.isEdit" max-width="800px">
        <v-btn color="danger" @click="this.isEdit = false" icon="fa fa-close" class="ml-auto mb-3"><i
                class="fa fa-close"></i></v-btn>
        <div class="p-3 bg-white rounded-lg">
            <DrinkForm :drink="drink" @submit:drink="updateDrink" />
        </div>

    </v-dialog>
</template>
<script>
import DrinkForm from "@/components/drinks/DrinkForm.vue";
import { VBtn, VDialog } from "vuetify/lib/components/index.mjs";
import DrinkList from "@/components/drinks/DrinkList.vue";
import DrinkService from "@/services/drink.service";
import InputSearch from "../../components/InputSearch.vue";
import { useToast } from 'vue-toast-notification';
import { toast } from 'vue3-toastify';


export default {
    components: {
        DrinkList,
        InputSearch,
        VBtn,
        VDialog,
        DrinkForm

    },
    data() {
        return {
            drinks: [],
            searchText: "",
            isEdit: false,
            isAdd: false,
            drink: {}
        };
    },

    computed: {

        drinkString() {
            return this.drinks.map((drink) => {

                const { drink_name, price } = drink;
                return [drink_name, price].join("").toLowerCase();
            });
        },

        filteredDrink() {
            const searchTextLower = this.searchText.toLowerCase();
            if (!this.searchText) return this.drinks;
            return this.drinks.filter((_drink, index) =>
                this.drinkString[index].includes(searchTextLower)
            );
        },
        filteredDrinkCount() {
            return this.filteredDrink.length;
        },

    },
    methods: {
        addSuccessToast() {
            toast.success('Thêm thành công', { autoClose: 1000 });
        },
        updateSuccessToast() {
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        },
        async retrieveDrinks() {
            try {
                this.drinks = await DrinkService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveDrinks();

        },
        goToAddDrink() {
            this.$router.push({ name: "addDrink" });
        },
        async editDrink(drinkId) {
            this.getDrink(drinkId);
            this.isEdit = true;

        },
        async updateDrink(data) {
            try {
                await DrinkService.update(this.drink._id, data);
                this.updateSuccessToast();
                this.refreshList();
                this.isEdit = false;
            } catch (error) {
                console.log(error);
            }
        },
        async addDrink(data) {
            try {

                await DrinkService.create(data);
                // this.message = "Món ăn được thêm thành công.";
                this.addSuccessToast();
                this.refreshList();
                this.isAdd = false;

            } catch (error) {
                console.log(error);
            }
        },
        async getDrink(id) {
            try {
                this.drink = await DrinkService.get(id);

            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async deleteDrink(drinkId) {
            if (confirm("Bạn muốn xóa món này?")) {
                try {
                    await DrinkService.delete(drinkId);
                    this.deleteSuccessToast();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        deleteSuccessToast() {
            toast.success('Xóa thành công', { autoClose: 1000 });
        },
        // deleteSuccessToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Xóa thành công!',
        //         type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 5000, // Thời gian hiển thị (milliseconds)
        //     });
        // },

    },
    mounted() {
        this.refreshList();

    },

};
</script>
<style scoped></style>