<template>
  <h1>当前时间：{{ current }}</h1>
</template>

<script>
export default {
  data() {
    return {
      current: this.getCurrent(),
      timer: null,
    };
  },
  methods: {
    getCurrent() {
      return new Date().toLocaleTimeString();
    },
  },
  created() {
    console.log("created");
    this.timer = setInterval(() => {
      console.log("timer still alive");
      this.current = this.getCurrent();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
    console.log("timer is destroyed, prevent from memory leak");
  },
};
</script>

<style></style>
