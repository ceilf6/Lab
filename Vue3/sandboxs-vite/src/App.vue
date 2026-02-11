<template>
  <!-- <h1>=== 静态节点 ===</h1> -->
  <Todos />
  <!-- <PreStr></PreStr> -->
</template>

<script>
import Todos from "./components/Todos.vue";
import PreStr from "./test/PreStr.vue";

export default {
  components: {
    Todos,
    PreStr,
  },
};
</script>
