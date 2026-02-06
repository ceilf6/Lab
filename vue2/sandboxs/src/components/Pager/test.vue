<!-- vue serve ./src/components/Pager/test.vue -->

<template>
  <div id="app">
    <pager
      :current="current"
      :total="total"
      @pageChange="handlePageChange"
    ></pager>
    <!-- Vue 会自动将 $emit 的第二个参数传给处理函数的第一个参数 -->
    <!-- @pageChange="(newPage) => handlePageChange(newPage)" -->
  </div>
</template>

<script>
import pager from "./";
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
    handlePageChange(newPage) {
      // 注册事件 - 处理页码改变
      this.current = newPage;
      console.log(`加载第${this.current}页数据`);
    },
  },
};
</script>

<style></style>
