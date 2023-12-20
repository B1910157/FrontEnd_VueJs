<template>
    <div class="container">
        <div class="row ml-3 mb-3">
            <h4 class="col-5 title-in-page">
                Thông tin dịch vụ
                <i class="fa fa-book icon" aria-hidden="true"></i>
            </h4>

        </div>
        <div class="bg-white">

            <Info :info="filteredinfo" />

            <!-- <div class="mt-3 row justify-content-around align-items-center">
                <router-link :to="{
                    name: 'updateInfo',
                 
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Cập nhật thông tin</span>
                </router-link>
                <span class="mt-2 badge badge-warning">
                    <i class="fas fa-edit"></i> Đổi mật khẩu</span>

            </div> -->
            <div class="row ml-5 ">
                <router-link :to="{
                    name: 'updateInfo',
                    // query: { id_user: info._id }
                }">
                    <span class="btn btn-warning">
                        <i class="fas fa-edit"></i> Cập nhật</span>
                </router-link>
                <span class="ml-2 btn btn-warning" @click="this.changePass = true">
                    <i class="fa fa-key" aria-hidden="true"></i> Đổi mật khẩu</span>

            </div>
        </div>
    </div>
    <v-dialog v-model="this.changePass" max-width="800px">
        <v-btn color="danger" @click="changePass = false" icon="fa fa-close" class="ml-auto mb-3"><i
                class="fa fa-close"></i></v-btn>
        <div class="ml-3 bg-white p-3 rounded-lg">
            <changePass :info="filteredinfo" @changePass="changePassReal" :message="this.message" />
        </div>
    </v-dialog>
</template>
<script>
import { VBtn, VDialog, } from "vuetify/lib/components/index.mjs";
import Info from "@/components/Info.vue";
import infoService from "../services/info.service";
import changePass from "../components/changePass.vue";
import { object } from "yup";
import { toast } from 'vue3-toastify';
export default {
    components: {
        Info,
        VDialog,
        changePass,
        VBtn
    },
    data() {
        return {
            info: object,
            changePass: false,
            message: ''



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


        // Trả về các food có chứa thông tin cần tìm kiếm.
        filteredinfo() {
            return this.info;

        },



    },
    methods: {
        updateSuccessToast() {
            // toast("Cập nhật thành công !", {
            //     autoClose: 1000,
            // }); // ToastOptions
            toast.success('Thay đổi mật khẩu thành công', { autoClose: 2000 },);
        },
        updateErrorToast() {
            // toast("Cập nhật thành công !", {
            //     autoClose: 1000,
            // }); // ToastOptions
            toast.success('Thay đổi mật khẩu thất bại', { autoClose: 2000 },);
        },
        async changePassReal(pw_old, pw_new) {
            const data = {
                pass_old: pw_old,
                pass_new: pw_new
            }
            const response = await infoService.changePass(data);
            if (response.status == 200) {
                this.updateSuccessToast();
                this.message = '';
                this.changePass = false;
            } else if (response.status == 400) {
                this.message = response.message;
            }
            else {
                this.updateErrorToast();
            }
        },
        async retrieveInfo() {
            try {
                this.info = await infoService.info();
                console.log(this.info);
            } catch (error) {
                console.log(error);
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