<template>
    <div class="container p-2">
        <h4 class="text-center title-in-page">Thêm</h4>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <OtherForm :other="other" @submit:other="addOther" />
            </div>
            <div class="col-3"></div>

        </div>

    </div>
</template>
<script>
import OtherForm from "@/components/other/OtherForm.vue";
import OtherService from "@/services/other.service";
import { useToast } from 'vue-toast-notification';
import { toast } from 'vue3-toastify';
export default {
    components: {
        OtherForm,
    },

    data() {
        return {
            other: {},

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
        async addOther(data) {
            try {
                await OtherService.create(data);
                this.addSuccessToast();

            } catch (error) {
                console.log(error);
            }
        },

    },

};
</script>