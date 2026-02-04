import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter); // 使用Vue插件 - Router
// 本质是构造函数
const router = new VueRouter({
    // 插件配置
    routes, // 路由匹配模式
    mode: 'history'
})

export default router