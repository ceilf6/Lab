<!-- Vue3/sandboxs-vite/src/test/IfElse.vue -->

<template>
  <div>
    <div v-if="isAccount" key="account">
      <label>账号：</label>
      <input type="text" />
    </div>
    <div v-else key="iphone">
      <label>手机号：</label>
      <input type="text" />
    </div>
    <button @click="isAccount = !isAccount">切换登录方式</button>
  </div>
</template>

<script>
// import { ref } from "vue";

export default {
  data() {
    // const isAccountRef = ref(false);

    return {
      isAccount: false,
    };
  },
};
</script>
