// import Home from '../views/Home/index.vue'
// import About from '../views/About/index.vue'
// routes 规则 和 Vue2 的 router 类似

import { syncGetComp } from '../utils'

export default [
    { path: "/", component: syncGetComp("../views/Home/index.vue") },
    { path: '/about', component: syncGetComp("../views/About/index.vue") }
]