import Home from '../views/Home'
import About from '../views/About'
import Blog from '../views/Blog'
import Message from '../views/Message'

export default [
    { path: "/", component: Home }, // 一个对象就是一条匹配规则
    { path: "/about", component: About },
    { path: "/blog", component: Blog },
    { path: "/message", component: Message },
]