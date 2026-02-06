<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <TreeListMenu :list="list" @click="handleClick" />
  </div>
</template>

<script>
import TreeListMenu from "@/components/TreeListMenu";
import fetchData from "@/mixins/fetchData.js";
import { getBlogCategories } from "@/api/blog.js";
export default {
  mixins: [fetchData([])],
  // 只需要 mixins 中 created 的初始化一次即可，因为分类的数据不像 分页数据 一样会被路由数据影响
  components: {
    TreeListMenu,
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0, // reduce((pre, now) => 操作, preDefault)
      );
      const result = [
        { name: "全部", id: -1, articleCount: totalArticleCount },
        ...this.data,
      ];
      return result.map((it) => ({
        ...it,
        isSelected: it.id === this.categoryId, // 通过路由信息 => 选中
        aside: `${it.articleCount}篇`,
      }));
    },
  },
  methods: {
    async fetchData() {
      return await getBlogCategories();
    },
    handleClick(item) {
      // 注意方法名需要和递归组件中一致，否则上抛无法处理
      const query = {
        page: 1,
        limit: this.limit,
      };
      // 跳转到 当前的分类id  当前的页容量  newPage的页码
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  width: 250px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto; // 别忘记滚动条
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
