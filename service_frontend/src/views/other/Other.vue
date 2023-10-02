<template>
    <div class="row p-4">
        <h4 class="col-5">
            Danh sách dịch vụ khác
            <i class="fa fa-book icon" aria-hidden="true"></i>
        </h4>
        <div class="col-7">
            <button class="btn btn-sm btn-primary" @click="goToAddOther">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-md-11 ml-3">
            <InputSearch v-model="searchText" />
        </div>

        <div class="col-md-12">
            <OtherList v-if="filteredOtherCount > 0" :other="filteredOther" />
            <p v-else>Không có dịch vụ khác nào.</p>
        </div>
    </div>
</template>
<script>
import OtherList from "@/components/other/OtherList.vue";
import OtherService from "@/services/other.service";
import InputSearch from "../../components/InputSearch.vue";


export default {
    components: {
        OtherList,
        InputSearch

    },
    data() {
        return {
            other: [],
            searchText: "",
        };
    },

    computed: {

        otherString() {
            return this.other.map((other1) => {

                const { other_name, price } = other1;
                return [other_name, price].join("").toLowerCase();
            });
        },

        filteredOther() {
            const searchTextLower = this.searchText.toLowerCase();
            if (!this.searchText) return this.other;
            return this.other.filter((_other, index) =>
                this.otherString[index].includes(searchTextLower)
            );
        },
        filteredOtherCount() {
            return this.filteredOther.length;
        },

    },
    methods: {
        async retrieveOther() {
            try {
                this.other = await OtherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveOther();

        },
        goToAddOther() {
            this.$router.push({ name: "addOther" });
        },

    },
    mounted() {
        this.refreshList();

    },

};
</script>
<style scoped></style>