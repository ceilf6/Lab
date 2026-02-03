// 1. 使用静态方法 Array.isArray()

// 2. 用 原型API 判断目标是否在数组的原型链上
// (1) isPrototypeOf
const target = []; // document.get / query
const bool1 = Array.prototype.isPrototypeOf(target)
console.log(bool1)

// (2) instanceof
const bool2 = target instanceof Array
console.log(bool2)
// 注意如果有iframe跨越了窗口Array会指向不一样