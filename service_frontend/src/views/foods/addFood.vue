<template>
    <div class="container p-2">
        <h4 class="text-center title-in-page">Thêm Món Ăn</h4>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <FoodForm :food="food" @submit:food="addFood" />
            </div>
            <div class="col-3"></div>

        </div>

    </div>
</template>
<script>
import FoodForm from "@/components/foods/FoodForm.vue";
import FoodService from "@/services/food.service";
import { useToast } from 'vue-toast-notification';
import { toast } from 'vue3-toastify';
export default {
    components: {
        FoodForm,
    },

    data() {
        return {
            food: {},

        };
    },
    methods: {
        addSuccessToast() {
            toast.success('Thêm thành công', { autoClose: 1000 });
        },
        // addSuccessToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Thêm thành công!',
        //         type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 5000, // Thời gian hiển thị (milliseconds)
        //     });
        // },
        async addFood(data) {
            try {
                await FoodService.create(data);
                // this.message = "Món ăn được thêm thành công.";
                this.addSuccessToast();

            } catch (error) {
                console.log(error);
            }
        },

    },

};
</script>