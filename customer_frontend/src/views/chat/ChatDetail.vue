<!-- <template>
    <div class="container">
        <div>
            <h2 class="my-3 text-warning">
                {{ this.service.service_name }}
            </h2>
            <div class="chat-container">
                <div v-for="(message, index) in messages" :key="index" class="message-container"
                    :style="{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }">
                    <span
                        :class="{ 'user-message': message.sender === 'user', 'service-message': message.sender === 'service' }">
                        {{ message.chat }}
                    </span>
                </div>
            </div>
            <div class="mt-3">
                <div class="input-container">
                    <textarea class="border" v-model="newMessage" placeholder="Tin nhắn"></textarea>
                    <button class="mb-7 border btn btn-primary" @click="sendMessage"> <i
                            class="fa-solid fa-paper-plane"></i> Gửi</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import userChat from "../../services/userChat.service";
import serviceProvider from "../../services/service.service";
export default {
    data() {
        return {
            messages: [],
            newMessage: '',
            service: {}
        };
    },
    methods: {
        async getService() {
            try {

                this.service = await serviceProvider.getService(this.$route.params.serviceId);

            } catch (error) {

            }
        },
        async getOneChat() {
            try {
                const data = {
                    service_id: this.$route.params.serviceId
                }

                this.messages = await userChat.findContentInChat(data);

            } catch (error) {
                console.log("error", error);
            }
        },
        async sendMessage() {
            const data = {
                service_id: this.$route.params.serviceId,
                chat: this.newMessage
            }
            const rs = await userChat.userChat(data);
            this.newMessage = '';
            this.getOneChat();

        },
       
    },
    created() {
        this.getOneChat();
        this.getService();
    }

};
</script>
  
<style scoped>
.chat-container {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
}

.message-container {
    display: flex;
    margin-bottom: 10px;
}

.user-message {
    background-color: #e0f7fa;
    padding: 5px;
    border-radius: 5px;
}

.service-message {
    background-color: #ffd54f;
    padding: 5px;
    border-radius: 5px;
}

.input-container {
    margin-top: 10px;
}

textarea {
    width: 80%;
    padding: 5px;
    margin-right: 10px;
}

button {
    padding: 5px 10px;
    cursor: pointer;
}
</style> -->
<template>
    <div class="container">
        <div>
            <h2 class="my-3 text-warning">
                {{ this.service.service_name }}
            </h2>
            <div class="chat-container" ref="chatContainer">
                <div v-for="(message, index) in messages" :key="index" class="message-container"
                    :style="{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }">
                    <span
                        :class="{ 'user-message': message.sender === 'user', 'service-message': message.sender === 'service' }">
                        {{ message.chat }}
                    </span>
                </div>
            </div>
            <div class="mt-3">
                <div class="input-container">
                    <textarea class="border" v-model="message" placeholder="Tin nhắn"></textarea>
                    <button class="mb-7 border btn btn-primary" @click="sendMessage"> <i
                            class="fa-solid fa-paper-plane"></i> Gửi</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import ListChat from "../../components/chat/listChat.vue";
import userChat from "../../services/userChat.service";
import io from "socket.io-client";
import serviceProvider from "../../services/service.service";

export default {
    components: {
        ListChat,
    },
    data() {
        return {
            chats: [],
            message: "",
            messages: [],
            socket: null,
            service: {}
        };
    },

    methods: {
        async getService() {
            try {

                this.service = await serviceProvider.getService(this.$route.params.serviceId);

            } catch (error) {

            }
        },

        async getOneChat() {
            try {
                const data = {
                    service_id: this.$route.params.serviceId

                }

                this.messages = await userChat.findContentInChat(data);
                this.$nextTick(() => {
                    this.scrollToEnd();
                });
            } catch (error) {
                console.log("error", error);
            }
        },

        async sendMessage() {

            if (this.message.trim() !== "") {
                // Gửi tin nhắn tới server qua socket của namespace3001
                this.socket.emit("chat message", { chat: this.message, sender: "user" });
                const data = {
                    service_id: this.$route.params.serviceId,
                    content: this.message
                }
                this.message = "";

                const rs = await userChat.userChatSocket(data);
                // this.getOneChat()
                // Thêm tin nhắn vào danh sách
                // this.chats.push({
                //     content: this.message,
                //     sender: "User1", // Thay đổi thành thông tin người gửi thực tế
                // });
                // Xóa nội dung tin nhắn từ input
                this.$nextTick(() => {
                    this.scrollToEnd();
                });
            }
        },
        scrollToEnd() {
            const container = this.$refs.chatContainer;
            container.scrollTop = container.scrollHeight;
        },

        initializeSocket() {
            // Kết nối đến server Socket.IO qua namespace3001
            this.socket = io("http://localhost:3009/namespace"); // Thay đổi URL theo địa chỉ của server và namespace

            // Ở phía user
            // this.socket.emit("chat message", { chat: this.message, sender: "user" });

            // Xử lý sự kiện nhận tin nhắn từ server
            this.socket.on("chat message", (msg) => {
                this.messages.push(msg);
            });
        },
    },

    created() {
        this.getOneChat();
        this.getService();
        this.initializeSocket(); // Khởi tạo kết nối Socket.IO khi component được tạo
    },
};
</script>
  

<style scoped>
.chat-container {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
}

.message-container {
    display: flex;
    margin-bottom: 10px;
}

.user-message {
    background-color: #e0f7fa;
    padding: 5px;
    border-radius: 5px;
}

.service-message {
    background-color: #ffd54f;
    padding: 5px;
    border-radius: 5px;
}

.input-container {
    margin-top: 10px;
}

textarea {
    width: 80%;
    padding: 5px;
    margin-right: 10px;
}

button {
    padding: 5px 10px;
    cursor: pointer;
}
</style>
  
