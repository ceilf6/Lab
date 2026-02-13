import { reactive, ref, watchEffect } from "vue";

const state = reactive({ a: 1, b: 2 });
const count = ref(0);

const stop = watchEffect(() => {
    console.log(state.a, count.value); // 内部会通过 get 收集依赖
});

// 第一次会立即执行 => 1 0 

state.b++
// 无事发生，因为 b 不是依赖

state.a++;
state.a++;
count.value++;
count.value++;
// 响应数据变化后回调函数的运行是加入到微任务队列的、异步的，所以是一起处理、只会输出一次

setTimeout(() => {
    stop(); // 返回的函数是用于停止监听的
    state.a = 100; // 无事发生
}, 1000)

state.a++; // 属于同步代码，仍会进入到微任务队列中

/*
输出：
1 0 
4 2 

因为我将 stop 放到了宏任务中，stop不会影响之前的微任务执行

执行流程：
1. 同步代码阶段：
   → watchEffect 立即执行 => 输出 1 0
   → 修改 state.a, count.value（触发依赖更新，watchEffect 回调加入微任务队列）
   → 调用 setTimeout（同步执行，注册定时器，1000ms 后将回调加入宏任务队列）
   → state.a++（继续触发更新，合并到微任务队列）

2. 微任务队列执行：
   → watchEffect 回调执行 => 输出 4 2

3. 1000ms 后，宏任务执行：
   → setTimeout 的回调执行：stop() + state.a = 100（已停止，无输出）
*/