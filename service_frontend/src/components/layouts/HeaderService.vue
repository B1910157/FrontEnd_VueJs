<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="Auth">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" @click="toggleSidebar" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <button id="sidebarCollapse" type="button" class="btn btn-light" @click="toggleSidebar"><i
          class="fa fa-bars m-2"></i></button>
      <a class="navbar-brand" href="#">{{ this.info.service_name }}</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

          <li class="nav-item">
            <button class="btn btn-outline-primary m-1" href="" @click="logOut"><i class="fas fa-right-from-bracket"></i>
              Đăng xuất</button>
          </li>
        </ul> -->
      </div>
    </div>
  </nav>
  <nav v-else></nav>
</template>
 


<script>
import { mapState, mapMutations } from 'vuex';
import userService from "@/services/user.service";
import infoService from "../../services/info.service";
import { object } from "yup";

export default {
  data() {
    return {
      info: object,
    };
  },
  computed: {
    ...mapState(['Auth']),


  },
  watch: {
    'Auth': {
      handler: 'getRetrieveInfo',
      deep: true,
    },

  },


  methods: {
    async retrieveInfo() {
      try {
        this.info = await infoService.info();

      } catch (error) {
        console.log(error);
      }
    },
    async getRetrieveInfo() {
      try {
        if (this.Auth) {
          this.info = await infoService.info();
        }


      } catch (error) {
        console.log(error);
      }
    },
    toggleSidebar() {
      const sidebar = document.querySelector('#sidebar');
      const content = document.querySelector('#content');
      sidebar.classList.toggle('active');
      content.classList.toggle('active');
    },
    ...mapMutations(['setAuth']),
    // async logOut() {
    //   try {
    //     const headers = {
    //       Authorization: `Bearer ${localStorage.getItem('token')}`
    //     };
    //     await userService.logout({ headers });
    //     localStorage.removeItem('token');
    //     this.setAuth(false);
    //     this.$router.push({ name: 'login' });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

  },
  created() {
    this.retrieveInfo();
  }
}

</script>