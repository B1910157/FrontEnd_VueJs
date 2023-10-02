<script>
import AppHeader from "@/components/AppHeader.vue";
// import AppAdmin from "./components/AppAdmin.vue";
import Footer from "./components/layouts/Footer.vue";
import HeaderService from "@/components/layouts/HeaderService.vue"
import AppService from "@/components/layouts/AppService.vue";

export default {
  components: {
    AppHeader,
    AppService,
    // AppAdmin,
    HeaderService,
    Footer
  },

};
</script>


<template>
  <AppService />
  <div id="content" class="page-content">
    <!-- <AppHeader />
     -->
    <HeaderService />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>


<!-- <template>
  <div id="app">
    <AppHeader /> -->

    <!-- <AppService /> -->
    <!-- <AppAdmin></AppAdmin> -->
<!-- 
    <div class="container mt-3">
      <router-view />
    </div>
    
  </div>
  <Footer></Footer>
</template> -->



<style></style>