<template>
    <div class="container">
        <div>
            <h2 class="text-center my-3 text-warning">Tin Nhắn</h2>
            <div>
                <div v-for="chat in chats" :key="chat.id">
                    {{ chat.sender }}: {{ chat.content }}
                </div>
            </div>
            <div>
                <input v-model="message" @keyup.enter="sendMessage" placeholder="Nhập tin nhắn" />
            </div>
        </div>
    </div>
</template>
  
<script>
import ListChat from "../../components/chat/listChat.vue";
import serviceChat from "../../services/serviceChat.service";
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
    computed:{
        filterChats
    },

    methods: {
        async getOneChat() {
            try {

                const data = {
                    user_id: "64d07b86d04fbbddc812a177"
                }

                this.messages = await serviceChat.findContentInChatSocket(data);

            } catch (error) {
                console.log("error", error);
            }
        },
        async getAllChatOfService() {
            try {
                this.chats = await serviceChat.getAllChatsForServiceSocket();


            } catch (error) {
                console.log(error);
            }
        },


        async sendMessage() {
            const data = {
                user_id: "64d07b86d04fbbddc812a177",
                content: this.message
            }
            const rs = await serviceChat.serviceChatSocket(data);
            this.message = '';
            // this.getOneChat();
            this.getAllChatsForService()

        },

        initializeSocket() {
            // Kết nối đến server Socket.IO qua namespace3001
            this.socket = io("http://localhost:3009/namespace3003"); // Thay đổi URL theo địa chỉ của server và namespace
            // Xử lý sự kiện nhận tin nhắn từ server
            this.socket.on("chat message", (msg) => {
                this.chats.push(msg);
            });
        },
    },

    created() {
        // this.getOneChat();
        this.getAllChatOfService()

        this.initializeSocket(); // Khởi tạo kết nối Socket.IO khi component được tạo
    },
};
</script>
  
<style scoped></style>
  