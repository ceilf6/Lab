<template>
  <img
    :src="url"
    alt=""
    :style="{ width: width + 'px', height: height + 'px' }"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String, // 类型必须是字符串
      required: true, // 必传属性
    },
    width: Number,
    height: Number,
  },
};
</script>

<style></style>
