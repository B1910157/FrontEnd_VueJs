<template>
    <div v-if="other" class="container">
        <h4 class="text-center title-in-page">Chỉnh sửa</h4>
        <div class="row">
            <div class="col-3">

            </div>
            <div class="col-6">
                <OtherForm :other="other" @submit:other="updateOther" />

            </div>

            <div class="col-3">

            </div>
        </div>

        <!-- <p class="text-success">{{ message }}</p> -->
    </div>
</template>
<script>
import OtherForm from "@/components/other/OtherForm.vue";
import OtherService from "@/services/other.service";
import { toast } from 'vue3-toastify';
export default {
    components: {
        OtherForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            other: null,
            message: "",
        };
    },
    methods: {
        editSuccessToast() {
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        },
        async getOther(id) {
            try {
                this.other = await OtherService.get(id);

            } catch (error) {
                console.log(error);

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
        async updateOther(data) {
            try {
                await OtherService.update(this.other._id, data);
                this.editSuccessToast()
                // this.message = "Cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },




    },
    created() {
        this.getOther(this.id);
        this.message = "";
    },

};
</script>