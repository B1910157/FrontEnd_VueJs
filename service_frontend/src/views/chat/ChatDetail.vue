
<template>
    <div class="container">
        <div>
            <div class="row ml-3 mb-3">
                <h4 v-if="this.messages[0]" class="col-5 title-in-page">
                    {{ this.messages[0].fullname }}
                    <i class="fa-solid fa-user"></i>
                </h4>

            </div>

            <div class="chat-container" ref="chatContainer">
                <div v-for="(message, index) in messages" :key="index" class="message-container"
                    :style="{ justifyContent: message.sender === 'user' ? 'flex-start' : 'flex-end' }">
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
import serviceChat from "../../services/serviceChat.service";
import io from "socket.io-client";
import { mapState, mapMutations } from 'vuex';
import infoService from '../../services/info.service';


export default {
    components: {
        ListChat,
    },
    computed: {
        ...mapState(['Auth']),
    },
    data() {
        return {
            chats: [],
            message: "",
            messages: [],
            socket: null,
            socketInitialized: false,
            info: {}
        };
    },


    methods: {
        async retrieveInfo() {
            try {
                this.info = await infoService.info();

            } catch (error) {
                console.log(error);
            }
        },
        async getOneChat() {
            try {

                const data = {
                    user_id: this.$route.params.userId
                }

                this.messages = await serviceChat.findContentInChatSocket(data);
                this.$nextTick(() => {
                    this.scrollToEnd();
                });
            } catch (error) {
                console.log("error", error);
            }
        },
        // async getAllChatOfService() {
        //     try {
        //         this.chats = await serviceChat.getAllChatsForServiceSocket();


        //     } catch (error) {
        //         console.log(error);
        //     }
        // },

        scrollToEnd() {
            const container = this.$refs.chatContainer;
            container.scrollTop = container.scrollHeight;
        },
        async sendMessage() {
            if (this.message.trim() !== "" && this.info) {
                const room2 = this.info._id + "_" + this.$route.params.userId;
                // const room2 = this.$route.params.userId;
                // Gửi tin nhắn tới server qua socket của namespace3001

                this.socket.emit("chat message", { chat: this.message, sender: "service", roomId: room2 });

                // Thêm tin nhắn vào danh sách
                // this.messages.push({ chat: this.message, sender: "service", roomId: room2 });
                // Xóa nội dung tin nhắn từ input


                const data = {
                    user_id: this.$route.params.userId,
                    content: this.message
                }
                const rs = await serviceChat.serviceChatSocket(data);
                this.message = "";
                this.$nextTick(() => {
                    this.scrollToEnd();
                });
            }

            // const data = {
            //     user_id: this.$route.params.userId,
            //     content: this.message
            // }
            // this.socket.emit("chat message", { chat: this.message, sender: "service" });
            // const rs = await serviceChat.serviceChatSocket(data);
            // this.message = "";
            // this.$nextTick(() => {
            //     this.scrollToEnd();
            // });
            // this.getOneChat();
        },

        initializeSocket2() {

            // this.socket = io("http://localhost:3009/namespace"); // Thay đổi URL theo địa chỉ của server và namespace
            // this.socket.on("chat message", (msg) => {
            //     this.messages.push(msg);
            // });

            // Kết nối đến server Socket.IO
            this.socket = io("http://localhost:3009"); // Thay đổi URL theo địa chỉ của server
            // Gửi sự kiện join với roomId khi component được tạo
            if (1) {
                const room1 = this.info._id + "_" + this.$route.params.userId;
                this.socket.emit("join", room1);

                // Xử lý sự kiện nhận tin nhắn từ server
                this.socket.on("chat message", (msg) => {
                    this.messages.push(msg);
                    this.$nextTick(() => {
                        this.scrollToEnd();
                    });
                });
            }


        },
    },

    async created() {
        await this.retrieveInfo();
        this.getOneChat();
        // if (!this.socketInitialized) {
        //     this.initializeSocket2(); // Chỉ mở kết nối socket nếu chưa được mở
        //     this.socketInitialized = true; // Đặt biến để đánh dấu rằng kết nối đã được mở
        // }
        if (this.Auth) {
            this.initializeSocket2();
        }
    },
};
</script>

<style scoped>
.chat-container {
    max-height: 350px;
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

  