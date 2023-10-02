<script>
import Cart from "@/components/Cart.vue";
export default {
  components: {
    Cart
  },

};
</script>
<template>
  <div id="app">
   
      <router-view />
    </div>
    <Cart />
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>