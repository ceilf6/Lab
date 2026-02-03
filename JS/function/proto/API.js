const obj = new Object()
console.log(Object.getPrototypeOf(obj) === obj.__proto__) // true

const Func = new Function()
console.log(Func.prototype.isPrototypeOf(obj))
// false
// obj → Object.prototype → null
// Func 是 全新的普通对象a
const FuncChild = new Func()
console.log(Func.prototype.isPrototypeOf(FuncChild))
// true
const FuncBrother = new Function()
console.log(Func.prototype.isPrototypeOf(FuncBrother))
// false
// isPrototypeOf 只看「对象的 prototype 链」，不看构造函数是不是同一个