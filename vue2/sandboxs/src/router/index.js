import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home'
import About from '../views/About'
import Blog from '../views/Blog'
import Message from '../views/Message'

Vue.use(VueRouter); // 使用Vue插件 - Router
// 本质是构造函数
const router = new VueRouter({
    // 插件配置
    routes: [
        { path: "/", component: Home }, // 一个对象就是一条匹配规则
        { path: "/about", component: About },
        { path: "/blog", component: Blog },
        { path: "/message", component: Message },
    ]
})

export default router