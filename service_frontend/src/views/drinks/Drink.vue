<template>
    <div class="row ml-3 mb-3">
        <h4 class="col-5 title-in-page">
            Danh sách đồ uống
            <i class="fa fa-book icon" aria-hidden="true"></i>
        </h4>
        <div class="col-7 row text-right">
            <div class="col-12">
                <button class="btn btn-sm btn-primary" @click="goToAddDrink">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>

        </div>
    </div>
    <div class="row container">
        <div class="col-md-12 ml-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="col-md-12">
            <DrinkList v-if="filteredDrinkCount > 0" :drinks="filteredDrink" @delete:drink="deleteDrink" />
            <p v-else>Không có đồ uống nào.</p>
        </div>
    </div>
</template>
<script>
import DrinkList from "@/components/drinks/DrinkList.vue";
import DrinkService from "@/services/drink.service";
import InputSearch from "../../components/InputSearch.vue";
import { useToast } from 'vue-toast-notification';


export default {
    components: {
        DrinkList,
        InputSearch

    },
    data() {
        return {
            drinks: [],
            searchText: "",
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
            const VueToast = useToast();
            VueToast.open({
                message: 'Xóa thành công!',
                type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
                position: 'top-right', // Vị trí hiển thị toast
                duration: 5000, // Thời gian hiển thị (milliseconds)
            });
        },

    },
    mounted() {
        this.refreshList();

    },

};
</script>
<style scoped></style>