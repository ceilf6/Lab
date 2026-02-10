<!-- 鉴权等待页 -->

<template>
  <div>
    <h1>loading...</h1>
    <img :src="loadingImg" alt="" />
  </div>
</template>

<script>
import defaultImg from "@/assets/defaultImg.gif";

export default {
  data() {
    return {
      loadingImg: defaultImg,
    };
  },
  // 不能直接 watch:{ ["$store.getters['loginAdmin/status']"] } 在组件实例上去找这个路径
  // 因为 无法解析JS表达式
  created() {
    this.unWatch = this.$watch(
      // 或者用 vuex 中的 this.$store.watch
      () => this.$store.getters["loginAdmin/status"], // 监听对象
      (newVal) => {
        if (newVal !== "loading") {
          // 如果结束了鉴权，那么就再次尝试进入目标页
          this.$router
            .push(this.$route.query.returnurl || "./admin/home")
            .catch(() => {}); // 防止多次重定向报错 uncatch
        }
      }, // 目标变化时的执行函数
      {
        immediate: true,
      },
    );
  },
  destroyed() {
    this.unWatch(); // 卸载监听
  },
};
</script>
