import Vue from 'vue'
import App from './App.vue'

import './styles/global.less'

import router from './router'
import { toast } from './utils'
Vue.prototype.$toast = toast

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')

// ========= 测试 =========

// import './mock'      // 注意得在最开始配置mock拦截，后面目标XHR才会被扼杀
// import './api/test'