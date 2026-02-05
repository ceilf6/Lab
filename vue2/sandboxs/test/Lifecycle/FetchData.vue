<template>
  <div>
    <h1 v-if="branches">branches: {{ branches }}</h1>
    <h1 v-if="!branches">loading...</h1>
  </div>
</template>

<script>
import getLab from "../../src/api/test";

export default {
  data() {
    return {
      branches: 0,
      offset: 10,
    };
  },
  async created() {
    const res = await getLab();
    console.log(res);
    // request 封装已经自动取了两层data
    this.branches = res.branches + this.offset; // 如果在 beforeCreated 阶段就取不到 this.

    // 同时 async 语法糖本质是 Promise 所以数据更新其实是异步回调，并不会等 created() 结束后再往下 beforeMount
  },
  updated() {
    console.log("updated");
  },
};
</script>
