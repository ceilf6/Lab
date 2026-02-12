import { createRouter, createWebHistory } from 'vue-router'
// 不再是构造函数了，而是通过具名导出
import routes from './routes'

export default createRouter({
    history: createWebHistory(),//baseURL) // 即 Vue2 的 mode: 'history'
    routes
})