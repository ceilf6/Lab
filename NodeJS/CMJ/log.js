console.log(global.a);
// undefined 全局对象不会被污染

const { a, funcA } = require('./a') // 返回对象 { a, funcA }
console.log(a)