<template>
  <h1>Services with {{ this.service }}</h1>
</template>

<script>
import Serviceservice from "@/services/service.service";
export default {
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      service: null,
      message: "",
    };
  },
  methods: {
   
    async getService(id) {
      try {
        this.service = await Serviceservice.getService(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
  },
  created() {
    this.getService(this.id);
    this.message = "";
  },
};
</script>
