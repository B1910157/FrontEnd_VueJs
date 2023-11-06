<template>
    <div class="container">
        <div class="row ml-3 mb-3">
            <h4 class="col-5 title-in-page">
                Bình luận
                <i class="fa fa-book icon" aria-hidden="true"></i>
            </h4>

        </div>
        <div class="container">

            <CommentList :comments="filteredComment" @hiddenCmt="hiddenCmt" @showCmt="showCmt" />
            <!-- <CommentList :comments="filteredComment" @hiddenService="hiddenService" @showService="showService" /> -->
        </div>



    </div>
</template>
<script>

import { VBtn, VDialog } from "vuetify/lib/components/index.mjs";
import serviceService from "../../services/managerService.service";
import CommentList from "@/components/comments/CommentList.vue";
import commentsService from "../../services/commentAndEvaluate.service"
import adminService from "../../services/user.service";
// import OrderGetItemService from "../services/orderGetItem.service"

// import { EventBus } from './event-bus';

export default {
    components: {
        CommentList,
        VDialog,
        VBtn,

    },
    data() {
        return {
            comments: [],
            message: ""
            // ordersUnconfirm: [],
            // showUnconfirmed: false,
        };
    },

    computed: {

        // Trả về các foood có chứa thông tin cần tìm kiếm.
        // filteredorder() {
        //     return this.orders;

        // },
        filteredComment() {
            // if (this.showUnconfirmed) {
            //     return this.ordersUnconfirm;
            // } else {

            // }
            return this.comments;
        },
        // filteredorderUnconfirm() {
        //     return this.ordersUnconfirm;

        // },


    },
    methods: {
        async hiddenCmt(id, status) {
            try {
                const data = {
                    id: id,
                    status: status
                }
                await commentsService.updateStatus(data);
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        },
        async showCmt(id, status) {
            try {
                const data = {
                    id: id,
                    status: status
                }
                await commentsService.updateStatus(data);
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveComments() {
            try {
                this.comments = await commentsService.getAllComment();

            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveComments();
        },
        // acceptEvent() {
        //     this.refreshList();
        //     // this.refreshListUnconfirm();
        // },
        // cancelEvent() {
        //     this.refreshList();
        //     // this.refreshListUnconfirm();
        // },

        // async retrieveOrdersUnconfirm() {
        //     try {
        //         // this.ordersUnconfirm = await orderService.getOrder();
        //         // console.log(this.ordersUnconfirm);
        //         console.log("hi")
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },

        // refreshListUnconfirm() {
        //     this.retrieveOrdersUnconfirm();
        // },


    },
    mounted() {
        this.refreshList();
        // this.refreshListUnconfirm();

    },

};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>