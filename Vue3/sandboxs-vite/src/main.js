import { createApp } from 'vue'
import App from './App.vue'

// import './index.css'

// require('./index.css') // 直接报错
/*
因为 Vite 利用的是“现代浏览器支持ESM”这一特性，在开发时将模块文件直接传输给浏览器，不需要打包，是实时编译
所以 CMJ 是不支持的
*/

/*
new Vue({
  store, // 注册 vuex 数据仓库
  router: router,
  render: h => h(App),
}).$mount('#app')
*/
const app = createApp(App)

import router from './router'
app.use(router) // 使用插件

app.mount('#app')
