<template>
  <h1>{{ num }}</h1>
  <h1>{{ msg }}</h1>
  <h1>{{ obj.name }}</h1>
  <h1>{{ obj.age }}</h1>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      msg: "nihao",
      obj: {
        name: "ceilf6",
        age: 22,
      },
    };
  },
  renderTracked(e) {
    console.log(e);
  },
};
</script>
