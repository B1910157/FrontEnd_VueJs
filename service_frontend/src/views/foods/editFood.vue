<template>
    <div v-if="food" class="container">
        <h4 class="text-center title-in-page">Sửa Món Ăn</h4>
        <div class="row">
            <div class="col-3">

            </div>
            <div class="col-6">
                <FoodForm :food="food" @submit:food="updateFood" />
            </div>
            <div class="col-3">

            </div>
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            food: null,

        };
    },
    methods: {
        updateSuccessToast() {
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        },
        // updateSuccessToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Cập nhật thành công!',
        //         type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 5000, // Thời gian hiển thị (milliseconds)
        //     });
        // },

        async getFood(id) {
            try {
                this.food = await FoodService.get(id);
                console.log(this.food)
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
        async updateFood(data) {
            try {
                await FoodService.update(this.food._id, data);
                this.updateSuccessToast();
            } catch (error) {
                console.log(error);
            }
        },
        // async deleteFood() {
        //     if (confirm("Bạn muốn xóa món ăn này?")) {
        //         try {
        //             await FoodService.delete(this.food._id);
        //             this.deleteSuccessToast();
        //             this.$router.push({ name: "foods" });
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // },



    },
    created() {
        this.getFood(this.id);
        this.message = "";
    },

};
</script>