

<template>
    <div class="container">
        <div>
            <h2 class="text-center my-3 text-warning">
                Tin Nhắn
            </h2>
            <ListChat :chats="this.chats" />

        </div>
    </div>
</template>
  
<script>
import ListChat from "../../components/chat/listChat.vue";
import userChat from "../../services/userChat.service";
import io from "socket.io-client";

export default {
    components: {
        ListChat,
    },
    data() {
        return {
            chats: [],
            message: "",
            socket: null,
        };
    },

    methods: {
        async getAllChatOfUser() {
            try {
                this.chats = await userChat.getAllChatsForUserSocket();

            } catch (error) {
                console.log(error);
            }
        },
        
    },

    created() {
        this.getAllChatOfUser();
     
    },
};
</script>
  
<style scoped></style>
  