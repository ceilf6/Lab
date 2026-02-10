<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-item">
      <label>账号：</label>
      <input type="text" v-model="loginId" />
    </div>
    <div class="form-item">
      <label>密码：</label>
      <input type="password" autocomplete="new-password" v-model="loginPwd" />
    </div>
    <div class="form-item">
      <label></label>
      <button :disabled="loading">
        {{ loading ? "loading..." : "登录" }}
      </button>
    </div>
  </form>
</template>
<script>
import { mapState } from "vuex";
// mapState 会返回一个对象
/**
 * {
 *  loading(){
 *    return this.$store.state.loginAdmin.loading
 *  }
 * }
 */

export default {
  data() {
    return {
      loginId: "",
      loginPwd: "",
      // loading: false,
    };
  },
  computed: {
    // 封装一下计算属性，避免长串链式调用
    // loading() {
    //   return this.$store.state.loginAdmin.loading;
    // },
    ...mapState("loginAdmin", ["loading"]),
  },
  methods: {
    async handleSubmit() {
      const resp = await this.$store.dispatch("loginAdmin/login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      });
      console.log("登录", this.loginId, this.loginPwd);
      if (resp) {
        // "服务器"如果返回成功就进行跳转
        alert("登录成功");
        this.$router.push(this.$route.query.returnurl ?? "/admin/action");
      } else {
        for (const el of document.querySelectorAll(".form-item input")) // 清空输入
          el.value = "";
        alert("账号或密码错误");
      }
    },
  },
};
</script>
<style scoped>
.form-item {
  margin: 1em auto;
  width: 300px;
  display: flex;
  align-items: center;
}
.form-item input {
  height: 26px;
  font-size: 14px;
  flex: 1 1 auto;
}
.form-item label {
  width: 70px;
}
.form-item button {
  flex: 1 1 auto;
  background: #50936c;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  height: 35px;
  font-size: 16px;
}
</style>
