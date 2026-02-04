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
    <router-link :to="{ name: 'Home' }" exact>主页</router-link>
    <router-link :to="{ name: 'Blog' }">博客</router-link>
    <router-link :to="{ name: 'About' }" exact>关于我</router-link>
    <router-link :to="{ name: 'Message' }" exact>留言板</router-link>
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

/* 通过 VueRouter 自动添加的类名
router-link-exact-active router-link-active
实现选中效果 */
/*
为了例如 blog/ariticle/1 也能显示匹配，精准匹配 router-link-exact-active 不行
所以用 router-link-active
但是 about/something 不想显示匹配效果
于是得将其他的 router-link 打开 exact 布尔属性
*/
#app > a.router-link-active {
  color: #bf91f3;
}
</style>
