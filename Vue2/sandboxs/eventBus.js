// 事件总线 - 观察者模式
// 方便组件之间通信、组件和普通模块通信、事件处理
/*
目标：
1. 提供监听某个事件的接口
2. 提供取消监听的接口
3. 触发事件的接口（可传递数据）
4. 触发事件后会自动通知监听者
*/

// 观察者列表
// 事件: [回调函数] 如 { "event1": Set(handler1,handler2) }
const listeners = {};

export default {
    // 监听某一个事件
    $on(eventName, handler) {
        if (!listeners[eventName]) listeners[eventName] = new Set(); // 内部通过 Set 防止重复
        listeners[eventName].add(handler)
    },
    // 取消 handler 对 eventName 事件的监听
    $off(eventName, handler) {
        if (!listeners[eventName]) return
        listeners[eventName].delete(handler)
    },
    // 触发事件
    $emit(eventName, ...args) { // 往事件总线上抛事件相关的数据
        if (!listeners[eventName]) return
        for (const handler of listeners[eventName]) handler(...args)
    }
}

// 因为 Vue 自带 $emit, $on, $off 实例成员
// 直接导出一个 Vue 实例即可
// import Vue from "vue";
// export default new Vue({});