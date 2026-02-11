<!-- Vue2/sandboxs/src/test/IfElse.vue -->

<template>
  <div>
    <div v-if="isAccount">
      <label>账号：</label>
      <input type="text" />
    </div>
    <div v-else>
      <label>手机号：</label>
      <input type="text" />
    </div>
    <button @click="isAccount = !isAccount">切换登录方式</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const isAccountRef = ref(false);

    return {
      isAccount: isAccountRef,
    };
  },
};
</script>
