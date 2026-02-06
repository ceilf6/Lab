<template>
  <div>
    <p ref="para">some paragraph</p>
    <ChildComp ref="comp" />
    <button @click="handleClick">查看所有引用</button>
  </div>
</template>

<script>
import ChildComp from "./ChildComp";
export default {
  components: {
    ChildComp,
  },
  methods: {
    handleClick() {
      // 获取持有的所有引用
      console.log(this.$refs);
      /*
        {
        	para: p元素（原生DOM）,
        	comp: ChildComp的组件实例
        }
        */

      // 通过 ref 父组件就能拿到子组件的对象数据、方法
      console.log(this.$refs.comp.a, this.$refs.comp.b);
      this.$refs.comp.a = 3;
      this.$refs.comp.b = 4;
      this.$refs.comp.m1();
    },
  },
};
</script>
