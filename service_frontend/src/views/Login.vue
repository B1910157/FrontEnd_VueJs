<template>
  <div class="page">

    <div class="row text-center">

      <div class="col-2"></div>
      <div class="col-6">
        <h4 class="text-center text-primary font-weight-bold">Đăng nhập</h4>
        <LoginForm @submit:login="submitLogin" />
      </div>
      <div class="col-4"></div>

    </div>

    <p>{{ message }}</p>

  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import userService from "@/services/user.service";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState(['Auth']),

  },
  methods: {
    ...mapMutations(['setAuth']),


    async submitLogin(data) {
      try {

        const response = await userService.login(data);
        console.log("respon: ", response)
        console.log("helloo", response.token)
        localStorage.setItem("token", response.token);
        this.setAuth(true);
        this.$router.push({ name: 'home' });
      } catch (error) {

        console.log(error);
        this.message = "Đăng nhập thất bại. Vui lòng thử lại.";
      }
    },
  },
};
</script>