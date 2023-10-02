import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "vue-toast-notification/dist/theme-sugar.css";
import "vue-toast-notification/dist/theme-default.css";
import PrimeVue from "primevue/config";
// import VueGoodTablePlugin from "vue-good-table";
// import "vue-good-table/dist/vue-good-table.css";
//
// import ConfirmDialog from "primevue/confirmdialog";
// import PrimeVue from "primevue/config";
// import ConfirmationService from "primevue/confirmationservice";

import "./assets/main.css";

// createApp(App).use(router).mount("#app");
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(PrimeVue)
  // .use(VueGoodTablePlugin)

  .mount("#app");
