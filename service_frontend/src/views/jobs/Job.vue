<template>
    <div class="container">
        <div class="row ml-3 mb-3">
            <h4 class="col-5 title-in-page">
                Bài tuyển dụng
                <i class="fa fa-book icon" aria-hidden="true"></i>
            </h4>
            <div class="col-7 row text-right">
                <div class="col-12">
                    <button class="btn btn-sm btn-primary" @click="addPost">
                        <i class="fas fa-plus"></i> Thêm
                    </button>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="">
                <JobList v-if="filleredjobcount > 0" :jobs="filteredjob" @hiddenPost="hiddenPost"
                    @publishPost="publishPost" />
                <p v-else>Bạn chưa có bài tuyển dụng nào.</p>
            </div>

        </div>
    </div>
</template>
<script>
import JobList from "@/components/jobs/JobList.vue";
import jobService from "../../services/job.service";
import { toast } from 'vue3-toastify';

export default {
    components: {
        JobList,
    },
    data() {
        return {
            jobs: [

            ],

        };
    },

    computed: {


        filteredjob() {
            // if (this.showUnconfirmed) {
            //     return this.ordersUnconfirm;
            // } else {

            // }
            return this.jobs;
        },

        filleredjobcount() {
            return this.filteredjob.length;
        },

    },
    methods: {
        hiddenSuccessToast() {
            toast.success('Ẩn thành công', { autoClose: 1000 });
        },
        publishSuccessToast() {
            toast.success('Đăng bài thành công', { autoClose: 1000 });
        },
        async hiddenPost(job) {
            const data = {
                jobId: job,
                status: 1
            }
            await jobService.updateStatus(data);
            this.refreshList();
            this.hiddenSuccessToast()
        },
        async publishPost(job) {

            const data = {
                jobId: job,
                status: 0
            }
            await jobService.updateStatus(data);
            this.refreshList();
            this.publishSuccessToast();
        },
        addPost() {
            this.$router.push({ name: "addJob" });
        },
        async retrieveJobs() {
            try {
                this.jobs = await jobService.findAll();

            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveJobs();
        },


    },
    mounted() {
        this.refreshList();

    },

};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>