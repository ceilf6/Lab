<template>
  <div id="app">
    <h1>{{ a }}</h1>
    <h1>{{ b }}</h1>
    <h1>{{ com }}</h1>
    <button @click="changeName('ceilf7')"></button>

    <button @click="com = 'I\'m ceilf7'"></button>
    <!-- 直接调用 set 函数，没有 get -->
    <!-- 没有改动依赖项，不会导致重新渲染 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: "I'm",
      b: "ceilf6",
    };
  },
  computed: {
    com: {
      get() {
        console.log("computed");
        return this.a + " " + this.b;
      },
      set() {
        console.log("直接修改computed");
      },
    },
  },
  methods: {
    getCom() {
      console.log("methods called");
      return this.a + " " + this.b;
    },
    changeName(newB) {
      this.b = newB;
    },
  },
};
</script>
