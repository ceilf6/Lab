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

stop(); // 返回的函数是用于停止监听的
state.a++;
// 无事发生

/*
但是由于 stop 是同步执行的，就不会触发回调了
也就是说只有一次输出
1 0 
*/