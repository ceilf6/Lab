<template>
  <div class="home">
    <h1>Welcome to ceilf6's Home</h1>
    <button @click="showToast">click to toast</button>
    <Lifecycle />
    <FetchData></FetchData>
    <mountedDOM />
    <timerDestroyed></timerDestroyed>

    <IfElse></IfElse>
  </div>
</template>

<script>
import {
  Lifecycle,
  FetchData,
  mountedDOM,
  timerDestroyed,
} from "@/test/Lifecycle";
import IfElse from "../../test/IfElse.vue";

export default {
  components: {
    Lifecycle,
    FetchData,
    mountedDOM,
    timerDestroyed,
    IfElse,
  },
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
