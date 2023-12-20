<template>
  <div class="page pt-2">
    <h4 class="text-center text-primary font-weight-bold">Đăng nhập</h4>
    <LoginForm @submit:login="submitLogin" />
    <p>{{ message }}</p>

  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import userService from "@/services/user.service";
import { mapState, mapMutations, mapActions } from "vuex";

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
    ...mapActions(['getCart']),
   
    async submitLogin(data) {
      try {
        console.log("hihi")
        const response = await userService.login(data);
        console.log("respon ne: ", response)
        console.log("helloooooo", response.token)
        localStorage.setItem("token", response.token);

        // console.log("auth", this.Auth)
        this.setAuth(true);
        // console.log(response.data.token)
        this.$router.push({ name: 'home' });
        // location.reload();
        this.getCart();
      } catch (error) {

        console.log(error);
        this.message = "Đăng nhập thất bại. Vui lòng thử lại.";
      }
    },
  },
};
</script>