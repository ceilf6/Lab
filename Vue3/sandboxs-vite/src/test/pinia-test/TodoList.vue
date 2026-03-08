<template>
  <div class="container">
    <div class="add">
      <input type="text" v-model="newItem" />
      <button @click="handleAdd">添加</button>
    </div>

    <div class="curList">
      <div v-for="(item, idx) in list.items" :key="idx">
        <div>{{ item.text }} {{ item.isCompleted ? "完成" : "未完成" }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTodoListStore } from "../../store/useTodoListStore";
const store = useTodoListStore();
const { list } = storeToRefs(store);
const { addItem } = store;

import { ref } from "vue";
const newItem = ref("");
function handleAdd() {
  if (!newItem.value) return;
  //   list.value.items.push({
  //     // list 是 ref 得取一层 value
  //     text: newItem.value,
  //     isCompleted: false,
  //   });
  addItem(newItem.value); // 别忘记对 ref 取 value
  newItem.value = "";
}
</script>
