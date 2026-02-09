<template>
  <LoadingButton @buttonClicked="handleClick" :click="handleClick" />
</template>

<script>
import LoadingButton from "./index";
export default {
  components: {
    LoadingButton,
  },
  methods: {
    handleClick() {
      // console.log("父组件", count);
      // 1
      // setTimeout(() => {
      //   // 处理完成
      //   callback("1. 回调函数");
      // }, 1000);

      // 2, 3
      return new Promise((resolve) => {
        setTimeout(() => {
          // resolve("2. Promise + $listeners");
          resolve("3. 直接 props 传下去");
        }, 1000);
      });
    },
  },
};
</script>

<style>
body {
  text-align: center;
}
</style>
