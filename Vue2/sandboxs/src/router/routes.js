import Home from '../views/Home'
import About from '../views/About'
import Blog from '../views/Blog'
import Message from '../views/Message'
import Admin from '../views/Admin'
import AdminHome from '../views/Admin/component/Home.vue'
import AdminLogin from '../views/Admin/component/Login.vue'
import AdminAction from '../views/Admin/component/AdminAction.vue'
import Loading from '../views/Loading'

export default [
    { name: "Home", path: "/", component: Home }, // 一个对象就是一条匹配规则
    { name: "About", path: "/about", component: About },
    { name: "Blog", path: "/article", component: Blog },
    { name: "CategoryBlog", path: "/article/cate/:categoryId", component: Blog },
    { name: "Message", path: "/message", component: Message },
    // { name: "Admin", path: "/admin", component: Admin },
    // { name: "AdminHome", path: "/admin/home", component: AdminHome },
    // { name: "AdminLogin", path: "/admin/login", component: AdminLogin }
    {
        name: "Admin",
        path: "/admin",
        component: Admin,
        children: [
            { name: "AdminHome", path: "home", component: AdminHome },
            { name: "AdminLogin", path: "login", component: AdminLogin },
            {
                name: "AdminAction", path: "action", component: AdminAction,
                meta: { auth: true } // 挂上额外信息 meta 用于 to 路由鉴权
            }
        ]
    },
    { name: "Loading", path: "/loading", component: Loading }
]