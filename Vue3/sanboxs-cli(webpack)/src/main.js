import { createApp } from 'vue'
import App from './App.vue'

/*
new Vue({
  store, // 注册 vuex 数据仓库
  router: router,
  render: h => h(App),
}).$mount('#app')
*/
const app = createApp(App)
app.mount('#app')
