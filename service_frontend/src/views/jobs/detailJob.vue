<template>
    <div v-if="job" class="container text-center">
        <h4 class="text-center title-in-page">Chi tiết</h4>
        <div class="row">

            <div class="col-md-12">
                <JobFormToEdit :job="job" @submit:job="updateJob" />
            </div>

        </div>


    </div>
</template>
<script>
import JobFormToEdit from "@/components/jobs/JobFormToEdit.vue";
import JobService from "@/services/job.service";
import { useToast } from 'vue-toast-notification';
import jobService from "../../services/job.service";
export default {
    components: {
        JobFormToEdit,
    },
    props: {
        jobId: { type: String, required: true },
    },
    data() {
        return {
            job: null,

        };
    },
    methods: {
        updateSuccessToast() {
            const VueToast = useToast();
            VueToast.open({
                message: 'Cập nhật thành công!',
                type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
                position: 'top-right', // Vị trí hiển thị toast
                duration: 5000, // Thời gian hiển thị (milliseconds)
            });
        },

        async getJob(id) {
            try {
                this.job = await JobService.findOne(id);

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
        async updateJob(data) {
            try {
                // await FoodService.update(this.food._id, data);
                await jobService.updateOnePostJob(this.job._id, data);
                this.updateSuccessToast();
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getJob(this.jobId);

    },

};
</script>