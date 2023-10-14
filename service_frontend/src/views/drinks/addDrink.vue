<template>
    <div class="container p-2">
        <h4 class="text-center title-in-page">Thêm Đồ uống</h4>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <DrinkForm :drink="drink" @submit:drink="addDrink" />
            </div>
            <div class="col-3"></div>

        </div>

    </div>
</template>
<script>
import DrinkForm from "@/components/drinks/DrinkForm.vue";
import DrinkService from "@/services/drink.service";
import { useToast } from 'vue-toast-notification';
export default {
    components: {
        DrinkForm,
    },

    data() {
        return {
            drink: {},

        };
    },
    methods: {
        async addDrink(data) {
            try {
                await DrinkService.create(data);
                this.addSuccessToast()

            } catch (error) {
                console.log(error);
            }
        },
        addSuccessToast() {
            const VueToast = useToast();
            VueToast.open({
                message: 'Thêm thành công!',
                type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
                position: 'top-right', // Vị trí hiển thị toast
                duration: 5000, // Thời gian hiển thị (milliseconds)
            });
        },

    },

};
</script>