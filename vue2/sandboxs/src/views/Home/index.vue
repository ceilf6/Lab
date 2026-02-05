<template>
  <div class="home">
    <h1>Welcome to ceilf6's Home</h1>
    <button @click="showToast">click to toast</button>
  </div>
</template>

<script>
export default {
  methods: {
    showToast() {
      this.$toast({
        content: "nihao",
        type: "info",
        duration: 3000,
        // container: container,
        callback: () => console.log("我是回调函数，我成功被触发啦~"),
      });
    },
  },
};
</script>
