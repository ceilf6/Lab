<template>
  <img class="loading-container" :src="loadingUrl" alt="" />
</template>

<script>
import loadingUrl from "@/assets/loading.svg";
export default {
  data() {
    return {
      loadingUrl, // 如果 src 用的是 data 的动态数据，webpack 就无法分析（静态的话会在分析后处理为打包后的路径
      // ，得用模块导入
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.loading-container {
  .self-center();
}
</style>
