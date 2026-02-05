<!-- effect-picture/vue2-lifecycle.png -->

<template>
  <div>
    <div id="test"></div>
    <div ref="ref"></div>
    <button @click="count++" ref="count">{{ count }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      count: 0,
    };
  },
  beforeCreate() {
    console.log("=== beforeCreate", this.data);
  },
  created() {
    console.log("=== created", this.data);
  },
  beforeMount() {
    console.log(
      "=== beforeMount",
      document.getElementById("test"),
      this.$refs.ref,
    );
  },
  mounted() {
    console.log("=== mounted", document.getElementById("test"), this.$refs.ref);
  },
  beforeUpdate() {
    console.log("=== beforeUpdate", "count:", this.$refs.count.innerHTML);
    // this.count拿到的是同步之后的结果，因为得数据更新才会导致re-render
  },
  updated() {
    console.log("=== updated", "count:", this.$refs.count.innerHTML);
  },
  beforeDestroy() {
    console.log("=== beforeDestroyed");
  },
  destroyed() {
    console.log("=== destroyed");
  },
};
</script>
