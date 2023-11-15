<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                        <a class="nav-item nav-link" href="#">Features</a>
                        <a class="nav-item nav-link" href="#">Pricing</a>
                        <a class="nav-item nav-link disabled" href="#">Disabled</a>
                    </div>
                </div>
            </nav> -->
            <div class="navbar-logo">
                <router-link :to="{ name: 'home' }" class="navbar-brand">
                    <img :src="`http://localhost:3000/img2.jpg`" class="logo" />

                </router-link>
            </div>
            <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link">Trang chủ <i
                                class="fas fa-home"></i></router-link>

                        <!-- <div @click="navigateHome" class="nav-link">Trang chủ <i class="fas fa-home"></i></div> -->
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'employments' }" class="nav-link">Tuyển dụng <i class="fa fa-bullhorn"
                                aria-hidden="true"></i></router-link>
                    </li>

                    <div v-if="!Auth" class="d-flex">
                        <li class="nav-item">
                            <router-link :to="{ name: 'login' }" class="nav-link btn btn-link">
                                Đăng nhập

                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'register' }" class="nav-link btn btn-link ">
                                Đăng ký

                            </router-link>
                        </li>
                    </div>

                    <div class="navbar-nav" v-else-if="Auth">
                        <li class="nav-item">
                            <router-link :to="{ name: 'order' }" class="nav-link">
                                Đơn hàng
                                <i class="fas fa-cart-arrow-down"></i>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'history' }" class="nav-link">
                                Lịch sử
                                <i class="fas fa-history"></i>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'feedback' }" class="nav-link">
                                Góp ý
                                <i class="fa-regular fa-paper-plane"></i>

                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'chats' }" class="nav-link">
                                Tin nhắn
                                <div class="envelope-icon">
                                    <i class="fa fa-envelope"></i>
                                    <b v-if="newMessage > 0" class="message-count">{{ newMessage }}</b>
                                </div>
                                <!-- <i class="fa fa-envelope"> <b v-if="this.newMessage > 0" class="text-danger">{{
                                    this.newMessage }}</b></i> -->
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'info' }" class="nav-link">
                                Cá nhân
                                <i class="fas fa-user"></i>
                            </router-link>
                        </li>
                        <li class="nav-item ">
                            <button @click="logOut" class="nav-link btn btn-link ">
                                Đăng xuất <i class="fa fa-power-off" aria-hidden="true"></i>
                            </button>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import userService from "@/services/user.service";
import userChatService from '../../services/userChat.service';

export default {
    data() {
        return {
            newMessage: 0,
            updateInterval: null,
        };
    },
    computed: {
        ...mapState(['Auth']),

    },
    methods: {
        startUpdateInterval() {
            this.updateInterval = setInterval(() => {
                this.getQuantityNewMessage();
            }, 1000); // Lấy tin nhắn mới mỗi 1 phút (thay đổi theo yêu cầu của bạn)
        },
        async getQuantityNewMessage() {
            try {
                const rs = await userChatService.getQuantityNewChatForUser();
                if (rs) {
                    this.newMessage = rs.quantity;
                    console.log("number", this.newMessage)
                }
            } catch (error) {

            }
        },
        // navigateHome() {
        //     this.$router.push({ name: "home" }); // Điều hướng đến trang "home"
        // },
        ...mapMutations(['setAuth']),
        async logOut() {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                };
                await userService.logout({ headers });
                //Xóa token khỏi localStorage
                localStorage.removeItem('token');
                //set lại giá trị của Auth là false
                this.setAuth(false);
                //Chuyển trang về login
                this.$router.push({ name: 'login' });
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        if (this.Auth) {
            this.getQuantityNewMessage();
            this.startUpdateInterval();
        }

    },
    destroyed() {
        // Đảm bảo clear interval khi component bị hủy
        clearInterval(this.updateInterval);
    },
}

</script>

<style scoped>
.envelope-icon {
    position: relative;
    display: inline-block;


}

.message-count {
    position: absolute;
    top: -14px;
    /* Adjust the vertical position as needed */
    right: -8px;
    /* Adjust the horizontal position as needed */
    background-color: red;
    color: white;
    border-radius: 100%;
    padding: 2px 4px;
    font-size: 12px;

}

.navbar {
    border-bottom: 1px solid #ccc;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #9e5f17;
}

.navbar-logo {
    transition: all 0.3s;
}

.logo {
    width: 60px;
    border-radius: 50%;
}

.navbar .navbar-nav .nav-link {
    position: relative;
    color: #fff;
    transition: color 0.3s;
    font-weight: 500;
}

.navbar .navbar-nav .nav-link:hover,
.navbar .navbar-nav .nav-link.active {
    color: #fff;
}

.navbar .navbar-nav .nav-link::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #fff;
    transition: width 0.3s;
}

.navbar .navbar-nav .nav-link:hover::after,
.navbar .navbar-nav .nav-link.active::after {
    width: 90%;
}

.navbar .navbar-nav .dropdown .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    margin-top: 5px;
    transition: opacity 0.3s;
    opacity: 0;
}

.navbar .navbar-nav .dropdown:hover .dropdown-menu {
    display: block;
    opacity: 1;
}

.navbar .navbar-nav .dropdown .dropdown-menu .dropdown-item {
    padding: 0.5rem 1rem;
    color: #212529;
    font-size: 14px;
    line-height: 1.5;
    white-space: nowrap;
    transition: background-color 0.3s, color 0.3s;
}

.navbar .navbar-nav .dropdown .dropdown-menu .dropdown-item:hover {
    background-color: #083361;
    color: #fff;
}

.navbar .navbar-nav .dropdown:last-child .dropdown-menu .dropdown-item {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
}

.navbar .navbar-nav .nav-item.dropdown .dropdown-menu.dropdown-menu-custom {
    min-width: 10rem;
}

.navbar .navbar-nav .nav-item.dropdown .dropdown-menu.dropdown-menu-custom .dropdown-item {
    padding: 0.5rem 1rem;
}

.dropdown-toggle::after {
    display: none;
}

@media (max-width: 768px) {
    .logo {
        width: 80px;
    }
}
</style>