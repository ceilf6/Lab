// 数据仓库模块
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex); // 注册 Vuex 插件到 Vue 中

import { delay } from '@/utils' // utils 是具名导出的

const store = new Vuex.Store({
    // 仓库配置对象
    state: {
        count: 0
    },
    mutations: { // 配置状态变更方法：监控状态变更
        increase(state) { // state 是默认参数，自动将当前状态传入
            state.count++; // 增加方法：在当前状态count+1
        },
        decrease(state) {
            state.count--;
        },
        power(state, payload) { // payload 负载，存储调用状态变更方法的额外数据
            // payload 为 幂次
            state.count = state.count ** payload
        },
        /*
        mutations 方法中不允许副作用操作
        因为 vuex 会在受到 commit 运行对应 mutation 方法之后立即记录状态，并不会等待事件循环运行副作用方法结束
        */
        // sync(state){
        //     setTimeout(() => {
        //         state.count++;
        //     },1000)
        // }
    },
    actions: {
        // 通过 actions 专门处理异步
        // 通过 dispatch 即 调用commit 实现
        async asyncIncrease(ctx) {
            await delay(1000)
            ctx.commit("increase")
        },
        async asyncDecrease(ctx) {
            await delay(1000)
            ctx.commit("decrease")
        },
        async asyncPower(ctx, payload) {
            await delay(1000)
            ctx.commit("power", payload)
        }
    }
})

export default store