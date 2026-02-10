<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
    <!-- @scroll="handleScroll"> -->

    <!-- isLoading 是从混入 fetchData 中拿到的 -->
    <!-- Vue3 的 composition 组合式更便利 -->
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <!-- 循环的元素，不是切换显示，v-show 不合适 -->
          <a href="">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </a>
        </div>
        <div class="main">
          <a href="">
            <h2>{{ item.title }}</h2>
          </a>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <a href="/article/cate/8" class="">{{ item.category.name }}</a>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>

    <Empty v-if="data?.rows?.length === 0 && !isLoading" />

    <!-- 路由信息 => 分页参数 -->
    <!-- fetchData => 总数据量 -->
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import { Pager, Empty } from "@/components";
import { fetchData, mainScroll } from "@/mixins";
import { getBlogs } from "@/api/blog.js";
import { formatDate } from "@/utils";
// import eventBus from "@/eventBus";
export default {
  mixins: [fetchData({}), mainScroll("mainContainer")],
  components: {
    Pager,
    Empty,
  },
  computed: {
    // 获取路由信息
    routeInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  methods: {
    formatDate, // 导入后记得配置到组件中，否则模版中不能用
    // handleScroll() {
    //   eventBus.$emit("scroll");
    // },
    async fetchData() {
      console.log("=== BlogList fetchData 方法被调用", this.routeInfo);
      // 将路由信息传入 fetch 参数
      const res = await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId,
      );
      console.log("=== BlogList res", res);
      return res;
    },
    // 页码变化 => 改变路由
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      // 跳转到 当前的分类id  当前的页容量  newPage的页码
      if (this.routeInfo.categoryId === -1) {
        // 当前没有分类
        // /article?page=${newPage}&limit=${this.routeInfo.limit}
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        // 有分类的话得传入参数
        // /article/cate/${this.routeInfo.categoryId}?page=${newPage}&limit=${this.routeInfo.limit}
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    // 观察路由this.$route ⇒ fetch new Data
    $route: {
      async handler() {
        this.isLoading = true;
        // 设置滚动高度为0 ，往上切
        this.$refs.mainContainer.scrollTop = 0;
        this.data = this.data = await this.fetchData(); // 不需要参数，fetchData 内部就用的 计算属性
        // {
        //   total: 0,
        //   rows: [],
        // };
        this.isLoading = false;
      },
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth; // 平滑滚动
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
