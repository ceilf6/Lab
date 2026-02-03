// 1. 使用静态方法 Array.isArray()

// 2. 用原型API 判断目标是否在数组的原型链上
const target = []; // document.get / query
const ans = Array.prototype.isPrototypeOf(target)
console.log(ans)