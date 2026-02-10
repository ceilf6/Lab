import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

import store from '../store'

Vue.use(VueRouter); // 使用Vue插件 - Router
// 本质是构造函数
const router = new VueRouter({
    // 插件配置
    routes, // 路由匹配模式
    mode: 'history' // 路由模式
})

// 导航守卫、鉴权拦截
// 导航切换时（包含刷新页面的第一次）时运行
/**
 * from: 之前的路由对象
 * to: 即将进入的路由对象
 * next: 确认函数，调用该函数：
    * 无参时会直接进入to，
    * 有参数时根据参数进入新的导航
        * 那么就可以通过 next 操控走向
 * 不调用时 next 就不会跳转
 */
router.beforeEach((to, from, next) => {
    if (to?.meta.auth) { // 需要鉴权
        const status = store.getters["loginAdmin/status"]
        if (status === "login") {
            // feature: 例如添加判断 store 中 user 是否有权力等等、拓展性很强
            next()
        } else if (status === "unlogin") {
            next({
                path: "/admin/login",
                query: {
                    returnurl: to.fullPath, // 记录目标页、等鉴权完毕后重定向
                },
            });
        } else if (status === "loading") {
            next({
                path: "/loading", // 注意没有 admin/ 前缀
                query: {
                    returnurl: to.fullPath, // 记录目标页、等鉴权完毕后重定向
                },
            });
        }
    } else {
        next() // 不需要鉴权直接走就好
    }
})

export default router