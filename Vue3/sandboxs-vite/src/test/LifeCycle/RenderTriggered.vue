<template>
  <h1>{{ count }}</h1>
  <button @click="count++">click</button>
</template>

<script>
import { onRenderTriggered } from "vue";
import { ref } from "vue";

export default {
  setup() {
    let count = ref(0);

    onRenderTriggered((e) => {
      console.log(e);
    });

    return {
      count,
    };
  },
};
</script>
