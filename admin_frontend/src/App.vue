<script>
import AppHeader from "@/components/AppHeader.vue";

import Footer from "./components/layouts/Footer.vue";
import HeaderService from "@/components/layouts/HeaderService.vue"
import AppService from "@/components/layouts/AppService.vue";

export default {
  components: {
    AppHeader,
    AppService,
    HeaderService,
    Footer
  },

};
</script>


<template>
  <AppService />
  <div id="content" class="page-content">

    <HeaderService />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>


<style scoped></style>