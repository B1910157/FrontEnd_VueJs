<template>
    <div v-if="drink" class="container">
        <h4 class="text-center title-in-page">Sửa Đồ uống</h4>
        <div class="row">
            <div class="col-3">

            </div>
            <div class="col-6">
                <DrinkForm :drink="drink" @submit:drink="updateDrink" />

            </div>

            <div class="col-3">

            </div>
        </div>

        <!-- <p class="text-success">{{ message }}</p> -->
    </div>
</template>
<script>
import DrinkForm from "@/components/drinks/DrinkForm.vue";
import DrinkService from "@/services/drink.service";
import { toast } from 'vue3-toastify';
export default {
    components: {
        DrinkForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            drink: null,
            message: "",
        };
    },
    methods: {
        async getDrink(id) {
            try {
                this.drink = await DrinkService.get(id);

            } catch (error) {
                console.log(error);

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
        async updateDrink(data) {
            try {
                await DrinkService.update(this.drink._id, data);
                // this.message = "Đồ uống được cập nhật thành công.";
                this.editSuccessToast()
            } catch (error) {
                console.log(error);
            }
        },
        editSuccessToast() {
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        },




    },
    created() {
        this.getDrink(this.id);
        this.message = "";
    },

};
</script>