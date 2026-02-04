<template>
  <div id="app">
    <pager
      :current="current"
      :total="total"
      @pageChange="handlePageChange"
    ></pager>
    <!-- Vue 会自动将 $emit 的第二个参数传给处理函数的第一个参数 -->
    <!-- @pageChange="(newPage) => handlePageChange(newPage)" -->

    <p v-if="visible">v-if -> 没有vnnode -> 渲染节点数少</p>
    <p v-show="visible">v-show -> 始终有vnode=>DOM - 稳定</p>
    <button @click="changeVisible">切换显示</button>

    <router-view></router-view>
    <router-link to="/">主页</router-link>
    <router-link to="/blog">博客</router-link>
    <router-link to="/about">关于我</router-link>
    <router-link to="/message">留言板</router-link>
  </div>
</template>

<script>
import pager from "./components/Pager";
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

<style>
/* router-link 会被渲染成 <a> 标签，所以要选择 a 元素 */
#app > a {
  display: block;
}
/*
或者更精确一些：使用 Vue Router 自动添加的类名
.router-link-active,
.router-link-exact-active {
  display: block;
}
*/
</style>
