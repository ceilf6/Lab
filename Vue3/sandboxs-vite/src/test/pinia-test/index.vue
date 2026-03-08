<template>
  <div>
    <Counter></Counter>
    <TodoList></TodoList>
  </div>
</template>

<script>
import Counter from "./Counter.vue";
import TodoList from "./TodoList.vue";

export default {
  components: {
    Counter,
    TodoList,
  },
};
</script>
