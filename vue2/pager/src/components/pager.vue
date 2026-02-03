<template>
  <!-- 组件根元素类名一般有 组件名-container 
  方便外层父组件预判内层根元素类名 => 作用域样式会对子组件根元素产生影响 -->
  <div class="pager-container" v-if="totalPageNumber > 1">
    <!-- 只有1总页数大于 1 的时候才显示，由于不经常变动，所以 v-if 可以 -->

    <!-- 第 1 页没有往前 -->
    <a href="" :class="{ disabled: current === 1 }">|&lt;&lt;</a>
    <a href="" :class="{ disabled: current === 1 }">&lt;&lt;</a>

    <!-- 优先级：肯定先运行的 v-for ，所以后面可以放心用 n -->
    <a
      href=""
      v-for="(n, i) in numbers"
      :key="i"
      :class="{ active: n === current }"
      >{{ n }}</a
    >

    <a href="" :class="{ disabled: current === totalPageNumber }">&gt;&gt;</a>
    <a href="" :class="{ disabled: current === totalPageNumber }">&gt;&gt;|</a>

    <!-- <div>{{ visibleMin }}</div>
    <div>|</div>
    <div>{{ visibleMax }}</div> -->
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
    // 显示的最小数字
    visibleMin() {
      // 注意得取个 max 去兜底
      return Math.max(1, this.current - Math.floor(this.visibleNumber / 2));
    },
    visibleMax() {
      return Math.min(
        this.totalPageNumber,
        this.visibleMin + this.visibleNumber - 1,
      );
    },
    numbers() {
      const nums = [];
      for (let i = this.visibleMin; i <= this.visibleMax; ++i) {
        nums.push(i);
      }
      return nums;
    },
  },
};
</script>
