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
                console.log("chat nè: ", this.chats);
            } catch (error) {
                console.log(error);
            }
        },
        async getOneChat() {
            try {
                const data = {
                    // service_id: this.$route.params.serviceId
                    service_id: "64c76b93f6f987cfa8faf2fb"
                }

                this.messages = await userChat.findContentInChat(data);

            } catch (error) {
                console.log("error", error);
            }
        },

        async sendMessage() {
            console.log("hi", this.message);
            if (this.message.trim() !== "") {
                // Gửi tin nhắn tới server qua socket của namespace3001
                this.socket.emit("chat message", { content: this.message, sender: "User1" });
                const data = {
                    service_id: "64c76b93f6f987cfa8faf2fb",
                    content: this.message
                }
                this.message = "";
                const rs = await userChat.userChatSocket(data);
                console.log("rs", rs)
                // Thêm tin nhắn vào danh sách
                // this.chats.push({
                //     content: this.message,
                //     sender: "User1", // Thay đổi thành thông tin người gửi thực tế
                // });
                // Xóa nội dung tin nhắn từ input

            }
        },

        initializeSocket() {
            // Kết nối đến server Socket.IO qua namespace3001
            this.socket = io("http://localhost:3009/namespace3001"); // Thay đổi URL theo địa chỉ của server và namespace
            // Xử lý sự kiện nhận tin nhắn từ server
            this.socket.on("chat message", (msg) => {
                this.chats.push(msg);
            });
        },
    },

    created() {
        this.getAllChatOfUser();
        this.initializeSocket(); // Khởi tạo kết nối Socket.IO khi component được tạo
    },
};
</script>
  
<style scoped></style>
  