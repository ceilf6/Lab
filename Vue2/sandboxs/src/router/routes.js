// import Home from '../views/Home'
// import About from '../views/About'
// import Blog from '../views/Blog'
// import Message from '../views/Message'
// import Admin from '../views/Admin'
// import AdminHome from '../views/Admin/component/Home.vue'
// import AdminLogin from '../views/Admin/component/Login.vue'
// import AdminAction from '../views/Admin/component/AdminAction.vue'
// import Loading from '../views/Loading'

import { syncGetComp } from "../utils"

export default [
    { name: "Home", path: "/", component: syncGetComp(() => import(/* webpackChunkName: "home" */ "@/views/Home")), }, // 一个对象就是一条匹配规则
    { name: "About", path: "/about", component: syncGetComp(() => import(/* webpackChunkName: "about" */"@/views/About")), },
    { name: "Blog", path: "/article", component: syncGetComp(() => import(/* webpackChunkName: "blog" */"@/views/Blog")), },
    { name: "CategoryBlog", path: "/article/cate/:categoryId", component: syncGetComp(() => import(/* webpackChunkName: "blog" */ "@/views/Blog")), },
    { name: "Message", path: "/message", component: syncGetComp(() => import(/* webpackChunkName: "message" */ "@/views/Message")), },
    // { name: "Admin", path: "/admin", component: Admin },
    // { name: "AdminHome", path: "/admin/home", component: AdminHome },
    // { name: "AdminLogin", path: "/admin/login", component: AdminLogin }
    {
        name: "Admin",
        path: "/admin",
        component: syncGetComp(() => import(/* webpackChunkName: "admin" */ "@/views/Admin")),
        children: [
            { name: "AdminHome", path: "home", component: syncGetComp(() => import(/* webpackChunkName: "adminHome" */ "@/views/Admin/component/Home")), },
            { name: "AdminLogin", path: "login", component: syncGetComp(() => import(/* webpackChunkName: "adminLogin" */ "@/views/Admin/component/Login")) },
            {
                name: "AdminAction", path: "action",
                component: syncGetComp(() => import(/* webpackChunkName: "adminAction" */ "@/views/Admin/component/AdminAction")),
                meta: { auth: true } // 挂上额外信息 meta 用于 to 路由鉴权
            }
        ]
    },
    { name: "Loading", path: "/loading", component: syncGetComp(() => import(/* webpackChunkName: "loading" */ "@/views/Loading")), },
    { name: "notFound", path: '*', component: syncGetComp(() => import(/* webpackChunkName: "notFound" */ "@/views/NotFound")) }
]