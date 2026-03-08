// 仓库文件
import { defineStore } from "pinia";
import delay from "../utils/delay";

// 第二个参数支持两种风格：options api 以及 composition api
export const useCounterStore = defineStore("counter", {
    // 目前是 选项式API 风格
    state: () => {
        return {
            num: 0,
        };
    },
    getters: {
        // 类似于 计算属性
        // 针对上面 state 的数据做一个二次计算
        doubleNum: (state) => state.num * 2,
    },
    actions: {
        // 同步方法
        increment() {
            this.num++;
        },
        decrement() {
            this.num--;
        },
        // 异步方法
        async asyncIncrement() {
            await delay(1000)
            this.increment();
        },
        async asyncDecrement() {
            await delay(1000)
            this.decrement();
        },
    },
});

