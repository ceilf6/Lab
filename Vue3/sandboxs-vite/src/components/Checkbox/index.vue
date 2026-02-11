<template>
  <!-- <h1>=== 静态节点 ===</h1> -->
  <!-- <Todos /> -->
  <!-- <PreStr></PreStr> -->

  <!-- <CheckEditor :modelValue="checked" @update:modelValue="checked = $event" /> -->
  <!-- <CheckEditor
    v-model:checked="checkedVal"
    v-model:title.trim="titleVal"
  ></CheckEditor>
  <h1>{{ checkedVal }}</h1>
  <h1>{{ titleVal }}</h1> -->

  <div class="container">
    <div class="list">
      <strong>编辑区</strong>
      <div class="list">
        <CheckEditor
          v-for="item in showData"
          :key="item.id"
          v-model:title="item.name"
          v-model:checked="item.checked"
        ></CheckEditor>
      </div>
    </div>
    <div class="list">
      <strong>展示区</strong>
      <div>
        <!-- <template v-for="item in sells" v-if="item.checked"></template> -->
        <template v-for="(item, idx) in checkedData" :key="item.id">
          <span>{{ idx + 1 }}. </span>
          <strong>{{ item.name }}</strong>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// import { Todos, CheckEditor } from "./components";
import CheckEditor from "./CheckEditor.vue";
// import PreStr from "./test/PreStr.vue";
import { ref, computed } from "vue";

const defaultShow = [
  { name: "ceilf5", checked: true, id: 1 },
  { name: "ceilf6", checked: false, id: 2 },
  { name: "ceilf7", checked: true, id: 3 },
];

export default {
  components: {
    // Todos,
    // PreStr,
    CheckEditor,
  },
  //   data() {
  //     return {
  //       checkedVal: true,
  //       titleVal: "ceilf6",
  //     };
  //   },
  setup() {
    const showDataRef = ref(defaultShow);

    const checkedDataRef = computed(() =>
      showDataRef.value.filter((it) => it.checked),
    );

    return {
      showData: showDataRef,
      checkedData: checkedDataRef,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
  width: 880px;
  margin: 50px auto;
}
.list {
  display: flex;
  margin: 1em 0;
  align-items: center;
}
strong {
  margin-right: 1em;
}
</style>
