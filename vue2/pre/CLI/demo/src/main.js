// 入口启动文件

import Vue from 'vue'
import App from './App.vue'

// 生产环境提示
// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
