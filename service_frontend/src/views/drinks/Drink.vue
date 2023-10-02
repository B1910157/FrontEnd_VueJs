<template>
    <div class="row p-4">
        <h4 class="col-5">
            Danh sách đồ uống
            <i class="fa fa-book icon" aria-hidden="true"></i>
        </h4>
        <div class="col-7">
            <button class="btn btn-sm btn-primary" @click="goToAddDrink">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-md-11 ml-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="col-md-12">
            <DrinkList v-if="filteredDrinkCount > 0" :drinks="filteredDrink" />
            <p v-else>Không có đồ uống nào.</p>
        </div>
    </div>
</template>
<script>
import DrinkList from "@/components/drinks/DrinkList.vue";
import DrinkService from "@/services/drink.service";
import InputSearch from "../../components/InputSearch.vue";


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

    },
    mounted() {
        this.refreshList();

    },

};
</script>
<style scoped></style>