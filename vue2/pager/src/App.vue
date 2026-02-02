<template>
  <div id="app">
    <pager :current="2"></pager>
  </div>
</template>

<script>
import pager from "./components/pager.vue";
export default {
  components: {
    pager,
  },
};
</script>

<style></style>
