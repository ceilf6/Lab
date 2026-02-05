<template>
  <h1>branches: {{ branches }}</h1>
</template>

<script>
import getLab from "../../src/api/test";

export default {
  data() {
    return {
      branches: 0,
      offset: 10,
    };
  },
  async created() {
    const res = await getLab();
    console.log(res);
    this.branches = res + this.offset;
  },
};
</script>
