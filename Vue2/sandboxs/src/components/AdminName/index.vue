<template>
  <div class="admin-name">
    <span v-if="status === 'loading'">loading...</span>
    <template v-else-if="status === 'login'">
      <span>{{ admin.name }}</span>
      <a href="" @click.prevent="handleLoginOut">登出</a>
    </template>
    <router-link v-else :to="{ name: 'AdminLogin' }">Login</router-link>
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
      await this.$store.dispatch("loginOut");
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
