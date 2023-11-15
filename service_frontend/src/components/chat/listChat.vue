<template>
    <div>
        <v-list>
            <v-list-group v-if="chats.length > 0">
                <v-list-item v-for="(chat, index) in chats" :key="index" @click="selectChat(index)">
                    <!-- Service Image -->
                    <div class="row rounded-lg mt-2">
                        <div class="col-md-2">
                            <div class="d-flex align-items-center">

                                <v-img class="me-3 rounded-circle "
                                    :src="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&usqp=CAU'"
                                    style="width: 50px; height: 60px;"></v-img>
                            </div>

                        </div>
                        <div class="col-md-10">
                            <v-list-item-title class="font-weight-bold mb-2">{{ chat.fullname }}</v-list-item-title>
                            <v-list-item-subtitle v-html="formatMessage(chat)"></v-list-item-subtitle>
                        </div>
                    </div>
                    <hr>
                </v-list-item>
            </v-list-group>
            <v-list-item v-else>
                <v-list-item>
                    <v-list-item-subtitle>No chats available</v-list-item-subtitle>
                </v-list-item>
            </v-list-item>
        </v-list>
    </div>
</template>
  
<script>
import { VList, VListItem, VListImg, VListItemSubtitle, VListItemTitle, VImg } from "vuetify/lib/components/index.mjs";

export default {
    components: {
        VList,
        VListItem,
        VListImg,
        // VListItemAvatar,
        // VListItemContent,
        // VListItemGroup,
        VListItemSubtitle,
        VListItemTitle,
        VImg,

    },
    props: {
        chats: {
            type: Array,
            default: () => [],
        },
    },
    methods: {

        selectChat(index) {
            // Handle the selection of a chat, if needed
            // console.log('Selected chat:', this.chats[index]);
            this.$router.push({ name: 'ChatDetail', params: { userId: this.chats[index].user_id } });
        },
        formatMessage(chat) {
            // Format the message based on seen status
            // return chat.seen ? chat.chat : `<b>${chat.chat}</b>`;
            if (chat.sender == 'user' && chat.service_seen == false) {
                return `<b>${chat.chat}</b>`;
            } else {
                return chat.chat;
            }
            // return chat.chat
        },
    },
};
</script>
  
<style scoped>
/* Add any styling here if needed */
/* .rounded-circle {
    border-radius: 50%;
} */
</style>
  