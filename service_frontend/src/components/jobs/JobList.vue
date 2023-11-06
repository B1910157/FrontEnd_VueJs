<script>

import jobService from '../../services/job.service';
import { VDataTable } from "vuetify/labs/VDataTable";
import { VBtn } from "vuetify/lib/components/index.mjs";
export default {
    components: {
        VDataTable,
        VBtn
    },
    props: {
        jobs: { type: Array, default: [] },

    },
    computed: {
        formattedJobs() {
            return this.jobs.map((job) => {
                const actions = [];
                const details = {
                    text: 'Chi tiết',
                    action: () => this.showDetails(job._id),
                };

                // Thêm các hành động dựa trên trạng thái
                if (job.status === 0) {
                    actions.push({
                        text: 'Hiện',

                        action: () => this.showPublishPost(job._id),
                    });
                }
                else if (job.status === 1) {
                    actions.push({
                        text: 'Ẩn',
                        action: () => this.showHiddenPost(job._id),

                    });

                }

                return {
                    ...job,
                    actions,
                    details,
                    createAt: this.formatDate(job.createAt),
                };
            });
        },
    },

    data: () => ({
        headers: [
            {
                title: 'Tiêu đề',
                align: 'start',
                sortable: false,
                key: 'title',

            },
            // { title: 'Email', align: 'end', key: 'email', },
            { title: 'Lương', align: 'end', key: 'wage', },
            { title: 'Nơi làm việc', align: 'end', key: 'area', },
            { title: 'Số lượng', align: 'end', key: 'slot', },
            // {
            //     title: 'Mô tả',
            //     align: 'end',
            //     key: 'description',

            // },
            {
                title: 'Hạn nộp',
                align: 'end',
                key: 'deadline',

            },
            {
                title: 'Thao tác',
                align: 'end',
                key: 'actions',

            },
            {
                title: ' ',
                align: 'end',
                key: 'details',

            }



        ],
    }),
    methods: {

        toggleMenu(index) {
            this.jobs[index].showMenu = !this.jobs[index].showMenu;
        },
        async publishPost(jobId) {
            try {
                // const rs = await jobService.publishPost(jobId);
                if (rs) {
                    this.$emit('publishPost', this.jobs)

                }
            } catch (error) {
                console.log(error);
            }
        },
        async hiddenPost(jobId) {

            try {
                // const rs = await jobService.hiddenPost(jobId);
                if (rs) {
                    this.$emit('hiddenPost', this.jobs)
                }
            } catch (error) {
                console.log(error);
            }
        },
        showPublishPost(jobId) {
            if (confirm("Bạn muốn đăng bài này?")) {
                this.publishPost(jobId);
            }
        },
        showHiddenPost(jobId) {
            if (confirm("Bạn muốn ẩn bài này?")) {
                this.hiddenPost(jobId);
            }
        },
        showDetails(jobId) {
            this.$router.push({
                name: "detailJob",
                params: {
                    jobId: jobId,
                },

            });

        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
            return formattedDate;
        }
    }
};

</script>
<template>
    <!-- {{ formattedJobs }} -->
    <v-data-table :headers="headers" :items="formattedJobs" class="elevation-1" density="compact" item-key="_id">
        <!-- <template v-slot:item.description="{ item }">
            <div v-html="item.selectable.description"></div>
        </template> -->

        <template v-slot:item.actions="{ item }">
            <div v-for="(action, index) in item.selectable.actions" :key="index" @click="action.action" class="m-2">
                <v-btn :class="{
                    'btn-green': action.text === 'Hiện',
                }" class="" style="width: 50px;" v-if="action.text == 'Hiện'">{{ action.text
}}</v-btn>

                <v-btn :class="{
                    'btn-red': action.text === 'Ẩn',
                }" class="" style="width: 50px;" v-if="action.text == 'Ẩn'">{{ action.text
}}</v-btn>

            </div>
        </template>


        <template v-slot:item.details="{ item }">
            <v-btn @click="item.selectable.details.action">
                {{ item.selectable.details.text }}
            </v-btn>
        </template>

    </v-data-table>
</template>
<style>
.btn-green {
    background-color: #28a745;

    color: white;

}

.btn-red {
    background-color: #dc3545;

    color: white;

}


.btn i.fa-eye {
    color: #007BFF;
}


.btn:hover i.fa-eye {
    color: #0056b3;
}
</style>