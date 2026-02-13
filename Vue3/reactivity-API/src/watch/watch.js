import { reactive, ref, watch } from "vue";

const state = reactive({ a: 1, b: 2 });
const count = ref(0);

// 等效于 Vue2 的 $watch
// 第一个参数得是表达式函数，用于声明依赖。像直接写 state.a 直接调用就相当于传了个 1 
watch([() => state.a, count], ([new1, new2], [old1, old2]) => {
    console.log("变化了");
});

console.log('count++')
count.value++;

console.log('a++')
state.a++;
console.log('a++')
state.a++;
console.log('a++')
state.a++;

// watch 和 watchEffect 一样都是在微任务中异步回调
/** 所以只有一次
 * count++
watch.js:14 a++
watch.js:16 a++
watch.js:18 a++
watch.js:8 变化了
 */