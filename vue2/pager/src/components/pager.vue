<template>
  <!-- 组件根元素类名一般有 组件名-container 
  方便外层父组件预判内层根元素类名 => 作用域样式会对子组件根元素产生影响 -->
  <div class="pager-container">
    <a href="" class="disabled">&lt;&lt;</a>
    <a href="" class="active">&lt;&lt;</a>

    <a href="">1</a>
    <a href="">2</a>
    <a href="">3</a>
    <a href="">4</a>
    <a href="">5</a>
    <a href="">6</a>
    <a href="">7</a>
    <a href="">8</a>
    <a href="">9</a>
    <a href="">10</a>

    <a href="">&gt;&gt;</a>
    <a href="">&gt;&gt;</a>
  </div>
</template>

<style lang="less" scoped>
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 6px;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-size: bold;
      cursor: text;
    }
  }
}
</style>

<script>
export default {
  props: {
    // 当前所在页
    current: {
      type: Number,
      default: 1,
    },
    // 总共数据数量
    total: {
      type: Number,
      default: 0,
    },
    // 页容量
    limit: {
      type: Number,
      default: 10,
    },
    // 分页器可见页码数量
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
};
</script>
