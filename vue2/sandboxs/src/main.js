import Vue from 'vue'
import App from './App.vue'

import './styles/global.less'
import VueRouter from 'vue-router';

Vue.use(VueRouter); // 使用Vue插件 - Router
// 本质是构造函数
const router = new VueRouter()

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
