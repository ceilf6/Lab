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
