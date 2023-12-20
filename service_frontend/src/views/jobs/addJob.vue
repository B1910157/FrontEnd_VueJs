<template>
    <div class="container p-2">
        <h4 class="text-center title-in-page">Thêm Bài Tuyển Dụng</h4>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8 bg-white">
                <JobForm :job="job" @submit:job="addJob" />
            </div>
            <div class="col-2"></div>

        </div>

    </div>
</template>
<script>
import JobForm from "@/components/jobs/JobForm.vue";
import JobService from "@/services/job.service";
import { useToast } from 'vue-toast-notification';
export default {
    components: {
        JobForm,
    },

    data() {
        return {
            job: {},

        };
    },
    methods: {
        addSuccessToast() {
            const VueToast = useToast();
            VueToast.open({
                message: 'Thêm thành công!',
                type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
                position: 'top-right', // Vị trí hiển thị toast
                duration: 5000, // Thời gian hiển thị (milliseconds)
            });
        },
        async addJob(data) {
            try {
                await JobService.create(data);
                this.addSuccessToast();

            } catch (error) {
                console.log(error);
            }
        },

    },

};
</script>