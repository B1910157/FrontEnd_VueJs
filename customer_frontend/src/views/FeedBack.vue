<template>
    <div class="container">
        <div>
            <h2 class="text-center my-3 text-warning">
                GÓP Ý
            </h2>
            <FeedBack :feedback="{}" @submit:feedback="addfeedback" />
            <p class="text-success">{{ message }}</p>


        </div>

    </div>
</template>
<script>
import FeedBack from "@/components/FeedBack.vue";
import feedbackService from "@/services/feedback.service"

export default {
    components: {
        FeedBack,
    },
    data() {
        return {
            message: "",


        };
    },

    methods: {
        async addfeedback(data) {
            try {
                await feedbackService.create(data);
                // this.message = "Góp ý thành công.";
                // alert('Góp ý thành công.');

            } catch (error) {
                console.log(error);
            }
        },



    },


};
</script>
<style scoped></style>