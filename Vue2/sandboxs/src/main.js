import Vue from 'vue'
import App from './App.vue'

import './styles/global.less'

import './mock'      // 注意得在最开始配置mock拦截，后面目标XHR才会被扼杀

import router from './router'
import { toast } from './utils'
Vue.prototype.$toast = toast

// 注册全局指令，必须在创建 Vue 实例之前
import vLoading from './directives/loading/index'
Vue.directive("loading", vLoading)

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')

// ========= 测试 =========
// import './api/test'