<template>
  <!-- 组件根元素类名一般有 组件名-container 
  方便外层父组件预判内层根元素类名 => 作用域样式会对子组件根元素产生影响 -->
  <div class="pager-container" v-if="totalPageNumber > 1">
    <!-- 只有1总页数大于 1 的时候才显示，由于不经常变动，所以 v-if 可以 -->

    <!-- 第 1 页没有往前 -->
    <a href="" :class="{ disabled: current === 1 }">&lt;&lt;</a>
    <a href="" :class="{ disabled: current === 1 }">&lt;&lt;</a>

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

    <a href="" :class="{ disabled: current === totalPageNumber }">&gt;&gt;</a>
    <a href="" :class="{ disabled: current === totalPageNumber }">&gt;&gt;</a>
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
    // 总数据条数
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
  computed: {
    // 总页数
    totalPageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    numbers() {
      return [7, 8, 9, 10];
    },
  },
};
</script>
