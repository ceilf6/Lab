<template>
  <!-- <h1>=== 静态节点 ===</h1> -->
  <!-- <Todos /> -->
  <!-- <PreStr></PreStr> -->

  <!-- <CheckEditor :modelValue="checked" @update:modelValue="checked = $event" /> -->
  <CheckEditor
    v-model:checked="checkedVal"
    v-model:title.trim="titleVal"
  ></CheckEditor>
  <h1>{{ checkedVal }}</h1>
  <h1>{{ titleVal }}</h1>
</template>

<script>
import { Todos, CheckEditor } from "./components";
import PreStr from "./test/PreStr.vue";

export default {
  components: {
    Todos,
    PreStr,
    CheckEditor,
    CheckEditor,
  },
  data() {
    return {
      checkedVal: true,
      titleVal: "ceilf6",
    };
  },
};
</script>
