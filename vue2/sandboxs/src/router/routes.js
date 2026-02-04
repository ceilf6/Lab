import Home from '../views/Home'
import About from '../views/About'
import Blog from '../views/Blog'
import Message from '../views/Message'

export default [
    { name: "Home", path: "/", component: Home }, // 一个对象就是一条匹配规则
    { name: "About", path: "/about", component: About },
    { name: "Blog", path: "/ariticle", component: Blog },
    { name: "Message", path: "/message", component: Message },
]