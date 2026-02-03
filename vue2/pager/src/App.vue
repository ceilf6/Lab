<template>
  <div id="app">
    <pager :current="1" :total="302"></pager>

    <p v-if="visible">v-if -> 没有vnnode -> 渲染节点数少</p>
    <p v-show="visible">v-show -> 始终有vnode=>DOM - 稳定</p>
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
