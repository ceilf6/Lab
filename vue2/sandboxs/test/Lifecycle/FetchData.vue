<template>
  <div>
    <h1 v-loading:parm.p1.p2="isLoading">branches: {{ branches }}</h1>
    <!-- <Loading v-if="isLoading" /> -->
  </div>
</template>

<script>
import getLab from "@/api/test";
// import { Loading } from "@/components";

export default {
  components: {
    // Loading,
  },
  data() {
    return {
      branches: 0,
      offset: 10,
      isLoading: true,
    };
  },
  async created() {
    const res = await getLab();
    console.log(res);
    // request 封装已经自动取了两层data
    this.branches = res.branches + this.offset; // 如果在 beforeCreated 阶段就取不到 this.

    // 同时 async 语法糖本质是 Promise 所以数据更新其实是异步回调，并不会等 created() 结束后再往下 beforeMount

    this.isLoading = false; // 异步完成后结束loading
  },
  updated() {
    console.log("updated");
  },
};
</script>
