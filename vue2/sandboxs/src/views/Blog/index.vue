<template>
  <div>
    <h1>
      <a href="https://blog.csdn.net/2301_78856868"
        >Welcome to ceilf6's Blogs</a
      >
      <span v-if="$route.params.categoryId">
        分类ID: {{ $route.params.categoryId }}
      </span>
    </h1>
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
