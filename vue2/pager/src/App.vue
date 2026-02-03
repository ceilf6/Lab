<template>
  <div id="app">
    <pager :current="2"></pager>
    <p v-if="visible">hello, I'm ceilf6'</p>
    <button @click="changeVisible">切换显示</button>
  </div>
</template>

<script>
import pager from "./components/pager.vue";
export default {
  components: {
    pager,
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    changeVisible() {
      this.visible = !this.visible;
    },
  },
};
</script>

<style></style>
