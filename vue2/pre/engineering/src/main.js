// 入口模块文件
// 创建 vue 实例
// 只是作为启动文件，渲染组件 App 虚拟节点

// 注意 type = "module" 时浏览器要求相对导入必须带扩展名
import Vue from './vue.browser.js'
import App from './App.js'

new Vue({
    // 最顶层的Vue作为一个组件，其目的就是涵盖所有需要渲染的目标
    render: (h) => h(App)
    // {
    //     return h(App)
    // },

    // 等价于
    // components: {
    //     App
    // },
    // template: `<App />`
}).$mount('#app')
