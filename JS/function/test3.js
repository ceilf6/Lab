function func() { }
func.prototype.sayHello = function () { };

var u1 = new func();
var u2 = new func();

console.log(u1.sayHello === u2.sayHello); // true

console.log(func.prototype.constructor); // [Function: func]

console.log(func.prototype === Function.prototype); // false

console.log(func.__proto__ === Function.prototype); // true
// Function.prototype === Function.__proto__
console.log(func.__proto__ === Function.__proto__); // true

console.log(u1.__proto__ === u2.__proto__); // true

console.log(u1.__proto__ === func.__proto__); // false

console.log(Function.__proto__ === Object.__proto__); // true
// Object 都是 Funcion 创建的，都指向 Function.prototype

console.log(Function.prototype.__proto__ === Object.prototype.__proto__); // false

console.log(Function.prototype.__proto__ === Object.prototype); // true
