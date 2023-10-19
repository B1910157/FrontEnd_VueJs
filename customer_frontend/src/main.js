import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./assets/main.css";
import "vue3-toastify/dist/index.css";
// import ToastPlugin from "vue-toast-notification";
// import VueToast from "./plugins/toast";
import "vue-toast-notification/dist/theme-sugar.css";
import "vue-toast-notification/dist/theme-default.css";
// import "vue-toast-notification/dist/theme-bootstrap.css";

// createApp(App).use(router).mount("#app");
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  //   .use(ToastPlugin)
  .mount("#app");
