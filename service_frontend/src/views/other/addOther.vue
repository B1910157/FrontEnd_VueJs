<template>
    <div class="container p-2">
        <h4>Thêm</h4>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <OtherForm :other="other" @submit:other="addOther" />
            </div>
            <div class="col-3"></div>

        </div>

        <p class="text-success">{{ message }}</p>
    </div>
</template>
<script>
import OtherForm from "@/components/other/OtherForm.vue";
import OtherService from "@/services/other.service";
export default {
    components: {
        OtherForm,
    },

    data() {
        return {
            other: {},
            message: "",
        };
    },
    methods: {
        async addOther(data) {
            try {
                await OtherService.create(data);
                this.message = "Thêm thành công.";

            } catch (error) {
                console.log(error);
            }
        },

    },

};
</script>