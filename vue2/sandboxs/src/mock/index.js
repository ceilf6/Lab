// AJAX 拦截规则
// 对目标 XHR 重新赋值
import Mock from 'mockjs'
Mock.setup({
    timeout: "1000-2000"
}) // 配置延迟、模拟异步

import './test'

// import './test2' // 等后端开发完毕后直接注释导入即可