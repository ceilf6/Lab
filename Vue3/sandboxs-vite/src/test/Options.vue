<template>
  <button @click="handleClick">
    {{ count }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleClick() {
      console.log(this);
      /*
      2 中 this 直接指向的是当前实例
      3 中 this 指向的是一个 Proxy 代理对象，由代理对象去对接组件实例
      */
      this.count++;
    },
  },
};
</script>

<style></style>
