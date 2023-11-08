<template>
    <div class="container">
        <div class="row ml-3 mb-3">
            <!-- <h4 class="col-5 title-in-page">
                Góp ý của khách hàng
                <i class="fa fa-book icon" aria-hidden="true"></i>
            </h4> -->
            <h4 class="col-5 text-secondary">
                Góp ý của khách hàng
            </h4>
        </div>
        <div class="container">

            <FeedBackList v-if="filleredfeedbackcount > 0" :feedbacks="filteredfeedback" />
            <p v-else>Không có góp ý nào.</p>
        </div>


    </div>
</template>
<script>
import FeedBackList from "@/components/feedback/FeedBackList.vue";
import { VBtn, VDialog } from "vuetify/lib/components/index.mjs";

import feedback from "../../services/feedback.service";
// import OrderGetItemService from "../services/orderGetItem.service"

// import { EventBus } from './event-bus';

export default {
    components: {
        FeedBackList,
        VDialog,
        VBtn,

    },
    data() {
        return {
            feedbacks: [],

            message: ""

        };
    },

    computed: {

        // Trả về các foood có chứa thông tin cần tìm kiếm.
        // filteredorder() {
        //     return this.orders;

        // },
        filteredfeedback() {
            // if (this.showUnconfirmed) {
            //     return this.ordersUnconfirm;
            // } else {

            // }
            return this.feedbacks;
        },
        // filteredorderUnconfirm() {
        //     return this.ordersUnconfirm;

        // },
        filleredfeedbackcount() {
            return this.filteredfeedback.length;
        },

    },
    methods: {

        async retrieveFeedbacks() {
            try {
                this.feedbacks = await feedback.getAll();

            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveFeedbacks();
        },

    },
    mounted() {
        this.refreshList();


    },

};
</script>
<style scoped></style>