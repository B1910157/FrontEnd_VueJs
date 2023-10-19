<template>
    <div class="row ml-3 mb-3">
        <h5 class="col-5 title-in-page">
            Danh sách dịch vụ khác (Thuê vật tư)
            <i class="fa fa-book icon" aria-hidden="true"></i>
        </h5>
        <!-- <div class="col-7 row text-right">
            <div class="col-12">
                <button class="btn btn-sm btn-primary" @click="goToAddOther">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>

        </div> -->
    </div>
    <div class="row container">
        <div class="col-md-12 ml-3">
            <InputSearch v-model="searchText" />
        </div>

        <div class="col-md-12">
            <OtherList v-if="filteredOtherCount > 0" @openForm="this.isAdd = true" @edit:other="editOther"
                :other="filteredOther" @delete:other="deleteOther" />
            <p v-else>Không có dịch vụ khác nào.</p>
        </div>
    </div>

    <v-dialog v-model="this.isAdd" max-width="800px">

        <v-btn color="danger" @click="this.isAdd = false" icon="fa fa-close" class="ml-auto mb-2"><i
                class="fa fa-close"></i></v-btn>
        <div class="p-3 bg-white rounded-lg">
            <OtherForm :other="{}" @submit:other="addOther" />
        </div>

    </v-dialog>
    <v-dialog v-model="this.isEdit" max-width="800px">
        <v-btn color="danger" @click="this.isEdit = false" icon="fa fa-close" class="ml-auto mb-3"><i
                class="fa fa-close"></i></v-btn>
        <div class="p-3 bg-white rounded-lg">
            <OtherForm :other="other1" @submit:other="updateOther" />
        </div>

    </v-dialog>
</template>
<script>
import { VBtn, VDialog } from "vuetify/lib/components/index.mjs";
import OtherList from "@/components/other/OtherList.vue";
import OtherService from "@/services/other.service";
import OtherForm from "@/components/other/OtherForm.vue";
import InputSearch from "../../components/InputSearch.vue";
import { useToast } from 'vue-toast-notification';
import { toast } from 'vue3-toastify';


export default {
    components: {
        OtherList,
        InputSearch,
        OtherForm,
        VBtn,
        VDialog

    },
    data() {
        return {
            other: [],
            searchText: "",
            isEdit: false,
            isAdd: false,
            other1: {}
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
        addSuccessToast() {
            toast.success('Thêm thành công', { autoClose: 1000 });
        },
        updateSuccessToast() {
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        },
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
        async editOther(otherId) {
            this.getOther(otherId);
            this.isEdit = true;

        },
        async updateOther(data) {
            try {
                await OtherService.update(this.other1._id, data);
                this.updateSuccessToast();
                this.refreshList();
                this.isEdit = false;
            } catch (error) {
                console.log(error);
            }
        },
        async addOther(data) {
            try {

                await OtherService.create(data);
                // this.message = "Món ăn được thêm thành công.";
                this.addSuccessToast();
                this.refreshList();
                this.isAdd = false;

            } catch (error) {
                console.log(error);
            }
        },
        async getOther(id) {
            try {
                this.other1 = await OtherService.get(id);

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

        goToAddOther() {
            this.$router.push({ name: "addOther" });
        },
        async deleteOther(otherId) {
            if (confirm("Xác nhận xóa?")) {
                try {
                    await OtherService.delete(otherId);
                    this.deleteSuccessToast();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        deleteSuccessToast() {
            toast.success('Xóa thành công', { autoClose: 1000 });
        },
        // deleteSuccessToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Xóa thành công!',
        //         type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 5000, // Thời gian hiển thị (milliseconds)
        //     });
        // },

    },
    mounted() {
        this.refreshList();

    },

};
</script>
<style scoped></style>