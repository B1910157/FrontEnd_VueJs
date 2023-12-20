<template>
    <div class="vertical-nav bg-white" id="sidebar" style="overflow-y: auto" v-if="Auth">

        <div class="py-4 px-3 mb-4 bg-title">
            <div class="d-flex align-items-center">
                <img src="https://www.lansweeper.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN.png" alt="..."
                    style="width: 80px; height: 80px;" class="me-3 rounded-circle shadow border">
                <div class="media-body">

                    <p class="font-weight-normal text-muted mb-0">Xin chào</p>
                    <h4 class="m-0"> Quản trị viên</h4>
                </div>
            </div>
        </div>

        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item " :class="{ 'active': $route.path === '/' }">
                <router-link to="/" class="nav-link">
                    <i class="fas fa-chart-area me-3 "></i> Trang chủ
                </router-link>
            </li>
        </ul>

        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/services/) }">
                <router-link to="/services" class="nav-link">
                    <i class="fa-solid fa-house-user me-3"></i> Nhà hàng
                </router-link>
            </li>
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/users/) }">
                <router-link to="/users" class="nav-link">
                    <i class="fa-solid fa-users me-3"></i> Khách hàng
                </router-link>
            </li>
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/comments/) }">
                <router-link to="/comments" class="nav-link">
                    <i class="fa-solid fa-comments me-3"></i> Bình luận
                </router-link>
            </li>

            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/food_category/) }">
                <router-link to="/food_category" class="nav-link">
                    <i class="fa-solid fa-box me-3 "></i> Loại món
                </router-link>
            </li>
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/feedback/) }">
                <router-link to="/feedback" class="nav-link">
                    <i class="fa-solid fa-message me-3"></i> Góp ý
                </router-link>
            </li>

        </ul>

        <!-- <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\//) }">
                <router-link to="/" class="nav-link">
                    <i class="fa-solid fa-file-lines me-3 "></i>
                    Quản lý Loại Món
                </router-link>
            </li>
        </ul> -->
        <!-- <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\//) }">
                <router-link to="/" class="nav-link">
                    <i class="fa-solid fa-file-lines me-3 "></i>
                    Góp Ý
                </router-link>
            </li>
        </ul> -->

        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/info/) }">
                <router-link to="/info" class="nav-link">
                    <i class="fa-solid fa-user me-3 "></i>
                    Thông tin cá nhân
                </router-link>

            </li>
        </ul>
    </div>
    <span v-else></span>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import userService from "@/services/user.service";

export default {
    computed: {
        ...mapState(['Auth']),
    },

    methods: {
        ...mapMutations(['setAuth']),
        async logOut() {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                };
                await userService.logout({ headers });
                localStorage.removeItem('token');
                this.setAuth(false);
                this.$router.push({ name: 'login' });
            } catch (error) {
                console.log(error);
            }
        },

    }
}

</script>