<template>
    <div class="container">
        <div>
            <h2 class="text-center my-3 text-warning">
                THÔNG TIN CÁ NHÂN
            </h2>
            <Info :info="filteredinfo" />

            <div class="mt-3 row justify-content-around align-items-center">
                <router-link :to="{
                    name: 'updateInfo',
                    // query: { id_user: info._id }
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Cập nhật thông tin</span>
                </router-link>
            </div>

        </div>

    </div>
</template>
<script>
import Info from "@/components/Info.vue";
import infoService from "../services/info.service";
import { mapState } from 'vuex';
// import infoService from "../services/user.service";
import { object } from "yup";
// import { toast } from 'vue3-toastify';
export default {
    components: {
        Info,
    },
    data() {
        return {
            info: object,



        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.

    },
    // props:{
    //     info: this.info

    // },
    computed: {
        ...mapState(['Auth']),


        // Trả về các food có chứa thông tin cần tìm kiếm.
        filteredinfo() {
            return this.info;

        },



    },
    methods: {
        async retrieveInfo() {
            if (this.Auth) {
                try {
                    this.info = await infoService.info();
                    console.log(this.info);
                } catch (error) {
                    console.log(error);
                }

            }

        },


        refreshList() {
            this.retrieveInfo();
            this.activeIndex = -1;
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