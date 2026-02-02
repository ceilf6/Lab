<template>
  <div id="app">
    <Avatar :url="require('@/assets/ceilf6.png')" />
  </div>
</template>

<script>
// SFC 高聚合

import Avatar from './components/Avatar.vue';
export default {
  components: {
    Avatar
  },
};
</script>

<style lang="less">
</style>
