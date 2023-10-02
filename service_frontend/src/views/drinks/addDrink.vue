<template>
    <div class="container p-2">
        <h4>Thêm Đồ uống</h4>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <DrinkForm :drink="drink" @submit:drink="addDrink" />
            </div>
            <div class="col-3"></div>

        </div>

        <p class="text-success">{{ message }}</p>
    </div>
</template>
<script>
import DrinkForm from "@/components/drinks/DrinkForm.vue";
import DrinkService from "@/services/drink.service";
export default {
    components: {
        DrinkForm,
    },

    data() {
        return {
            drink: {},
            message: "",
        };
    },
    methods: {
        async addDrink(data) {
            try {
                await DrinkService.create(data);
                this.message = "Đồ uống được thêm thành công.";

            } catch (error) {
                console.log(error);
            }
        },

    },

};
</script>