<template>
  <button @click="showToast">点我提示</button>
</template>

<script>
import toast from "@/utils/toast";

window.toast = toast; // 挂载、方便测试

export default {
  methods: {
    showToast() {
      toast("操作成功", "success", 50000);
    },
  },
};
</script>
