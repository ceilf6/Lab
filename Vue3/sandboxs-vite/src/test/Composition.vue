<template>
  <p>
    <!-- <button @click="handleClick"> -->
    {{
      countRef
      /* 在通过实例代理访问 countRef 的时候，代理对象会自动解包返回 .value */
    }}
    <!-- </button> -->
  </p>
  <button @click="handleIncrease">增加</button>
  <button @click="handleDecrease">减少</button>
</template>

<script>
import { ref } from "vue";
import { useCount } from "../components";

export default {
  setup() {
    // 在所有生命周期钩子函数之前调用
    // 并且 setup 的 this -> undefined
    console.log(this);

    // let countRef = 0;
    let countRef = ref(0);
    console.log(countRef); // ref 将变量封装到了对象中，设置了访问器进行依赖收集
    const handleClick = () => {
      console.log("handle click");
      // countRef++; // 没有 ref 的 countRef 增加时没有 re-render 、即变量不是响应式的
      countRef.value++; // 在 setup 中，还没有代理、变量是一个对象
    };
    return {
      // countRef,
      // handleClick,
      ...useCount(),
    }; // setup 返回的所有属性都会挂载到实例对象上
  },
};
</script>
