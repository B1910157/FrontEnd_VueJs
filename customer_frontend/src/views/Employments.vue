<template>
    <div class="container">
        <div>

            <h2 class="text-center my-3 text-warning">
                TIN TUYỂN DỤNG
            </h2>

            <EmploymentList v-if="filteredEmployCount > 0" :employments="filterEmployments" />
            <p v-else>Không có tin tuyển dụng nào.</p>
        </div>

    </div>
</template>
<script>

import EmploymentList from "@/components/EmploymentList.vue"
import homeService from "../services/home.service";

export default {
    components: {
        EmploymentList,
    },
    data() {
        return {
            employments: [],

        };
    },
    watch: {

        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        filterEmployments() {
            return this.employments;
        },

        filteredEmployCount() {
            return this.filterEmployments.length;
        },

    },
    methods: {
        async retrieveEmployments() {
            try {
                this.employments = await homeService.getAllEmployment();

            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveEmployments();
            this.activeIndex = -1;
        },
        cancelEvent() {
            this.refreshList();
        }


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