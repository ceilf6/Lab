<!-- 交互循环：路由信息 ⇒ 激活状态、文章列表 ⇒ 用户点击操作 ⇒ 更改路由信息  -->

<template>
  <div class="blog-container">
    <!-- <h1>
      <a href="https://blog.csdn.net/2301_78856868"
        >Welcome to ceilf6's Blogs</a
      >
      <span v-if="$route.params.categoryId">
        分类ID: {{ $route.params.categoryId }}
      </span>
    </h1> -->
    <ThreeColumnLayout>
      <!-- 注意 ThreeColumnLayout 中的 main 是类名、不是插槽 name -->
      <BlogList></BlogList>
      <template v-slot:right>
        <BlogCategory></BlogCategory>
      </template>
    </ThreeColumnLayout>
  </div>
</template>

<script>
import { ThreeColumnLayout } from "@/components";
import BlogList from "./components/BlogList.vue";
import BlogCategory from "./components/BlogCategory.vue";

export default {
  components: {
    ThreeColumnLayout,
    BlogList,
    BlogCategory,
  },
  created() {
    console.log("=== Blog index.vue created", this.$route);
  },
};
</script>

<style scoped lang="less">
.blog-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    flex: 0 0 auto;
  }
  .layout-container {
    flex: 1 1 auto;
  }
}
</style>
