import Home from '../views/Home/index.vue'
import About from '../views/About/index.vue'
// routes 规则 和 Vue2 的 router 类似
export default [
    { path: "/", component: Home },
    { path: '/about', component: About }
]