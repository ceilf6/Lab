<template>
  <div id="app">
    <pager
      :current="current"
      :total="total"
      @pageChange="handlePageChange($event, newPage)"
    ></pager>

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
      total: 202,
      current: 1,
    };
  },
  methods: {
    changeVisible() {
      this.visible = !this.visible;
    },
    handlePageChange($event, newPage) {
      // 注册事件 - 处理页码改变
      this.current = newPage;
      console.log(`加载第${this.current}页数据`);
    },
  },
};
</script>

<style></style>
