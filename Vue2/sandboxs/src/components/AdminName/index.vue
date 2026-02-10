<template>
  <div class="admin-name">
    <span v-if="status === 'loading'">loading...</span>
    <template v-else-if="status === 'login'">
      <span>{{ admin.name }}</span>
      <a href="" @click.prevent="handleLoginOut">登出</a>
    </template>
    <router-link v-else :to="{ name: 'AdminLogin' }" exact-path
      >Login</router-link
    >
    <!-- 添加 exact-path 防止路由中 hash 和 query 对样式匹配的影响 -->
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters("loginAdmin", ["status"]),
    ...mapState("loginAdmin", ["admin"]),
  },
  methods: {
    async handleLoginOut() {
      // 注意别忘记命名空间前缀
      await this.$store.dispatch("loginAdmin/loginOut");
      this.$router.push("/admin/login");
    },
  },
};
</script>

<style scoped>
.admin-name {
  display: inline-block;
}
.admin-name a,
.admin-name span {
  margin-right: 15px;
}
</style>
