<template>
    <div class="vertical-nav bg-white" id="sidebar" style="overflow-y: auto" v-if="Auth">

        <div class="py-4 px-3 mb-4 bg-title">
            <div class="d-flex align-items-center">
                <v-img :src="getImage(this.info)" cover style="width: 80px; height: 80px;"
                    class="me-3 rounded-circle shadow border"></v-img>

                <!-- <div class="media-body">
                    <p class="font-weight-normal text-muted mb-0">Xin chào</p>
                    <h4 class="m-0">Nhà Hàng</h4>
                </div> -->
            </div>
            <div class="row mt-3">
                <div class="col-12 text-right">
                    <button class="btn btn-primary btn-sm " @click="showImageUploadForm">Đổi ảnh </button>
                </div>

            </div>

            <!-- <i @click="showImageUploadForm" class="fa fa-camera btn btn-secondary mt-2 ml-14" aria-hidden="true"></i> -->
            <!-- Form thay đổi ảnh -->
            <div v-if="this.isChange == true">
                <Form @submit="changeImage" :validation-schema="changeImageFormSchema" enctype="multipart/form-data">
                    <div class="form-group">
                        <label class="font-weight-bold" for="image">Hình ảnh </label>
                        <Field name="image" type="file" class="form-control" @change="updateTemporaryImage" />
                        <ErrorMessage name="image" class="error-feedback" />
                    </div>
                    <div class="form-group mt-3">
                        <button type="submit" class="btn btn-primary">Lưu</button>
                        <button class="ml-2 btn btn-danger" @click="cancelChange()">Hủy</button>
                    </div>
                </Form>

            </div>


        </div>


        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item " :class="{ 'active': $route.path === '/' }">
                <router-link to="/" class="nav-link">
                    <i class="fas fa-chart-area me-3 "></i> Thống kê
                </router-link>
            </li>
        </ul>

        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/foods/) }">
                <router-link to="/foods" class="nav-link">
                    <i class="fa-solid fa-utensils me-3"></i> Món ăn
                </router-link>
            </li>

            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/drinks/) }">
                <router-link to="/drinks" class="nav-link">
                    <i class="fa-solid fa-mug-hot me-3"></i> Đồ uống
                </router-link>
            </li>

            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/other/) }">
                <router-link to="/other" class="nav-link">
                    <i class="fa-solid fa-masks-theater me-3"></i>Dịch vụ khác
                </router-link>
            </li>
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/menu/) }">
                <router-link to="/menu" class="nav-link">
                    <i class="fa-solid fa-book me-3"></i> Thực đơn
                </router-link>
            </li>
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/orders/) }">
                <router-link to="/orders" class="nav-link">
                    <!-- <i class="fa-solid fa-file-lines me-3"></i> -->
                    <i class="fa-solid fa-paper-plane me-3"></i>
                    Đơn đặt tiệc
                </router-link>
            </li>


            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/info/) }">
                <router-link to="/info" class="nav-link">
                    <!-- <i class="fa-solid fa-users-gear me-3"></i> -->
                    <i class="fa-solid fa-pen-to-square me-3"></i>
                    Thông tin dịch vụ
                </router-link>

            </li>


            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/jobs/) }">
                <router-link to="/jobs" class="nav-link">
                    <i class="fa-solid fa-person-walking-luggage me-3"></i>
                    Tuyển dụng
                </router-link>

            </li>
        </ul>
        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item ">
                <a class="nav-link" @click="logOut"><i class="fas fa-right-from-bracket me-3"></i>
                    Đăng xuất
                </a>
            </li>
        </ul>

    </div>
    <span v-else></span>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapState, mapMutations } from 'vuex';
import userService from "@/services/user.service";
import infoService from '../../services/info.service';
import changeImage from '../../services/changeImage.service';
import { VImg } from "vuetify/lib/components/index.mjs";

import { object } from "yup";
import * as yup from "yup";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        VImg
    },
    computed: {
        ...mapState(['Auth']),
    },

    methods: {
        showImageUploadForm() {
            this.isChange = true;
        },
        async changeImage() {
            if (this.temporaryImage) {
                // Nếu có ảnh tạm thời, thực hiện tải lên
                const formData = new FormData();
                formData.append("image", this.temporaryImage);
                await changeImage.changeImage(formData);
                // Cập nhật giá trị this.info.image sau khi tải lên thành công
                this.info.image = this.temporaryImage;
                this.retrieveInfo();
                this.isChange = false;
            }
        },
        cancelChange() {
            this.isChange = false;
        },
        getImage(service) {
            return `http://localhost:3000/${service.image}`;
        },
        updateTemporaryImage(event) {
            // Update giá trị ảnh tạm thời khi người dùng chọn ảnh mới
            this.temporaryImage = event.target.files[0];
        },
        async retrieveInfo() {
            try {
                this.info = await infoService.info();

            } catch (error) {
                console.log(error);
            }
        },
        ...mapMutations(['setAuth']),
        async logOut() {
            if (confirm("Xác nhận đăng xuất?")) {
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
            }
        },

    },
    data() {
        const changeImageFormSchema = yup.object().shape({
            image: yup.mixed().required("Hình ảnh là bắt buộc."),
        });
        return {
            info: object,
            temporaryImage: null,
            isChange: false,
            changeImageFormSchema,
        };
    },
    created() {
        this.retrieveInfo();
    }
}

</script>
<style scoped>
@import "@/assets/form.css";
</style>