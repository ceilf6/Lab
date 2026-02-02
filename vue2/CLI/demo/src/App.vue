<template>
  <!-- 到时候会 直接把组件中的模板转换为render函数 -->
  <div id="app">
    <Avatar
      class="avatar-img"
      :url="require('@/assets/ceilf6.png')"
      :width="66"
      :height="66"
    />
    <!-- 传递数字得通过 绑定bind: JS注入 -->
  </div>
</template>

<script>
// SFC 高聚合

import Avatar from "./components/Avatar.vue";
export default {
  components: {
    Avatar,
  },
};
</script>

<style lang="less" scoped>
// 参照 webpack 的 CSS module 的思想，为解决类样式冲突的问题，通过 scoped 就会开启样式的作用域
// 到时候 类样式后面还会加上一个 [ ] 属性选择器确保选择的精确性
.avatar-img {
  border-radius: 50%;
  display: block;
}
</style>
