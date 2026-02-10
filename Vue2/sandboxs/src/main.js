import Vue from 'vue'
import App from './App.vue'

import './styles/global.less'

import './mock'      // 注意得在最开始配置mock拦截，后面目标XHR才会被扼杀

import router from './router'
import { toast } from './utils'
Vue.prototype.$toast = toast

// 注册全局指令，必须在创建 Vue 实例之前
import { vLoading, vLazy } from './directives'
Vue.directive("loading", vLoading)
Vue.directive('lazy', vLazy)

import store from './store'

// 恢复登录状态
store.dispatch("loginAdmin/whoAmI")

new Vue({
  store, // 注册 vuex 数据仓库
  router: router,
  render: h => h(App),
}).$mount('#app')

// ========= 测试 =========
// import './api/test'


// ========= 测试事件总线 =========
// import eventBus from '../eventBus'

// function handler1(data) {
//   console.log("handler1", data);
// }
// function handler2(data) {
//   console.log("handler2", data);
// }
// eventBus.$on("event1", handler1);
// eventBus.$on("event1", handler2);
// eventBus.$on("event2", handler1);

// window.eventBus = eventBus;
// window.handler1 = handler1;
// window.handler2 = handler2;

// eventBus.$emit("event1", "datas from event1")
// eventBus.$emit("event2", "datas from event2")

// eventBus.$off("event1", handler1)
// eventBus.$emit("event1", "datas from event1")