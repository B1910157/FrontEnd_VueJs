<template>
    <div class="page pt-2">
        <h4 class="text-center text-primary font-weight-bold">Đăng ký</h4>

        <div v-if="showUserRegistrationForm">
            <div class="row">
                <div class="col-12 text-right ">
                    <button class="" @click="toggleServiceForm"><u class="text-primary">Đăng ký hoạt động dịch vụ</u>
                    </button>
                </div>

            </div>

            <RegisterForm @submit:register="submitRegister" />
            <p class="text-danger">{{ message }}</p>

        </div>

        <div v-else>
            <div class="row">
                <div class="col-12 text-right ">
                    <button class="" @click="toggleServiceForm"><u class="text-primary"> Quay lại đăng ký thành
                            viên</u></button>
                </div>

            </div>

            <ServiceRegistrationForm @submit:registerService="submitRegisterService" />
            <p class="text-danger">{{ message }}</p>

        </div>
    </div>
</template>
<script>
import RegisterForm from "@/components/RegisterForm.vue";
import userService from "@/services/user.service";
import homeService from "@/services/home.service";
import ServiceRegistrationForm from "@/components/ServiceRegistrationForm.vue";
import { toast } from 'vue3-toastify';
export default {
    components: {
        RegisterForm,
        ServiceRegistrationForm,
    },
    data() {
        return {
            message: "",
            showUserRegistrationForm: true,
        };
    },
    methods: {
        showSuccessToast() {
            toast.success('Đăng ký thành công', { autoClose: 3000 });
        },
        toggleServiceForm() {
            // Toggle the flag to switch between user registration and service registration forms
            this.showUserRegistrationForm = !this.showUserRegistrationForm;
        },
        async submitRegister(data) {
            try {
                const rs = await userService.register(data);

                if (rs.message) {
                    this.message = rs.message;
                } else {
                    this.showSuccessToast();
                    // this.$router.push("/login");

                }

            } catch (error) {
                console.log(error);
                this.message = "Đăng ký thất bại. Vui lòng thử lại.";
            }
        },
        async submitRegisterService(data) {
            try {
                const rs = await homeService.createService(data);

                if (rs.message) {
                    this.message = rs.message;
                } else {
                    this.showSuccessToast();
                    // this.$router.push("/home");
                }

            } catch (error) {
                console.log(error);
                this.message = "Đăng ký thất bại. Vui lòng thử lại.";
            }
        },
    },
};
</script>