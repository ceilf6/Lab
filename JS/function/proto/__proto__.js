// 同一个构造函数 new 出来的对象共用同一块内存空间表示隐式原型属性
function func() { }

// 注意得 new 构造函数声明返回对象，否则就返回 undefined 了
const obj1 = new func();
const obj2 = new func();

console.log(obj1.__proto__ === obj2.__proto__)
console.log(obj1.__proto__ === func.prototype)

obj1.__proto__.ceilf6 = 666
console.log(obj2.__proto__.ceilf6)

func.prototype.ceilf6 = 777
console.log(obj2.__proto__.ceilf6)